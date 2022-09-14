const express = require('express');
const { searchDB } = require('../update_db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    const data = req.body;
    res.send(await searchDB(data.search));
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${process.env.PORT || port}`);
});