import './App.css';
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';


function App() {

    useEffect(() => {console.log('render')}, [])

//Alternatively getting items array from local storage (instead of pre-defined below)
const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')));

	// const [items, setItems] = useState([
	// 	{
	// 		id: 1,
	// 		checked: false,
	// 		product: 'Frosted Flakes',
	// 	},
	// 	{
	// 		id: 2,
	// 		checked: false,
	// 		product: 'Honey',
	// 	},
	// 	{
	// 		id: 3,
	// 		checked: false,
	// 		product: 'Turkey',
	// 	},
	// ]);

	//getting new items from user input and setting the new input state (controlled input)
	const [newItem, setNewItem] = useState('');

//search  functionality - search and setting state of search
    const [search, setSearch] = useState('');

	//extracted fucntion to set the state and localStorage to avoid duplicate code in handlers
	const setAndSaveState = (newItems) => {
		setItems(newItems);
		localStorage.setItem('shoppingList', JSON.stringify(newItems));
	};

	//add item function for controlled input (adding entered item to list)
	const addItem = (product) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const theNewItem = { id, checked: false, product };
		const listItems = [...items, theNewItem];
        setAndSaveState(listItems);
	};

	//checking box handler
	const handleCheck = (id) => {
		const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
		setAndSaveState(listItems);
	};

	//delete item handler
	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setAndSaveState(listItems);
	};

	//submit (new item) handler
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newItem) return;
		addItem(newItem);
		setNewItem('');
	};

	return (
		<div className="App">
			<Header title="Grocery List" />

            <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
            
            <SearchItem search={search} setSearch={setSearch}/>

			<Content items={items.filter((item) => ((item.product).toLowerCase()).includes(search.toLowerCase()))} 
            handleCheck={handleCheck} 
            handleDelete={handleDelete} />

			<Footer length={items.length} />
		</div>
	);
}

export default App;
