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

/**
 * Safely get the current path for returnUrl, avoiding template variables
 * @param {object} router - Next.js router object
 * @param {string} artistId - Optional artistId to construct path
 * @returns {string} Safe path to use as returnUrl
 */
export const getSafeReturnPath = (router, artistId = null) => {
  if (typeof window === "undefined") {
    // Server-side: use default
    return "/user-product-page/69510d53b813f65b9da439b2";
  }
  
  // If artistId is provided, use it
  if (artistId) {
    return `/user-product-page/${artistId}`;
  }
  
  // Check router.asPath but validate it doesn't contain template variables
  const asPath = router?.asPath;
  if (asPath && 
      !asPath.includes("[") && 
      !asPath.includes("]") && 
      asPath.startsWith("/") &&
      asPath !== "/user-product-page/[artistId]") {
    return asPath;
  }
  
  // Default fallback
  return "/user-product-page/69510d53b813f65b9da439b2";
};
