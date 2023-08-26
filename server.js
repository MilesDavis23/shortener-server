
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { findLinkByShortened } = require('./dal/links')
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3001;
const shortenerRoutes =  require('./routes/shortener');


app.use(cors()); //use cors before we set up routes.

app.use(express.json());

app.use('/user', userRoutes);


app.use('/shortener', shortenerRoutes);

app.get('/:shortened', async (req, res) => {
    const link = await findLinkByShortened(req.params.shortened);

    if (link) {
        res.redirect(link.original);
    } else {
        res.status(404).send('Link is not available.');
    }
});

//MongoDB:
mongoose.connect('mongodb://localhost:27017/linkShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB')
})

//cors:
const corsOption ={
    origin: 'http://localhost:3000',
}
app.use(cors(corsOption));


app.get('/', (req, res) => {
    res.send('Sup!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})