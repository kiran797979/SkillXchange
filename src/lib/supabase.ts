import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  availability: string[];
  is_public: boolean;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  created_at: string;
}

export interface UserSkillOffered {
  id: string;
  user_id: string;
  skill_id: string;
  proficiency_level: string;
  years_experience: number;
  created_at: string;
  skill?: Skill;
}

export interface UserSkillWanted {
  id: string;
  user_id: string;
  skill_id: string;
  urgency_level: string;
  created_at: string;
  skill?: Skill;
}

export interface SkillSwap {
  id: string;
  requester_id: string;
  provider_id: string;
  requested_skill_id: string;
  offered_skill_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message?: string;
  scheduled_date?: string;
  duration_minutes: number;
  meeting_link?: string;
  created_at: string;
  updated_at: string;
  requester?: Profile;
  provider?: Profile;
  requested_skill?: Skill;
  offered_skill?: Skill;
}

export interface Review {
  id: string;
  swap_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  reviewer?: Profile;
  reviewee?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  created_at: string;
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  // Create profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
      });

    if (profileError) throw profileError;
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getCurrentProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
};

// Profile operations
export const updateProfile = async (profileId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getProfile = async (profileId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) throw error;
  return data;
};

// Skills operations
export const getSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
};

export const getUserSkillsOffered = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_skills_offered')
    .select(`
      *,
      skill:skills(*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const getUserSkillsWanted = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_skills_wanted')
    .select(`
      *,
      skill:skills(*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const addUserSkillOffered = async (userId: string, skillId: string, proficiencyLevel: string = 'intermediate') => {
  const { data, error } = await supabase
    .from('user_skills_offered')
    .insert({
      user_id: userId,
      skill_id: skillId,
      proficiency_level: proficiencyLevel,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const addUserSkillWanted = async (userId: string, skillId: string, urgencyLevel: string = 'medium') => {
  const { data, error } = await supabase
    .from('user_skills_wanted')
    .insert({
      user_id: userId,
      skill_id: skillId,
      urgency_level: urgencyLevel,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeUserSkillOffered = async (userSkillId: string) => {
  const { error } = await supabase
    .from('user_skills_offered')
    .delete()
    .eq('id', userSkillId);

  if (error) throw error;
};

export const removeUserSkillWanted = async (userSkillId: string) => {
  const { error } = await supabase
    .from('user_skills_wanted')
    .delete()
    .eq('id', userSkillId);

  if (error) throw error;
};

// Skill swap operations
export const createSkillSwap = async (
  requesterId: string,
  providerId: string,
  requestedSkillId: string,
  offeredSkillId: string,
  message?: string
) => {
  const { data, error } = await supabase
    .from('skill_swaps')
    .insert({
      requester_id: requesterId,
      provider_id: providerId,
      requested_skill_id: requestedSkillId,
      offered_skill_id: offeredSkillId,
      message,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSkillSwaps = async (userId: string) => {
  const { data, error } = await supabase
    .from('skill_swaps')
    .select(`
      *,
      requester:profiles!skill_swaps_requester_id_fkey(*),
      provider:profiles!skill_swaps_provider_id_fkey(*),
      requested_skill:skills!skill_swaps_requested_skill_id_fkey(*),
      offered_skill:skills!skill_swaps_offered_skill_id_fkey(*)
    `)
    .or(`requester_id.eq.${userId},provider_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateSkillSwapStatus = async (swapId: string, status: string) => {
  const { data, error } = await supabase
    .from('skill_swaps')
    .update({ status })
    .eq('id', swapId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Match finding
export const findMatches = async (userId: string, limit: number = 10) => {
  // Get user's wanted skills
  const { data: wantedSkills } = await supabase
    .from('user_skills_wanted')
    .select('skill_id')
    .eq('user_id', userId);

  if (!wantedSkills?.length) return [];

  const wantedSkillIds = wantedSkills.map(s => s.skill_id);

  // Find users who offer those skills
  const { data: matches, error } = await supabase
    .from('user_skills_offered')
    .select(`
      user_id,
      skill_id,
      profiles!inner(*)
    `)
    .in('skill_id', wantedSkillIds)
    .neq('user_id', userId)
    .limit(limit);

  if (error) throw error;

  // Group by user and calculate compatibility
  const userMatches = new Map();
  
  matches?.forEach((match: any) => {
    const profile = match.profiles;
    if (!userMatches.has(profile.id)) {
      userMatches.set(profile.id, {
        ...profile,
        matchingSkills: [],
        compatibilityScore: 0,
      });
    }
    userMatches.get(profile.id).matchingSkills.push(match.skill_id);
  });

  // Convert to array and sort by compatibility
  return Array.from(userMatches.values())
    .map(user => ({
      ...user,
      compatibilityScore: Math.min(100, user.matchingSkills.length * 25),
    }))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};

// Notifications
export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
};

// Reviews
export const createReview = async (
  swapId: string,
  reviewerId: string,
  revieweeId: string,
  rating: number,
  comment?: string
) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      swap_id: swapId,
      reviewer_id: reviewerId,
      reviewee_id: revieweeId,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserReviews = async (userId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewer:profiles!reviews_reviewer_id_fkey(*)
    `)
    .eq('reviewee_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};