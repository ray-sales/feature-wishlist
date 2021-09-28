const { default: axios } = require('axios');
var express = require('express');
require('dotenv/config');
var router = express.Router();

router.post("/add-wishlist", (req, res) => {
    try {
        if (!req.body) {
            throw new Error("id is required in requisition body!");
        }
        let product = req.body.id;
        let products = [];
        if (req.cookies && req.cookies.products)
            products = JSON.parse(req.cookies.products);
        products.push(product);
        res.cookie("products", JSON.stringify(products));
        res.status(201).send("Created.");
    } catch (e) {
        console.log(e);
    }
})

router.delete("/remove-wishlist/:id", (req, res) => {
    try {
        if (!req.params) {
            throw new Error("id is required to remove to wishlist item!");
        }
        let id = req.params.id;
        let products = JSON.parse(req.cookies.products);
        let index = products.indexOf(Number(id));
        products.splice(index, 1);
        res.cookie("products", JSON.stringify(products));
        res.status(200).send("Deleted.");
    } catch (e) {
        console.log(e);
    }

})

router.get("/wishlist", (req, res) => {
    try {
        let products = []
        if (req.cookies && req.cookies.products)
            products = JSON.parse(req.cookies.products);

        res.status(200).send(products);
    } catch (e) {
        console.log(e);
    }
})

router.get("/get-city", function(req, res, next) {
    try {
        let lat = req.query.lat;
        let long = req.query.long;
        axios.get(`${process.env.GEOCODE_URL}?key=${process.env.GEOCODE_KEY}&q=${lat}%2C${long}`).then((data) => {
            res.status(200).send({ "town": data.data.results[0].components.city_district, "state": data.data.results[0].components.state_code });
        })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;