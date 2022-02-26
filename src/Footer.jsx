import React from 'react';

const Footer = ({ length }) => {
	const today = new Date();

	return (
		<footer>
			<p>
				{length} total {length === 1 ? 'item' : 'items'}.
			</p>
			<p>Copyright &copy; {today.getFullYear()}</p>
		</footer>
	);
};

export default Footer;
