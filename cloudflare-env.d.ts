interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
}
interface D1Database { prepare(query: string): D1PreparedStatement; }
interface CloudflareEnv {
  EMAIL_LOGS: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REFRESH_TOKEN: string;
  GOOGLE_SENDER_EMAIL: string;
  GOOGLE_REPLY_TO?: string;
}
