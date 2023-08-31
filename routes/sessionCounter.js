const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    console.log('Session', req.session);
    next();
});

router.get('/increment', (req, res) => {
    //check the session and counter if its there:
    if (!req.session || typeof req.session.counter === 'undefined') {
        return res.status(400).send('Session not initialized or counter not set.');
    }
    req.session.counter++;
    console.log('Incremented counter: ', req.session.counter);
    res.json({ counter: req.session.counter });
});

router.get('/decrement', (req, res) => {
    if (!req.session || typeof req.session.counter === 'undefined') {
        return res.status(400).send('Session not initialized or counter not set.');
    }
    
    req.session.counter--;
    console.log('Decremented counter:', req.session.counter);
    res.json({ counter: req.session.counter });
});

module.exports = router; 