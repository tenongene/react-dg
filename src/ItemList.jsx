import React from 'react';
import LineItem from './LineItem';

const itemList = ({ items, handleCheck, handleDelete }) => {
	return (
		<ul>
			{items.map((item) => (
				// {/*Remember Each list item in React must have a key, set as an attribute in the JSX as well - even when handing down to children */}
				<LineItem key={item.id} item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
			))}
		</ul>
	);
};

export default itemList;
