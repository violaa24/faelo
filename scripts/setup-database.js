const fs = require('node:fs/promises');
const path = require('node:path');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function required(name) {
    const value = process.env[name];
    if (!value || value.includes('GANTI_DENGAN')) {
        throw new Error(`${name} is not configured in .env.`);
    }
    return value;
}

function readPort() {
    const port = Number(process.env.DB_PORT || 5432);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error('DB_PORT must be a valid port number.');
    }
    return port;
}

function safeDatabaseName() {
    const name = process.env.DB_NAME || 'faelo_ai';
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
        throw new Error('DB_NAME may contain only letters, numbers, and underscores, and cannot start with a number.');
    }
    return name;
}

function connectionOptions(database) {
    const useSsl = process.env.DB_SSL === 'true';
    return {
        host: process.env.DB_HOST || '127.0.0.1',
        port: readPort(),
        database,
        user: required('DB_USER'),
        password: required('DB_PASSWORD'),
        ssl: useSsl ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5_000
    };
}

async function main() {
    const databaseName = safeDatabaseName();
    const adminDatabase = process.env.DB_ADMIN_DATABASE || 'postgres';
    const adminClient = new Client(connectionOptions(adminDatabase));

    console.log('Connecting to PostgreSQL...');
    await adminClient.connect();

    try {
        const existing = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
        if (existing.rowCount === 0) {
            await adminClient.query(`CREATE DATABASE "${databaseName}" ENCODING 'UTF8' TEMPLATE template0`);
            console.log(`Database "${databaseName}" created.`);
        } else {
            console.log(`Database "${databaseName}" already exists.`);
        }
    } finally {
        await adminClient.end();
    }

    const schema = await fs.readFile(path.resolve(__dirname, '../database/schema.sql'), 'utf8');
    const applicationClient = new Client(connectionOptions(databaseName));
    await applicationClient.connect();

    try {
        await applicationClient.query(schema);
        console.log('Table "demo_requests" is ready.');
        console.log('Database setup completed successfully.');
    } finally {
        await applicationClient.end();
    }
}

main().catch((error) => {
    console.error('Database setup failed:', error.message);
    console.error('Make sure PostgreSQL is running and the values in .env are correct.');
    process.exitCode = 1;
});
