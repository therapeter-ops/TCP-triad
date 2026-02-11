import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    });

    const r = await pool.query(`
      SELECT current_database() AS db, current_schema() AS schema;
    `);

    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


