const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    original: String, 
    shortened: String
});

const Link = mongoose.model('Link', LinkSchema);

const createLink = async (original, shortened) => {
    try {
        return await Link.create({ original, shortened });
    } catch (error) {
        console.error('Error creating the link: ', error);
        throw error;
    }
};

const findLinkByShortened = async (shortened) => {
    return await Link.findOne({ shortened });
};

module.exports = {
    createLink, 
    findLinkByShortened
};