import 'dotenv/config';
import * as mongo from 'mongodb';
import Logger from './Logger';
import { DatabaseLog } from '../types';

const MAX_LOGS_SHOWN = 15;
const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;

const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const client = new mongo.MongoClient(url);
let db: mongo.Db;

client.connect((error, result) => {
    if (error) Logger.error(error.message);
    else db = client.db();
});

export default {
    async log(guildId: string, userId: string, command: string, nbMembersMoved: number) {
        if (!(await _collectionExists(guildId))) return;

        db.collection(guildId).insertOne(
            {
                timestamp: Date.now(),
                userId,
                command,
                nbMembersMoved
            } as DatabaseLog,
            (error, result) => {
                if (error) Logger.error(error.message);
                else Logger.database(`'${userId}' used '${command}' to move ${nbMembersMoved} member(s)`);
            }
        );
    },
    getLogs(guildId: string, userId?: string) {
        return new Promise((resolve, reject) => {
            db.collection(guildId)
                .find(userId ? { userId } : {})
                .sort({ _id: -1 }) // Sort by id DESC (last logs first)
                .limit(MAX_LOGS_SHOWN)
                .toArray((error, result) => {
                    if (error) {
                        Logger.error(error.message);
                        reject(error);
                    }
                    resolve(result);
                });
        });
    },
    createCollection(guildId: string) {
        db.createCollection(guildId, (error, result) => {
            if (error) Logger.error(error.message);
            else Logger.database(`Collection '${guildId}' created`);
        });
    },
    async deleteCollection(guildId: string) {
        if (!(await _collectionExists(guildId))) return;

        db.collection(guildId).drop((error, result) => {
            if (error) Logger.error(error.message);
            else Logger.database(`Collection '${guildId}' deleted`);
        });
    },
    collectionExists(guildId: string): Promise<Boolean> {
        return _collectionExists(guildId);
    }
};

function _collectionExists(guildId: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
        db.listCollections({ name: guildId }).next((error, info) => resolve(Boolean(info)));
    });
}
