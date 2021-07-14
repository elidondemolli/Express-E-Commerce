const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        const result = await User.findById(req.user.id).select('-password');
        res.status(200).json(result); 
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email: email });

        if(!user){
            return res.status(400).json({ message: 'USER DOES NOT EXIST'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials'});
        }

        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        }

        const jwtToken = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: 3600
        });

        return res.status(200).json({ jwtToken, user });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email: email });

        if(user){
            return res.status(400).json({ message: 'USER ALREADY EXISTS'});
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        }

        const jwtToken = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: 3600
        });
        
        await user.save();

        return res.status(200).json({ jwtToken });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

module.exports = { getUsers, login, register }