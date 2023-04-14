const { Client } = require("pg");

const connectionData = {
    user: "postgres",
    host: "localhost",
    database: "Lexer",
    password: "123456789",
    port: 5432,
};

const client = new Client(connectionData);

module.exports = client;