import express from 'express';
import { searchDB } from '../db/src/db';

const app = express();
const PORT = 3000;

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.post( '/', async (req, res) => {
    const data = req.body;
    res.send( await searchDB( data.search, 'test' ) );
});

app.listen( process.env.PORT || PORT, () => {
    console.log( `Example app listening on port ${ process.env.PORT || PORT }` );
});