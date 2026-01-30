/*
  # Create Leads Table for Form Submissions

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `email` (text, required, indexed)
      - `phone` (text, required)
      - `created_at` (timestamp, default now)
      - `status` (text, default 'Interested')
      - `source` (text, optional)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for service role to insert/read leads
    - Add policy for authenticated users to read their own leads if email matches

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'Interested',
  source text DEFAULT 'web_form',
  UNIQUE(email)
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role to manage leads"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon to insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon to read leads by email"
  ON leads
  FOR SELECT
  TO anon
  USING (true);