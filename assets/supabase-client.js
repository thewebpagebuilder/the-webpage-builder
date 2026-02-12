
// Initialize Supabase Client
// Ensure the Supabase JS library is loaded in the HTML before this script runs

console.log('Initializing Supabase...');

if (!window.supabase) {
    console.error('Supabase library not loaded!');
    alert('Critical Error: Supabase library failed to load. Please refresh.');
}

const SUPABASE_URL = 'https://gvwchebymcwsjigdxdyj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2d2NoZWJ5bWN3c2ppZ2R4ZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDgzNzYsImV4cCI6MjA4NjM4NDM3Nn0.PvITLv9RiEJ0iTZmWEbE04lAwY6sWMLgA43v6LrvrPo';

// Attach to window to ensure global availability
window.supabaseApp = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper for Contacts
window.addContact = async function (contact) {
    console.log('Sending contact to Supabase:', contact);

    // Explicitly use the attached client
    const { data, error } = await window.supabaseApp
        .from('contacts')
        .insert([contact])
        .select();

    if (error) {
        console.error('Supabase Error:', error);
        alert('Database Error: ' + error.message);
    } else {
        console.log('Supabase Success:', data);
    }

    return { data, error };
}

// Helper for Leads
window.addLead = async function (lead) {
    const { data, error } = await window.supabaseApp
        .from('leads')
        .insert([lead])
        .select();
    if (error) console.error('Error adding lead:', error);
    return { data, error };
}

console.log('Supabase Client Initialized and attached to window.');
