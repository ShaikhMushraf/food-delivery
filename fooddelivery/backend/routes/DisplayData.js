const express = require('express')
const router = express.Router()


router.post('/FoodData', (req, res) => {
    try {
        res.json({ fooditems: global.fooditems, foodcategory: global.foodcategory });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




module.exports = router;