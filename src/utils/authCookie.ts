  export const setLoggedInCookie = () => {
    document.cookie = `isLoggedIn=true; path=/; max-age=3600`; // Cookie valide pendant 1 heure
  };

  export const isLoggedIn = () => {
    return document.cookie.split('; ').some(cookie => cookie.startsWith('isLoggedIn=true'));
  };

  export const removeLoggedInCookie = () => {
    document.cookie = 'isLoggedIn=; Max-Age=-1; path=/'; // Supprime le cookie en définissant une date d'expiration passée
  };
