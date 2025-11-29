import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432'),
    user: process.env.PGUSER || 'obet',
    password: process.env.PGPASSWORD || 'askme123',
    database: process.env.PGDATABASE || 'postgres',
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
