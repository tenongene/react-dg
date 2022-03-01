import './App.css';
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
	const API_URL = 'http://localhost:3500/items';

	//Alternatively getting items array from local storage (instead of pre-defined below)
	const [items, setItems] = useState([]);

	//getting new items from user input and setting the new input state (controlled input)
	const [newItem, setNewItem] = useState('');

	//search  functionality - search and setting state of search
	const [search, setSearch] = useState('');

	//fetch error for to catch errors in API call
	const [fetchError, setFetchError] = useState('');

	const [isLoading, setIsLoading] = useState(true);
	//useEffect hook
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw Error('Did not receive expected data');
				const listItems = await response.json();
				setFetchError(null);
				setItems(listItems);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		setTimeout(() => {
			fetchItems();
		}, 2000);
	}, []);

	//add item function for controlled input (adding entered item to list)
	const addItem = async (product) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const theNewItem = { id, checked: false, product };
		const listItems = [...items, theNewItem];
		setItems(listItems);

		const postOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(theNewItem),
		};

		const result = await apiRequest(API_URL, postOptions);
		if (result) setFetchError(result);
	};

	//checking box handler
	const handleCheck = async (id) => {
		const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
		setItems(listItems);

		const myItem = listItems.filter((item) => item.id === id);
		const updateOptions = {
			//for the Update in CRUD (patch)
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ checked: myItem[0].checked }),
		};

		const reqUrl = `${API_URL}/${id}`;
		const result = await apiRequest(reqUrl, updateOptions);
		if (result) setFetchError(result);
	};
	//delete item handler
	const handleDelete = async (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);

		const deleteOptions = { method: 'DELETE' };
		const reqUrl = `${API_URL}/${id}`;
		const result = await apiRequest(reqUrl, deleteOptions);
		if (result) setFetchError(result);
        
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

			<SearchItem search={search} setSearch={setSearch} />

			<main>
				{isLoading && <p>Loading items</p>}
				{fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
				{!fetchError && !isLoading && (
					<Content
						items={items.filter((item) => item.product.toLowerCase().includes(search.toLowerCase()))}
						handleCheck={handleCheck}
						handleDelete={handleDelete}
					/>
				)}
			</main>

			<Footer length={items.length} />
		</div>
	);
}

export default App;

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
