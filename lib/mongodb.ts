import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

// const DB_STRING = 'LolAbilitiesQuiz';
const DB_STRING = 'lol_ability_quiz';

// if (!process.env.NEXT_ATLAS_URI) {
//     throw new Error('Please add your Mongo URI to .env.local')
// }

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect();
        }
        database = await mongoClient.db(DB_STRING);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}