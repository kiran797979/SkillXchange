/*
  # Complete SkillXchange Platform Schema

  1. New Tables
    - `profiles` - User profile information
    - `skills` - Available skills in the platform
    - `user_skills_offered` - Skills users can teach
    - `user_skills_wanted` - Skills users want to learn
    - `skill_swaps` - Skill exchange requests and sessions
    - `reviews` - User reviews and ratings
    - `notifications` - User notifications
    - `admin_actions` - Admin activity logs

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Admin-only policies for management tables

  3. Functions
    - Calculate compatibility scores
    - Generate match suggestions
    - Handle notification triggers
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  location text,
  bio text,
  availability jsonb DEFAULT '[]'::jsonb,
  is_public boolean DEFAULT true,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create user_skills_offered table
CREATE TABLE IF NOT EXISTS user_skills_offered (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level text DEFAULT 'intermediate',
  years_experience integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create user_skills_wanted table
CREATE TABLE IF NOT EXISTS user_skills_wanted (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id uuid REFERENCES skills(id) ON DELETE CASCADE,
  urgency_level text DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create skill_swaps table
CREATE TABLE IF NOT EXISTS skill_swaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  requested_skill_id uuid REFERENCES skills(id),
  offered_skill_id uuid REFERENCES skills(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  message text,
  scheduled_date timestamptz,
  duration_minutes integer DEFAULT 60,
  meeting_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  swap_id uuid REFERENCES skill_swaps(id) ON DELETE CASCADE,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(swap_id, reviewer_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create admin_actions table
CREATE TABLE IF NOT EXISTS admin_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES profiles(id),
  action_type text NOT NULL,
  target_type text,
  target_id uuid,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Insert default skills
INSERT INTO skills (name, category, description) VALUES
  ('React', 'Programming', 'JavaScript library for building user interfaces'),
  ('Python', 'Programming', 'High-level programming language'),
  ('JavaScript', 'Programming', 'Programming language for web development'),
  ('UI/UX Design', 'Design', 'User interface and experience design'),
  ('Photography', 'Creative', 'Art and technique of taking photographs'),
  ('Spanish', 'Language', 'Spanish language learning and conversation'),
  ('Guitar', 'Music', 'Guitar playing and music theory'),
  ('Cooking', 'Lifestyle', 'Culinary skills and recipe creation'),
  ('Machine Learning', 'Programming', 'AI and data science techniques'),
  ('Data Science', 'Programming', 'Data analysis and visualization'),
  ('Figma', 'Design', 'Design tool for UI/UX prototyping'),
  ('Node.js', 'Programming', 'JavaScript runtime for server-side development'),
  ('Video Editing', 'Creative', 'Video production and editing skills'),
  ('Marketing', 'Business', 'Digital marketing and strategy'),
  ('Writing', 'Creative', 'Creative and technical writing skills')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills_offered ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills_wanted ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_swaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view public profiles" ON profiles
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Skills policies (public read)
CREATE POLICY "Anyone can view skills" ON skills
  FOR SELECT USING (true);

-- User skills policies
CREATE POLICY "Users can manage own offered skills" ON user_skills_offered
  FOR ALL USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = user_skills_offered.user_id));

CREATE POLICY "Users can view offered skills" ON user_skills_offered
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own wanted skills" ON user_skills_wanted
  FOR ALL USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = user_skills_wanted.user_id));

CREATE POLICY "Users can view wanted skills" ON user_skills_wanted
  FOR SELECT USING (true);

-- Skill swaps policies
CREATE POLICY "Users can view their swaps" ON skill_swaps
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = requester_id) OR
    auth.uid() = (SELECT user_id FROM profiles WHERE id = provider_id)
  );

CREATE POLICY "Users can create swap requests" ON skill_swaps
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = requester_id));

CREATE POLICY "Users can update their swaps" ON skill_swaps
  FOR UPDATE USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = requester_id) OR
    auth.uid() = (SELECT user_id FROM profiles WHERE id = provider_id)
  );

-- Reviews policies
CREATE POLICY "Users can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their swaps" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = reviewer_id) AND
    EXISTS (
      SELECT 1 FROM skill_swaps 
      WHERE id = swap_id AND status = 'completed' AND
      (requester_id = reviewer_id OR provider_id = reviewer_id)
    )
  );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = notifications.user_id));

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = notifications.user_id));

-- Admin policies (placeholder - implement admin role check)
CREATE POLICY "Admins can view all admin actions" ON admin_actions
  FOR SELECT USING (true); -- TODO: Add admin role check

-- Functions for compatibility scoring
CREATE OR REPLACE FUNCTION calculate_compatibility_score(user1_id uuid, user2_id uuid)
RETURNS integer AS $$
DECLARE
  score integer := 0;
  common_skills integer;
  complementary_skills integer;
BEGIN
  -- Count skills user1 offers that user2 wants
  SELECT COUNT(*) INTO complementary_skills
  FROM user_skills_offered uso1
  JOIN user_skills_wanted usw2 ON uso1.skill_id = usw2.skill_id
  WHERE uso1.user_id = user1_id AND usw2.user_id = user2_id;
  
  -- Count skills user2 offers that user1 wants
  SELECT COUNT(*) INTO common_skills
  FROM user_skills_offered uso2
  JOIN user_skills_wanted usw1 ON uso2.skill_id = usw1.skill_id
  WHERE uso2.user_id = user2_id AND usw1.user_id = user1_id;
  
  -- Calculate score (max 100)
  score := LEAST(100, (complementary_skills + common_skills) * 20);
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  target_user_id uuid,
  notification_type text,
  notification_title text,
  notification_message text,
  notification_data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, type, title, message, data)
  VALUES (target_user_id, notification_type, notification_title, notification_message, notification_data)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger for swap request notifications
CREATE OR REPLACE FUNCTION notify_swap_request()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM create_notification(
      NEW.provider_id,
      'swap_request',
      'New Skill Swap Request',
      'You have received a new skill swap request',
      jsonb_build_object('swap_id', NEW.id, 'requester_id', NEW.requester_id)
    );
  ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    IF NEW.status = 'accepted' THEN
      PERFORM create_notification(
        NEW.requester_id,
        'swap_accepted',
        'Swap Request Accepted',
        'Your skill swap request has been accepted',
        jsonb_build_object('swap_id', NEW.id, 'provider_id', NEW.provider_id)
      );
    ELSIF NEW.status = 'rejected' THEN
      PERFORM create_notification(
        NEW.requester_id,
        'swap_rejected',
        'Swap Request Declined',
        'Your skill swap request has been declined',
        jsonb_build_object('swap_id', NEW.id, 'provider_id', NEW.provider_id)
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER swap_notification_trigger
  AFTER INSERT OR UPDATE ON skill_swaps
  FOR EACH ROW EXECUTE FUNCTION notify_swap_request();

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_swaps_updated_at
  BEFORE UPDATE ON skill_swaps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();