import { refreshAccessToken } from "./auth/authApi";

// Track in-flight refresh promise to prevent multiple simultaneous refresh calls
let refreshPromise = null;

/**
 * Custom fetch wrapper with automatic silent token refresh.
 * When any protected API request encounters an HTTP 401 (Access token expired),
 * it calls the refresh token endpoint, updates cookies, and transparently retries
 * the original request so the user never sees "Please login first".
 */
export const authFetch = async (url, options = {}) => {
  const config = {
    ...options,
    credentials: "include",
  };

  let response = await fetch(url, config);

  // If 401 Unauthorized, automatically refresh access token and retry
  //• ഒരുപക്ഷേ സെർവറിൽ നിന്ന് വന്ന മറുപടി 401 (അതായത് നിങ്ങളുടെ ലോഗിൻ ടോക്കൺ കാലാവധി കഴിഞ്ഞു/Unauthorized) ആണെങ്കിൽ മാത്രം ഈ if ബ്ലോക്കിന് ഉള്ളിലെ കോഡ് പ്രവർത്തിക്കാൻ തുടങ്ങും.

  if (response.status === 401) {
    try {
      
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken()
        .finally(() => {
          refreshPromise = null;
        });
      }
      //വിശദീകരണം: നിലവിൽ വേറെയൊരു ടോക്കൺ പുതുക്കൽ പ്രോസസ്സ് നടക്കുന്നില്ലെങ്കിൽ (!refreshPromise), 
      // പുതിയൊരു ടോക്കൺ പുതുക്കൽ പ്രക്രിയ ആരംഭിക്കുന്നു. അത് കഴിഞ്ഞ ഉടൻ തന്നെ (finally) ഈ വേരിയബിൾ വീണ്ടും പഴയതുപോലെ null ആക്കി മാറ്റുകയും ചെയ്യും.

      await refreshPromise;

      // Retry the original request with the renewed access token cookie
      response = await fetch(url, config);

//പുതിയ ടോക്കൺ ലഭിച്ചുകഴിഞ്ഞാൽ, ഉപയോക്താവ് ആദ്യം ചെയ്യാൻ ശ്രമിച്ച അതേ API റിക്വസ്റ്റ് (Original Request) യാതൊരു തടസ്സവുമില്ലാതെ വീണ്ടും ഒന്നുറപ്പിച്ചു വിളിക്കുന്നു (Retry ചെയ്യുന്നു).

    } catch (refreshErr) {
      console.error("Silent token refresh failed (session expired):", refreshErr);
    }
  }

  return response;
};

