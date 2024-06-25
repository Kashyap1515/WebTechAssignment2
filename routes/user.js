const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../schemas/user-model');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { email, password, username, purchaseHistory, shippingAddress } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
          }
        const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        const addedUser = await newUser.save();
        res.status(200).json(addedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
