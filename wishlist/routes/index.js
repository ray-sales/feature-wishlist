var express = require('express');
const axios = require('axios');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    axios.get('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
        .then(data => {
            console.log(data.data.products)
            res.render('index', {
                title: 'Home',
                breadcump: 'Home',
                products: data.data.products
            })
        })

});

router.get('/wishlist', (req, res) => {
    res.render('wishlist')
})

module.exports = router;