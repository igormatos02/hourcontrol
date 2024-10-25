//import { supabase } from '../lib/supabase'
var user=null;
// Function to sign up a new user
export const signUp = async (email, password) => {
 // const { user, error } = await supabase.auth.signUp({ email, password })
  //if (error) throw error
  //return user
  return "2";
}

// Function to sign in an existing user
export const signIn = async (email, password) => {
  //const { user, error } = await supabase.auth.signIn({ email, password })
  //if (error) throw error
  //return user
  user = "2";
  return user;
}

// Function to get the currently authenticated user
export const getUser = async () => {
  //const { data: { user }, error } = await supabase.auth.getUser()
  //if (error) throw error
  //return user
  return user;
}

// Function to sign out the current user
export const signOut = async () => {
 // const { error } = await supabase.auth.signOut()
  //if (error) throw error
}
