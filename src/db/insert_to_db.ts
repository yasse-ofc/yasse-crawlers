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
export const insertOneToDB = async ( collection: string, document: OptionalId<Document> ) => {
    const db = client.db( dbName );
    
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.insertOne( document );
};

/** 
 * Insert a list of documents to DB.
 * @param {string} collection - Collection of the DB to store the data.
 * @param {string} documents - List of documents to add to DB.
 */
export const insertManyToDB = async ( collection: string, documents: OptionalId<Document>[] ) => {
    const db = client.db( dbName );
    
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.insertMany( documents );
};
