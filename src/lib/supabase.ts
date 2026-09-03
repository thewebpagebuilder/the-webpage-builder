"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "placeholder";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitLead(data: any) {
  if (supabaseAnonKey === "placeholder") {
    console.warn("Supabase is not configured. Mocking lead submission.");
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const { error } = await supabase
    .from("leads")
    .insert([data]);
    
  if (error) throw error;
  return true;
}
