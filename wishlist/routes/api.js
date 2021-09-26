var express = require('express');

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
        res.json("OK");
    } catch (e) {
        console.log(e);
    }
})

router.delete("/remove-wishlist/:id", (req, res) => {
    try {
        console.log("### delete")
        if (!req.params) {
            throw new Error("id is required to remove to wishlist item!");
        }
        console.log(req.params);
        let id = req.params.id;
        let products = JSON.parse(req.cookies.products);
        let index = products.indexOf(Number(id));
        console.log(index);
        products.splice(index, 1);
        res.cookie("products", JSON.stringify(products));
        res.json("OK");
    } catch (e) {
        console.log(e);
    }

})

router.get("/wishlist", (req, res) => {
    try {
        let products = []
        if (req.cookies && req.cookies.products)
            products = JSON.parse(req.cookies.products);
        console.log(products)
        res.send(products);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;