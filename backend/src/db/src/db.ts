import * as glob from 'glob';
import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

const url = process.env.MONGODB_LINK;
const dbName = 'yasse';

/** 
* Creates ideal string to make regex search in MongoDB.
* @param {string} searchTerm - String to be formatted.
* @return {string} Formatted string.
*/
function formatSearch( searchTerm: string ) {
    const formattedSearch: string = searchTerm.split( '' ).join( '.*' );

    return formattedSearch;
}

/** 
* Executes every crawler so they can create a new DB.
*/
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

/** 
* Deletes every collection inside a DB.
*/
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

/** 
* Searches for searchTerm in collectionToSearch.
* @param {string} searchTerm - Term to be searched.
* @param {string} collectionToSearch - Collection to search.
* @return List of JSON document with search results.
*/
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