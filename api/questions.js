import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const url =
      `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}` +
      `@${process.env.PGHOST_UNPOOLED}/${process.env.PGDATABASE}?sslmode=require`;

    const sql = neon(url);

    const tables = await sql`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}





