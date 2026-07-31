CREATE TABLE IF NOT EXISTS email_logs (
  id TEXT PRIMARY KEY NOT NULL,
  recipient TEXT NOT NULL,
  sender TEXT NOT NULL,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL,
  related_record_id TEXT,
  provider_message_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  sent_at TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS email_logs_created_at_idx ON email_logs(created_at);
CREATE INDEX IF NOT EXISTS email_logs_type_idx ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS email_logs_related_record_idx ON email_logs(related_record_id);
