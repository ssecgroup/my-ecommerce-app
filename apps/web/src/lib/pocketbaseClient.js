// PocketBase client for frontend
import PocketBase from 'pocketbase';

// Initialize PocketBase client
// Use environment variable or default to localhost
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// For debugging in development
if (import.meta.env.DEV) {
    console.log('PocketBase client initialized with URL:', pb.baseUrl);
}

// Export the client instance
export default pb;

// Helper function to get image URLs from PocketBase
export const getPbImageUrl = (collection, record, filename, thumb = '0x0') => {
    if (!filename || !record) return null;
    return pb.files.getUrl(record, filename, { thumb });
};

// Helper for authentication state
export const isAuthenticated = () => {
    return pb.authStore.isValid;
};

// Helper to get current user
export const getCurrentUser = () => {
    return pb.authStore.model;
};
