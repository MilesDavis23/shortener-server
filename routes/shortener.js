const express = require('express');
const router = express.Router();
const { createLink, findLinkByShortened } = require('../dal/links');
const shortid = require('shortid');


router.post('/shorten', async (req, res) => {
    const { original } = req.body;
    const shortened = shortid.generate();
    await createLink(original, shortened);
    res.json({ original, shortened });
});

module.exports = router;