import logo from "./logo.svg";
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

	const [Cars, setCars] = useState([]);

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

	const handleDelete = (carDelete) => {
		axios
			.delete(`http://localhost:3000/dealership/${carDelete._id}`)
			.then(() => {
				axios.get("http://localhost:3000/dealership").then((response) => {
					setCars(response.data);
				});
			});
	};
	return (
		<div className='App'>
			<h1>Car Dealership</h1>
			<section>{/* New Form */}</section>
			<div></div>
			<section className='card-deck'>
				{Cars.map((car) => {
					return (
						<div className='car_card'>
							<div className='card' key={car._id}>
								<img src={car.picture} />
								<h3>{car.make}</h3>
								<p>{car.model}</p>
								<p>{car.year}</p>
								<p>{car.price}</p>
								<p>{car.color}</p>
								<p>{car.available}</p>
							</div>

							{/* // edit route
		  
		  // edit button'
		  // deletebutton */}
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default App;
