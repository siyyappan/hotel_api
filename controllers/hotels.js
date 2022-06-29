var express = require('express');

const Hotel = require("../models/hotel.model.js");

exports.create = (req, res, next) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var reqParams = req.body;

    const hotel = new Hotel({
        name: reqParams.name,
        sharing: reqParams.sharing,
        checkout: reqParams.checkout,
        rent: reqParams.rent,
        amenities: reqParams.amenities,
        discount: reqParams.discount,
        distance: reqParams.distance,
        rooms: reqParams.rooms
    });

    // Save Hotel in the database
    Hotel.create(hotel, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Hotel."
            });
        } else {
            res.status(200).send({
                message: "Created successfully.",
                data: data
            });
        }
    });

};

exports.update = (req, res, next) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var reqParams = req.body;

    Hotel.updateById(reqParams, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found hotel with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating hotel with id " + req.params.id
                });
            }
        } else res.send(data);
    });

};

exports.delete = (req, res, next) => {
    // Validate Request
    if (!req.body.id && req.body.id != undefined) {
        res.status(400).send({
            message: "Id can not be empty!"
        });
    }
    Hotel.remove(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Hotel with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Hotel with id " + req.params.id
                });
            }
        } else res.send({ message: `Hotel was deleted successfully!` });
    });
};

exports.hotels = (req, res, next) => {

    var reqParams = req.body;

    Hotel.getAll(reqParams, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving hotels."
            });
        else res.send(data);
    });

};

exports.cheapest = (req, res, next) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var reqParams = req.body;

    var checkoutHours = 0;

    var noOfsharing = 0;

    if (req.body.sharing && req.body.sharing != undefined) {

        noOfsharing = req.body.sharing;

    }

    if (req.body.booking_date && req.body.booking_date != undefined) {

        if (req.body.booking_date.from && req.body.booking_date.from != undefined && req.body.booking_date.to && req.body.booking_date.to != undefined) {

            checkoutHours = (new Date(req.body.booking_date.to) - new Date(req.body.booking_date.from)) / 3600000;

        }

    }

    Hotel.getCheapest(reqParams, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving hotels."
            });
        } else {

            var responseData = formatCheapestResults(data, checkoutHours, noOfsharing);

            var returnArray = {};

            if (responseData.length > 0) {
                returnArray.cheapest = responseData[0];
                returnArray.list = responseData;
            }

            res.status(200).send({
                message: "Cheapest Hotel List.",
                data: returnArray
            });

        }
    });

};

function formatCheapestResults(dataCollection, checkoutHours, noOfsharing) {

    var formattedArray = dataCollection.map(data => {

        if (data.rent && data.rent > 0) {

            var days = 1;

            var amount = data.rent;

            checkoutHours = Math.ceil(checkoutHours);

            if (checkoutHours > 12) {

                days = Math.ceil(checkoutHours / 12);

            }

            amount = amount * days;

            if (data.discount && data.discount > 0) {

                var discountPercentageValue = data.discount / 100;

                amount = amount - (amount * discountPercentageValue);

            }

            if (data.amenities && data.amenities != '') {

                var amenitiesArray = data.amenities.split(", ");

                var amenitiesLowerArray = amenitiesArray.map(element => {
                    return element.toLowerCase();
                });

                if (!amenitiesLowerArray.includes("including breakfast")) {

                    amount = amount + (noOfsharing * 250);

                }

                if (!amenitiesLowerArray.includes("including lunch")) {

                    amount = amount + (noOfsharing * 250);

                }

                if (!amenitiesLowerArray.includes("including dinner")) {

                    amount = amount + (noOfsharing * 250);

                }

            }

            data.amount = amount;

        }

        return data;

    });

    formattedArray.sort(function(x, y) {
        return x.amount - y.amount;
    });

    return formattedArray;

}