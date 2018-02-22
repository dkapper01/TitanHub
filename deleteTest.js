const pg = require('pg')

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'meetup',
    port: 5432,
})

client.connect()

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
client.end()
})