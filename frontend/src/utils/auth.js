// Utility functions for authentication

/**
 * Get authentication token from cookie
 * @returns {string|null} The auth token or null if not found
 */
export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "authToken") {
      return value;
    }
  }
  return null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
  return getAuthToken() !== null;
};

/**
 * Remove authentication token from cookie
 */
export const logout = () => {
  if (typeof window === "undefined") return;
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/**
 * Get authorization header for API requests
 * @returns {object} Headers object with Authorization header
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

