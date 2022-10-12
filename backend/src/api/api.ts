import express from 'express';
import { searchDB } from '../db/db';

const app = express();
const PORT = 3000;

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.get( '/', async (req, res) => {
    const data = req.body;
    res.send( await searchDB( data.searchTerm ?? 'one piece', data.collectionToSearch ?? 'manga' ) );
});

app.listen( process.env.PORT || PORT, () => {
    console.log( `Example app listening on port ${ process.env.PORT || PORT }` );
});