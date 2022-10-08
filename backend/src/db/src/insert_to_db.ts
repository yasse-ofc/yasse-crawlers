import * as dotenv from 'dotenv';
import { Document, MongoClient, OptionalId } from "mongodb";

dotenv.config();

const url = process.env.MONGODB_LINK;
const dbName = 'yasse';

const client = await MongoClient.connect( url );
const db = client.db( dbName );
    
export const insertToDB = async ( collection: string, documents: OptionalId<Document>[] ) => {
    const collectionToInsert = db.collection( collection );
    await collectionToInsert.insertMany( documents );
};

client.close();