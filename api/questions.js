import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.POSTGRES_URL_NON_POOLING);

    const info = await sql`
      SELECT
        current_database() AS db,
        current_schema() AS schema,
        inet_server_addr()::text AS server_ip
    `;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



