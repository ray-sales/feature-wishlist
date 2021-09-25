var express = require('express');
const axios = require('axios');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
        .then(data => {
            res.render('index', {
                title: 'Home',
                breadcump: 'Home',
                products: data.data.products
            })
        })

});

router.get("/wishlist", (req, res) => {
    if (req.cookies.products)
        axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
        .then(data => {
            let products = JSON.parse(req.cookies.products).map(e => {
                console.log(e);
                return data.data.products.find(x => x.id == e);
            });
            res.render('index', {
                title: 'Wishlist',
                breadcump: 'Home > Wishlist',
                products: products
            })
        })
    else
        res.render('index', {
            title: 'Wishlist',
            breadcump: 'Home > Wishlist',
            products: []
        })
})

module.exports = router;