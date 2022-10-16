import * as dotenv from 'dotenv';
import { Document, OptionalId } from 'mongodb';
import { client } from './create_db.js';

dotenv.config();

const dbName = 'yasse';

/** 
 * Insert one document to DB.
 * @param {string} collection - Collection of the DB to store the data.
 * @param {string} document - document to add to DB.
 */
export const insertOneToDB = async ( source: string, collection: string, document: OptionalId<Document> ) => {
    const db = client.db( dbName );
    
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.updateOne( { source: source }, document, { upsert: true } );
};

/** 
 * Insert a list of documents to DB.
 * @param {string} collection - Collection of the DB to store the data.
 * @param {string} documents - List of documents to add to DB.
 */
export const insertManyToDB = async ( source: string, collection: string, documents: OptionalId<Document>[] ) => {
    const db = client.db( dbName );
    
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.updateMany( { source: source }, documents, { upsert: true } );
};
