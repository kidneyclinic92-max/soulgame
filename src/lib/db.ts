import sql from "mssql";

const config: sql.config = {
  server: process.env.AZURE_SQL_SERVER ?? "",
  port: parseInt(process.env.AZURE_SQL_PORT ?? "1433", 10),
  database: process.env.AZURE_SQL_DATABASE ?? "",
  user: process.env.AZURE_SQL_USER ?? "",
  password: process.env.AZURE_SQL_PASSWORD ?? "",
  options: {
    encrypt: true,
    trustServerCertificate: process.env.AZURE_SQL_TRUST_CERTIFICATE === "true",
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

/**
 * Get Azure SQL connection pool. Creates one if needed.
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool) return pool;
  pool = await sql.connect(config);
  console.log(
    `[DB] Azure SQL connected — ${config.server}:${config.port}/${config.database}`
  );
  return pool;
}

/**
 * Execute a parameterized query and return records.
 */
export async function query<T = unknown[]>(
  queryText: string,
  params?: Record<string, unknown>
): Promise<T> {
  const p = await getPool();
  const request = p.request();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        request.input(key, sql.NVarChar(50), null);
      } else if (typeof value === "number") {
        request.input(key, Number.isInteger(value) ? sql.Int : sql.Float, value);
      } else if (typeof value === "string") {
        request.input(key, sql.NVarChar(2000), value);
      } else if (value instanceof Date) {
        request.input(key, sql.DateTime2, value);
      } else {
        request.input(key, value);
      }
    }
  }
  const result = await request.query(queryText);
  return result.recordset as T;
}

/**
 * Execute a query and return the first record or null.
 */
export async function queryOne<T = unknown>(
  queryText: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  const rows = await query<T[]>(queryText, params);
  if (Array.isArray(rows) && rows.length > 0) return rows[0];
  if (rows && typeof rows === "object" && !Array.isArray(rows)) return rows as T;
  return null;
}

/**
 * Execute a non-query (INSERT, UPDATE, DELETE) and return affected rows / identity.
 */
export async function execute(
  queryText: string,
  params?: Record<string, unknown>
): Promise<{ rowsAffected: number[]; identity?: number }> {
  const p = await getPool();
  const request = p.request();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        request.input(key, sql.NVarChar(50), null);
      } else if (typeof value === "number") {
        request.input(key, Number.isInteger(value) ? sql.Int : sql.Float, value);
      } else if (typeof value === "string") {
        request.input(key, sql.NVarChar(2000), value);
      } else if (value instanceof Date) {
        request.input(key, sql.DateTime2, value);
      } else {
        request.input(key, value);
      }
    }
  }
  const result = await request.query(queryText);
  return { rowsAffected: result.rowsAffected ?? [] };
}

/**
 * Generate a simple unique id (for tables that need string IDs).
 */
export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}

export default { getPool, query, queryOne, execute, newId };
