import './Shop.css';
import { useOutletContext } from 'react-router';

const Shop = () => {
	const { items, count, setCount, setCart, setTotalQty } = useOutletContext();
	function increaseCount(id) {
		setCount((prev) => ({
			...prev,
			[id]: (prev[id] || 1) + 1,
		}));
	}

	function decreaseCount(id) {
		setCount((prev) => ({
			...prev,
			[id]: Math.max(1, (prev[id] || 1) - 1),
		}));
	}

	function handleChange(id, value) {
		setCount((prev) => ({
			...prev,
			[id]: value === '' ? 1 : Number(value),
		}));
	}

	function handleAddToCart(id, name, img, price) {
		setCart((prev) => {
			const updatedCart = {
				...prev,
				[id]: {
					qty: (prev[id]?.qty || 0) + (count[id] || 1),
					name: name,
					img: img,
					price: price,
				},
			};
			const totalQuantity = Object.values(updatedCart).reduce(
				(sum, curr) => sum + curr.qty,
				0,
			);
			setTotalQty(totalQuantity);
			return updatedCart;
		});

		setCount((prev) => ({
			...prev,
			[id]: 1,
		}));
	}

	return (
		items && (
			<>
				<main className='shopMain'>
					{items.map((item) => (
						<div className='card' key={item.id}>
							<img src={item.image} alt={item.description} />
							<p className='title'>{item.title}</p>
							<p className='price'>GHS {item.price}</p>
							<div>
								<button
									className='adjustQty'
									onClick={() => decreaseCount(item.id)}
								>
									-
								</button>
								<input
									type='number'
									value={count[item.id] || 1}
									onChange={(e) => handleChange(item.id, e.target.value)}
								/>
								<button
									className='adjustQty'
									onClick={() => increaseCount(item.id)}
								>
									+
								</button>
							</div>
							<button
								className='addToCart'
								onClick={() =>
									handleAddToCart(item.id, item.title, item.image, item.price)
								}
							>
								Add to cart
							</button>
						</div>
					))}
				</main>
			</>
		)
	);
};
export default Shop;
