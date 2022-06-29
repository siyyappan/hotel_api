const sql = require("./db.js");

// constructor
const Hotel = function(hotel) {
    this.name = hotel.name;
    this.sharing = hotel.sharing;
    this.checkout = hotel.checkout;
    this.rent = hotel.rent;
    this.amenities = hotel.amenities;
    this.discount = hotel.discount;
    this.distance = hotel.distance;
    this.rooms = hotel.rooms;
};

Hotel.create = (newHotel, result) => {

    sql.query(`SELECT * FROM hotels WHERE name = '${newHotel.name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found hotel: ", res[0]);
            result(null, {
                message: "There is another hotel with this name: " + newHotel.name,
                data: res[0]
            });
            return;
        } else {

            sql.query("INSERT INTO hotels SET ?", newHotel, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created Hotel: ", { id: res.insertId, ...newHotel });
                result(null, { id: res.insertId, ...newHotel });
            });

        }

        // not found hotel with the id
        result({ kind: "not_found" }, null);
    });

};

Hotel.findByName = (name, result) => {
    sql.query(`SELECT * FROM hotels WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found hotel: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found hotel with the id
        result({ kind: "not_found" }, null);
    });
};

Hotel.getAll = (params, result) => {

    let query = "SELECT * FROM hotels WHERE 1";

    if (params) {

        Object.entries(params).forEach(([key, value], index) => {
            query += ` AND ${key} LIKE '%${value}%'`;
        });

    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("hotels: ", res);
        result(null, res);
    });
};

Hotel.getCheapest = (params, result) => {

    let query = "SELECT * FROM hotels WHERE 1";

    if (params.rooms && params.rooms != undefined && params.rooms > 0) {

        query += ` AND rooms >= ${params.rooms}`;

    }

    if (params.sharing && params.sharing != undefined && params.sharing > 0) {

        query += ` AND sharing >= ${params.sharing}`;

    }

    if (params.distance && params.distance != undefined && params.distance > 0) {

        query += ` AND distance <= ${params.distance}`;

    }

    // if (params) {

    //     Object.entries(params).forEach(([key, value], index) => {
    //         query += ` AND ${key} LIKE '%${value}%'`;
    //     });

    // }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("hotels: ", res);
        result(null, res);
    });
};

Hotel.updateById = (params, result) => {

    let id = '';

    let query = "UPDATE hotels SET";

    let columnNameQuery = '';

    let columnValueArray = [];

    if (params) {

        id = params.id;

        Object.entries(params).forEach(([key, value], index) => {
            // query += ` AND ${key} LIKE '%${value}%'`;

            if (key != 'id') {

                columnNameQuery = ` ${key} = ?,`;
                columnValueArray.push(value);

            }
        });

        if (id != '' && columnNameQuery != '' && columnValueArray.length > 0) {

            columnValueArray.push(id);

            query += columnNameQuery.replace(/,(\s+)?$/, '');

            query += ' WHERE id = ?';

            sql.query(
                query, columnValueArray,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    if (res.affectedRows == 0) {
                        // not found hotel with the id
                        result({ kind: "not_found" }, null);
                        return;
                    }

                    console.log("updated hotel: ", { id: id, ...params });
                    result(null, { id: id, ...params });
                }
            );

        }

    }

};

Hotel.remove = (id, result) => {
    sql.query("DELETE FROM hotels WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found hotel with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted hotel with id: ", id);
        result(null, res);
    });
};

module.exports = Hotel;