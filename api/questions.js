import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    });

    const result = await pool.query(`
      SELECT id, dimension, answer_type, text, answers, is_meta
      FROM questions
      ORDER BY dimension, id;
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
