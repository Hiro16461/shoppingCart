import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import './App.css';

function App() {
	const [items, setItems] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState({});
	const [cart, setCart] = useState({});
	const [totalQty, setTotalQty] = useState(0);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((response) => {
				if (response.status >= 400) {
					throw Error('Server Error');
				}
				return response.json();
			})
			.then((items) => {
				setItems(items);
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<>
			<header>
				<p className='logo'>
					<span className='logoLetters'>F</span>ake
					<span className='logoLetters'>S</span>hop
				</p>
				<nav>
					<ul>
						<li>
							<Link to='home' className='headerList'>
								Home
							</Link>
						</li>
						<li>
							<Link to='shop' className='headerList'>
								Shop
							</Link>
						</li>
						<li>
							<Link to='cart' className='headerList'>
								<span className='base'>
									Cart <span className='cartQty'>{totalQty}</span>
								</span>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main className='content'>
				{loading && (
					<p className='loading'>
						Loading{' '}
						<span className='dots'>
							<span>.</span>
							<span>.</span>
							<span>.</span>
						</span>
					</p>
				)}
				{error && (
					<p className='error'>Hmm! We've encountered a network error</p>
				)}
				{!loading && !error && (
					<Outlet
						context={{
							items,
							count,
							setCount,
							cart,
							setCart,
							totalQty,
							setTotalQty,
						}}
					/>
				)}
			</main>
		</>
	);
}

export default App;
