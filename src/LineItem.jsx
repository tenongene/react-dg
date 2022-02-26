import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({ item, handleCheck, handleDelete }) => {
	return (
		<li className="item">
			{/*Each list item in React must have a key, set as an attribute: exists at origin component */ }
			<input type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} />
			<label
				onDoubleClick={() => handleCheck(item.id)}
				style={item.checked ? { textDecoration: 'line-through' } : null}>
				{item.product}
			</label>
			<FaTrashAlt role="button" tabIndex="0" onClick={() => handleDelete(item.id)} />
		</li>
	);
};

export default LineItem;
