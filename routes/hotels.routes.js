module.exports = app => {
    const hotels = require("../controllers/hotels.js");

    var router = require("express").Router();

    // Create a new hotels
    router.post("/create", hotels.create);

    // Update a hotels with id
    router.put("/update", hotels.update);

    // Delete a hotels with id
    router.delete("/delete", hotels.delete);

    // Retrieve all hotels
    router.post("/list", hotels.hotels);

    // Retrieve hotels based on conditions
    router.post("/cheapest", hotels.cheapest);

    app.use('/hotel', router);
};