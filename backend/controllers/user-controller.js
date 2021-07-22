const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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

        if (!user) {
            return res.status(400).json({ message: 'USER DOES NOT EXIST' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        }

        const jwtToken = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '2h'
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

        if (user) {
            return res.status(400).json({ message: 'USER ALREADY EXISTS' });
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
            expiresIn: '2h'
        });

        await user.save();

        return res.status(200).json({ jwtToken });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ message: "User with this email doesnt exist." })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_FORGOT_PASSWORD_KEY, {
        expiresIn: '20m'
    });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    let mailOptions = {
        from: 'neuerm878@gmail.com',
        to: email,
        subject: 'Express Forgot Password Account',
        html: `<h2>Please click on given link to proceed with our forgot password procedure</h2>
               <a href="http://localhost:8080/reset-password/${token}">http://express.com/forgot-password</a>`,
    };

    try {
        const result = await user.updateOne({ resetToken: token });
        if (result) {
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Forgot Password Email Sent!');
                }
            });
            return res.status(200).json({ message: 'sent' });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }

}

const resetPassword = async (req, res) => {
    const resetToken = req.params.token;

    const salt = await bcrypt.genSalt(10);
    req.body.newPass = await bcrypt.hash(req.body.newPass, salt);
    try {
        if (!resetToken) {
            return res.status(403).json({ message: 'Token invalid or expired.' });
        }

        const verifyToken = jwt.verify(resetToken, process.env.JWT_FORGOT_PASSWORD_KEY);
        if (verifyToken) {
            await User.findOneAndUpdate({ resetToken: resetToken }, { password: req.body.newPass, resetToken: null });
            return res.status(200).json({ message: 'Password has been updated' });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }

}

module.exports = { getUsers, login, register, forgotPassword, resetPassword }