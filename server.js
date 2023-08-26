const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;
const shortenerRoutes =  require('./routes/shortener');

app.use(express.json());
app.use('/shortener', shortenerRoutes);

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

app.get('/', (req, res) => {
    res.send('Sup!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})