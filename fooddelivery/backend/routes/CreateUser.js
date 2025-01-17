const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecreat = "MynameisShaikhMushrafIbrahim$#"


router.post("/createuser", [
    body('email').isEmail(),
    body('name'),
    body('password', 'incorrect password').isLength({ min: 5 })],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //bcryptjs used in the backend database 
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

    // get user in front end
router.get('/users',async (req,res) => {
    try {
        const users = await User.find();
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error'});
    }
});



router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: 'invalid Email' })
            }

            //bcyptjs used from frontend to fetch the password
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "invalid password" })
            }

            //jwttoken used for user generated by id
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecreat)
            return res.json({ success: true,authToken:authToken })
        } catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })



//     router.post('/create-order', async (req, res) => {
//         try {
//           const { userId, items, totalPrice } = req.body;
      
//           // Ensure that `items` is an array of objects, not a string
//           if (!Array.isArray(items)) {
//             return res.status(400).json({ error: "Items must be an array of objects" });
//           }
      
//           // Create the new order
//           const newOrder = new Order({
//             user: userId,
//             items,
//             totalPrice,
//           });
      
//           await newOrder.save();
//           res.status(201).json(newOrder);
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Failed to create order' });
//         }
//       });
      
        


// router.get('/orders', async (req, res) => {
//     try {
//         const orders = await Order.find()
//             .populate({
//                 path: 'items',
//                 select: 'name qty size price' // Select the fields you want from the Item model
//             })
//             .exec();
//         res.json({
//             success: true,
//             orders: orders
//         });
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching orders'
//         });
//     }
// });




module.exports = router;