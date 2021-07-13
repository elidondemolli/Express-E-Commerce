const jwt = require("jsonwebtoken");
require('dotenv').config();

const login = (req, res) => {
    const USERNAME = "elidon";
    const PASSWORD = "111";

    const { username, password } = req.body;
    if(username == USERNAME && password == PASSWORD) {
        const user = {
            id: 1,
            name: "elidon demolli",
            username: "elidon",
        };

        const token = jwt.sign(user, process.env.JWT_KEY);
        res.status(200).json({ token, user });
    } else {
        res.status(403).json({ message: "Wrong login credentials!"});
    } 
}

module.exports = { login }