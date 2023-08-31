const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/users/userModel');

const sessionSecret = process.env.SESSION_SECRET;
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send('User registered successfully.');
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).send('Invalid credentials.')
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);


    const token = jwt.sign( { userId: user._id }, sessionSecret, {expiresIn: '5m'} );

    if (isPasswordValid) {
        req.session.counter = 1;
        req.session.indicator = true;
        res.json( {token} );

        const indicator = req.session.indicator;
        const counter = 30; //session . maxAge

        function showCounter(){
            if (!indicator || counter <= 0){
                console.log('Session ended. ')
                return
            }

            counter--

            console.log(`Time left: ${counter}s`);

            setTimeout(showCounter, 1000)
        };

        showCounter();
    } else {
        res.status(401).send('Invalid credentials. ');
    }

});


module.exports = router;