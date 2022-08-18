import 'dotenv/config';
import * as mongo from 'mongodb';
import Logger from './Logger';
import { DatabaseLog } from '../types';

const MAX_LOGS = 15;
const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;

const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const client = new mongo.MongoClient(url);
let db: mongo.Db;

client.connect((error, result) => {
    if (error) Logger.error(error.message);
    else db = client.db();
});

export default {
    log(guildId: string, userId: string, command: string, nbMembersMoved: number) {
        db.collection(guildId).insertOne(
            {
                timestamp: Date.now(),
                userId,
                command,
                nbMembersMoved
            } as DatabaseLog,
            (error, result) => {
                if (error) Logger.error(error.message);
                else Logger.log(`Database log : '${userId}' used '${command}' to move ${nbMembersMoved} member(s)`);
            }
        );
    },
    getLogs(guildId: string, userId?: string) {
        return new Promise((resolve, reject) => {
            db.collection(guildId)
                .find(userId ? { userId } : {})
                .sort({ _id: -1 }) // Sort by id DESC (last logs first)
                .limit(MAX_LOGS)
                .toArray((error, result) => {
                    if (error) {
                        Logger.error(error.message);
                        reject(error);
                    }
                    resolve(result);
                });
        });
    },
    deleteCollection(guildId: string) {
        db.collection(guildId).drop((error, result) => {
            if (error) Logger.error(error.message);
            else Logger.log(`Collection '${guildId}' deleted`);
        });
    }
};
