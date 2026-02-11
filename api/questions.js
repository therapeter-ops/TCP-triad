import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    // Build direct connection string manually
    const url =
      `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}` +
      `@${process.env.PGHOST_UNPOOLED}/${process.env.PGDATABASE}?sslmode=require`;

    const sql = neon(url);

    const result = await sql`SELECT * FROM questions ORDER BY id;`;

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}




