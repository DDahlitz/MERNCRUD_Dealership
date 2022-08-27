const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const Schema = require("./models/Schema.js");

//Create route
app.post("/dealership", (req, res) => {
	Schema.create(req.body, (err, newCar) => {
		res.json(newCar);
	});
});

//Index route
app.get("/dealership", (req, res) => {
	Schema.find({}, (err, allCars) => {
		res.json(allCars);
	});
});

// delete route
app.delete("/dealership/:id", (req, res) => {
	Schema.findByIdAndRemove(req.params.id, (err, removedCar) => {
		res.json(removedCar);
	});
});

// edit route
app.put("/dealership/:id", (req, res) => {
	Schema.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedCar) => {
			res.json(updatedCar);
		}
	);
});

/*==============================================================*/
/*===========================CONNECTIONS========================*/
/*==============================================================*/
mongoose.connect("mongodb://127.0.0.1/carDealership");
mongoose.connection.once("open", () => {
	console.log("Worshiping the the MON GOD");
});

app.listen(3000, () => {
	console.log("There is no PORT 3000");
});
