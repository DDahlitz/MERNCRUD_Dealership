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

	const [cars, setCars] = useState([]);

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

	return (
		<div className='App'>
			<h1>Dealership</h1>

			<div className='car_card'>
				{cars.map((car) => {
					return (
						<div>
							<div key={car.id}>
								<h4>{car.make}</h4>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
