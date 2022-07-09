import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {MessageItem} from './models';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'messages-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getMessages = async (
  db: SQLiteDatabase,
): Promise<MessageItem[]> => {
  try {
    const messages: MessageItem[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        messages.push(result.rows.item(index));
      }
    });
    return messages;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveMessages = async (
  db: SQLiteDatabase,
  messages: MessageItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    messages.map(i => `(${i.id}, '${i.title}')`).join(',');

  return db.executeSql(insertQuery);
};
