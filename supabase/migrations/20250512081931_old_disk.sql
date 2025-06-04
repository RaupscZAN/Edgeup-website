/*
  # Initial Schema Setup

  1. New Tables
    - users (extends auth.users)
    - pages (CMS content)
    - media (media library)
    - form_submissions
    - site_settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authentication and authorization
*/

-- Users table to extend auth.users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text,
  role text CHECK (role IN ('admin', 'editor')) DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pages table for CMS content
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  blocks jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Media library
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  thumbnail text,
  size integer NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id)
);

-- Form submissions
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  institution text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  submitted_at timestamptz DEFAULT now()
);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL,
  logo text,
  favicon text,
  contact_info jsonb DEFAULT '{}'::jsonb,
  seo_defaults jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Pages policies
CREATE POLICY "Anyone can read published pages"
  ON pages
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins have full access to pages"
  ON pages
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Media policies
CREATE POLICY "Anyone can view media"
  ON media
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage media"
  ON media
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Form submissions policies
CREATE POLICY "Anyone can create submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Site settings policies
CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON site_settings
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Insert default admin user
DO $$
DECLARE
  admin_uuid uuid := '00000000-0000-0000-0000-000000000001';
BEGIN
  -- Insert into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    admin_uuid,
    'authenticated',
    'authenticated',
    'admin@edgeup.ai',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now()
  ) ON CONFLICT DO NOTHING;

  -- Insert into users table
  INSERT INTO users (id, name, role)
  VALUES (admin_uuid, 'Admin User', 'admin')
  ON CONFLICT DO NOTHING;
END $$;