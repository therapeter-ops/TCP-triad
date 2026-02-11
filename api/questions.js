import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL_NON_POOLING);

    const result = await sql`SELECT * FROM public.questions ORDER BY id;`;

    res.status(200).json(result);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message });
  }
}



