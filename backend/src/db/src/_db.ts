import glob from 'glob';
import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.q0ish8y.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

function formatSearch( searchTerm: string ) {
    const formattedSearch: string = searchTerm.split( '' ).join( '.*' );

    return formattedSearch;
}

async function createDB() {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );

    const collections = [
        'manga',
        'novel',
        'webtoon',
        'anime',
    ];

    let collection = db.collection( `${ collections[ 0 ] }` );
    console.log( `----- Fetching ${ collections[ 0 ] }... -----` );

    await Promise.all([
        glob.sync( `../crawlers/manga/**/output.json` ).forEach( file => {
            collection.insertMany( JSON.parse( file ) );
        })
    ]);

    collection = db.collection( `${ collections[ 1 ] }` );
    console.log( `----- Fetching ${ collections[ 1 ] }... -----` );
    
    await Promise.all([]);
    
    collection = db.collection( `${ collections[ 2 ] }` );
    console.log( `----- Fetching ${ collections[ 2 ] }... -----` );
    
    await Promise.all([]);
    
    collection = db.collection( `${ collections[ 3 ] }` );
    console.log( `----- Fetching ${ collections[ 3 ] }... -----` );

    await Promise.all([]);
    
    client.close();
}

async function deleteDB() {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );
    
    const collections = [
        'manga',
        'novel',
        'webtoon',
        'anime',
    ];
    
    for ( let i = 0; i < collections.length; i++ ) {
        let collection = db.collection( collections[i] );
        await collection.deleteMany({ });
    }
    
    client.close();
}

export async function searchDB( searchTerm: string, collectionToSearch: string ) {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );
    const collection = db.collection( collectionToSearch );
    
    const result = await collection.find(
        { "title": { $regex: `.*${ searchTerm.toLowerCase() }.*` } },
        { projection: { _id: 0 } }
    ).toArray();
    
    client.close();
    
    return result;
}