import { Link } from 'react-router';
import './home.css';
export default function Home() {
	return (
		<>
			<main className='homeMain'>
				<h1>Shop Smarter. Live Better.</h1>
				<div className='intro'>
					<p>
						Discover a better way to shop online. From everyday essentials to
						the latest trends, we bring you quality products at prices you can
						trust — all in one place.
					</p>
					<p>
						Browse a carefully curated selection of items designed to fit your
						lifestyle. Whether you are upgrading your home, refreshing your
						wardrobe, or finding the perfect gift, we make shopping simple,
						fast, and reliable.
					</p>
				</div>
				<h2>Why Shop With Us?</h2>
				<ul className='introList'>
					<li>Wide range of quality products</li>
					<li>Affordable prices with regular deals</li>
					<li>Secure and easy checkout</li>
					<li>Fast and reliable delivery</li>
					<li>Friendly customer support you can count on</li>
				</ul>
				<Link to='../shop' className='btn'>
					Start Shopping
				</Link>
			</main>
		</>
	);
}
