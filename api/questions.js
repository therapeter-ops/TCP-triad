import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL);
    const questions = await sql`
      SELECT id, dimension, answer_type, text, answers, is_meta
      FROM questions
      ORDER BY dimension, id;
    `;
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
