import * as dotenv from 'dotenv';
import { Document, MongoClient, OptionalId } from "mongodb";

dotenv.config();

const url = process.env.MONGODB_LINK;
const dbName = 'yasse';

/** 
 * Insert one document to DB.
 * @param {string} collection - Collection of the DB to store the data.
 * @param {string} document - document to add to DB.
 */
export const insertOneToDB = async ( collection: string, document: OptionalId<Document> ) => {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );
    
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.insertOne( document );
    
    await client.close();
};

/** 
 * Insert a list of documents to DB.
 * @param {string} collection - Collection of the DB to store the data.
 * @param {string} documents - List of documents to add to DB.
 */
export const insertManyToDB = async ( collection: string, documents: OptionalId<Document>[] ) => {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );
    
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.insertMany( documents );
    
    await client.close();
};