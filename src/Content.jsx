import React from 'react';
import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {
	return (
		<>
			{items.length ? (
				<ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
			) : (
				<p style={{ marginTop: '2rem' }}>Your checklist is empty.</p>
			)}
		</>
	);
};

export default Content;

// const handleNameChange = () => {
//    const names = ['Bria', 'Bryson', 'Aria', 'Leila', 'Darien'];
//    const int = Math.floor(Math.random() * 5);
//    // return names[int];
//    setName(names[int]);
// };

// const handleClick = () => {
//    setCount(count + 1);
//    console.log(count)
// }

// const handleClick2 = () => {
//    console.log(count)
// }

// <main>
//          <p onDoubleClick={handleClick}>Hello {name}!</p>
//          <button onClick={handleNameChange}>Change Name</button> {/*handleClick has no parameter in its definition, so can just be referenced, not called */}
//          <button onClick={handleClick}>Click Now</button> {/*handleClick2 has a parameter in its definition; must be called by including in an anonymous function - else will just return object */}
//          <button onClick={handleClick2}>Click Event</button>
//    </main>
