var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    try {
        axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
            .then(data => {
                res.render('index', {
                    title: 'Home',
                    breadcump: ['Home'],
                    products: data.data.products
                })
            })
    } catch (e) {
        console.log(e);
    }

});

router.get("/wishlist", (req, res) => {
    try {
        if (req.cookies.products)
            axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
            .then(data => {
                let products = JSON.parse(req.cookies.products).map(e => {
                    return data.data.products.find(x => x.id == e);
                });

                res.render('index', {
                    title: 'Wishlist',
                    breadcump: ['Home', 'Wishlist'],
                    products: products,
                })
            })
        else
            res.render('index', {
                title: 'Wishlist',
                breadcump: ['Home', 'Wishlist'],
                products: []
            })
    } catch (e) {
        console.log(e);
    }
})

router.get("/search", (req, res) => {
    try {
        let searchContent = req.query.content;
        axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
            .then(data => {

                let results = data.data.products.filter(x => {
                    if ((x.title.toLowerCase()).includes(searchContent.toLowerCase()))
                        return x;
                })

                res.render('index', {
                    title: 'Search',
                    breadcump: ['Home', `resultados para '${searchContent}'`],
                    products: results
                })
            })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;