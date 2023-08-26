const express = require('express');
const app = express();
const PORT = 3001;
const shortenerRoutes =  require('./routes/shortener');

app.use(express.json());
app.use('/shortener', shortenerRoutes);

app.get('/', (req, res) => {
    res.send('Sup!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})