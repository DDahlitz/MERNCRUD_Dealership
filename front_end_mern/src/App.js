import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";

function App() {
	const [newPicture, setNewPicture] = useState("");
	const [newYear, setNewYear] = useState("");
	const [newMake, setNewMake] = useState("");
	const [newModel, setNewModel] = useState("");
	const [newMiles, setNewMiles] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newColor, setNewColor] = useState("");
	const [newAvailable, setNewAvailable] = useState(false);
	const [cars, setCars] = useState([]);
	const [toggleEdit, setToggleEdit] = useState(true);
	const [showNewForm, setShowNewForm] = useState(false);
	const [showAllCars, setShowAllCars] = useState(true)

	const cardToggle = () => {
		{toggleEdit ? setToggleEdit(false) : setToggleEdit(true);}
	}



	const newFormsPage = () => {
		setShowNewForm(true)
		setShowAllCars(false)
	}
	const showCarsPage = () => {
		setShowNewForm(false)
		setShowAllCars(true)
	}

	const handlePictureChange = (event) => {
		setNewPicture(event.target.value);
	};

	const handleYearChange = (event) => {
		setNewYear(event.target.value);
	};
	const handleMakeChange = (event) => {
		setNewMake(event.target.value);
	};
	const handleModelChange = (event) => {
		setNewModel(event.target.value);
	};
	const handleMilesChange = (event) => {
		setNewMiles(event.target.value);
	};
	const handlePriceChange = (event) => {
		setNewPrice(event.target.value);
	};
	const handleColorChange = (event) => {
		setNewColor(event.target.value);
	};
	const handleAvailableChange = (event) => {
		setNewAvailable(event.target.checked);
	};

	useEffect(() => {
		axios.get("http://localhost:3000/dealership").then((response) => {
			setCars(response.data);
		});
	}, []);

	const handleNewCarFormSubmit = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:3000/dealership", {
				picture: newPicture,
				year: newYear,
				make: newMake,
				model: newModel,
				miles: newMiles,
				price: newPrice,
				color: newColor,
				available: newAvailable,
			})
			.then(() => {
				axios.get("http://localhost:3000/animal").then((response) => {
					setCars(response.data);
				});
			});
	};
	const handleDelete = (carDelete) => {
		axios
			.delete(`http://localhost:3000/dealership/${carDelete._id}`)
			.then(() => {
				axios.get("http://localhost:3000/dealership").then((response) => {
					setCars(response.data);
				});
			});
	};

	const handleUpdate = (carUpdate) => {
		axios
			.put(`http://localhost:3000/dealership/${carUpdate._id}`, {
				picture: newPicture,
				year: newYear,
				make: newMake,
				model: newModel,
				miles: newMiles,
				price: newPrice,
				color: newColor,
				available: newAvailable,
			})
			.then(() => {
				axios.get("http://localhost:3000/dealership").then((response) => {
					setCars(response.data);
				});
			});
	};

	return (
		<div className='App'>
			<h1>Car Dealership</h1>
			<button onClick={newFormsPage}>Add New Car</button>
			<button onClick={showCarsPage}> Show Inventory</button>
			{ showNewForm ? 
			<section>
				<form className='newForm' onSubmit={handleNewCarFormSubmit}>
					Img URL: <input type='text' onChange={handlePictureChange} />
					<br />
					Make: <input type='text' onChange={handleMakeChange} />
					<br />
					Model: <input type='text' onChange={handleModelChange} />
					<br />
					Year: <input type='text' onChange={handleYearChange} />
					<br />
					Miles: <input type='text' onChange={handleMilesChange} />
					<br />
					Price: <input type='text' onChange={handlePriceChange} />
					<br />
					Color: <input type='text' onChange={handleColorChange} />
					<br />
					<input type='submit' value='Add New Car' />
				</form>
			</section>
			: null }
			{ showAllCars ?
			<section className='card-deck'>
				{cars.map((car) => {
					return (
						<>
							<div className='card' key={car._id}>
								{ toggleEdit ? 
								<div className='card-content'>
									<img src={car.picture} />
									<h3>Make: {car.make}</h3>
									<p>Model: {car.model}</p>
									<p>Year: {car.year}</p>
									<p>Price: {car.price}</p>
									<p>Color: {car.color}</p>
									<p>{car.available}</p>
								</div>
								:  
								<div className='card-edit'>
									<form
										className='updateForm'
										onSubmit={() => {
											handleUpdate(car);
										}}
									>
										Img URL:{" "}
										<input type='text' onChange={handlePictureChange} />
										<br />
										Make: <input type='text' onChange={handleMakeChange} />
										<br />
										Model: <input type='text' onChange={handleModelChange} />
										<br />
										Year: <input type='text' onChange={handleYearChange} />
										<br />
										Miles: <input type='text' onChange={handleMilesChange} />
										<br />
										Price: <input type='text' onChange={handlePriceChange} />
										<br />
										Color: <input type='text' onChange={handleColorChange} />
										<br />
										Available:{" "}
										<input type='checkbox' onChange={handleAvailableChange} />
										<input
											type='submit'
											onClick={(event) => {
												handleUpdate(car);
											}}
											value='Update Car'
										/>
									</form>
								</div>
							}
								<div className='card-button'>
									<button onClick={(event) =>{cardToggle(car)}}>Edit this Card</button>
									<button
										onClick={(event) => {
											handleDelete(car);
										}}
									>
										Delete
									</button>
									{/* // edit route		  
								// edit button'
								// deletebutton */}
								</div>
							</div>
						</>
					);
				})}
			</section>
			: null }
		</div>
	);
}

export default App;
