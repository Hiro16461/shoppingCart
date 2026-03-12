import { Link, useOutletContext } from 'react-router';
import './Cart.css';

const Cart = () => {
	const { cart, setCart, setTotalQty } = useOutletContext();
	function increaseCount(id) {
		setCart((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				qty: prev[id].qty + 1,
			},
		}));
	}

	function decreaseCount(id) {
		setCart((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				qty: Math.max(1, prev[id].qty - 1),
			},
		}));
	}

	function handleChange(id, value) {
		setCart((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				qty: value || 1,
			},
		}));
	}

	function removeFromCart(id) {
		setCart((prev) => {
			const { [id]: _, ...rest } = prev;
			const totalQuantity = Object.values(rest).reduce(
				(sum, item) => sum + item.qty,
				0,
			);
			setTotalQty(totalQuantity)
			return rest;;
		});
	}

	const itemInCart = Object.keys(cart).length !== 0;
	const cost = Object.values(cart).reduce(
		(sum, curr) => sum + curr.qty * curr.price,
		0,
	);

	return (
		<main className='cartMain'>
			{!itemInCart && (
				<div className='noItem'>
					<p>No item in cart yet</p>
					<Link to='../shop' className='btn'>
						Go to shop
					</Link>
				</div>
			)}
			{itemInCart && (
				<>
					{Object.entries(cart).map(([id, item]) => (
						<div key={id} className='bar'>
							<div className='leftbar'>
								<img src={item.img} alt={item.name} />
								<div>
									<p className='title'>{item.name}</p>
									<p className='price'>{item.price}</p>
								</div>
							</div>
							<div className='rightbar'>
								<div>
									<button
										className='adjustQty'
										onClick={() => decreaseCount(id)}
									>
										-
									</button>
									<input
										type='number'
										value={item.qty}
										onChange={(e) => handleChange(id, e.target.value)}
									/>
									<button
										className='adjustQty'
										onClick={() => increaseCount(id)}
									>
										+
									</button>
								</div>
								<button
									className='removeBtn'
									onClick={() => removeFromCart(id)}
								>
									Remove
								</button>
							</div>
						</div>
					))}
					<div>
						<h3 className='summaryTitle'>Order Summary</h3>

						<div className='bill'>
							<p className='desc'>Order Total:</p>
							<p className='currency'>GHS {cost}</p>
						</div>

						<div className='bill'>
							<p className='desc'>Shipping Fee:</p>
							<p className='currency'>Free</p>
						</div>

						<hr />

						<div className='bill'>
							<p className='desc'>Grand Total:</p>
							<p className='currency'>GHS {cost}</p>
						</div>
					</div>
				</>
			)}
		</main>
	);
};
export default Cart;
