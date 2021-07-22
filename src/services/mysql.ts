import { createConnection } from 'mysql';

const connection = createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_NAME
})

connection.connect()

export { connection }
