const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    original: String, 
    shortened: String
});

const Link = mongoose.model('Link', LinkSchema);

const createLink = async (original, shortened) => {
    return await Link.create({ original, shortened });
};

const findLinkByShortened = async (shortened) => {
    return await Link.findOne({ shortened });
};

module.exports = {
    createLink, 
    findLinkByShortened
};