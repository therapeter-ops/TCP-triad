import pg from 'pg';
const { Pool } = pg;

export default async function handler(req, res) {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    });

    // Ensure public schema is in search path for this connection
    await pool.query(`SET search_path TO public`);

    const result = await pool.query(`
      SELECT id, dimension, answer_type, text, answers, is_meta
      FROM public.questions
      ORDER BY dimension, id;
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


