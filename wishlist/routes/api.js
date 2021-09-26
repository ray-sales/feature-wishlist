var express = require('express');

var router = express.Router();

router.post("/add-wishlist", (req, res) => {
    console.log("add wish");
    let product = req.body.id;
    let products = [];
    if (req.cookies && req.cookies.products)
        products = JSON.parse(req.cookies.products);
    products.push(product);
    res.cookie("products", JSON.stringify(products));
    res.json("OK");
})

router.post("/remove-wishlist", (req, res) => {
    let id = req.body.id;
    let products = JSON.parse(req.cookies.products);
    let index = products.indexOf(id);
    products.splice(index, 1);
    res.cookie("products", JSON.stringify(products));
    res.json("OK");
})

router.get("/wishlist", (req, res) => {
    let products = JSON.parse(req.cookies.products);
    res.json(products);
})

module.exports = router;