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

router.get('/:shortened', async ( req, res ) => {
        const link = await findLinkByShortened(req.params.shortened);

        if (link) {
            res.redirect(link.original);
        } else {
            res.status(404).send()
        }
})

module.exports = router;