import { useEffect, useState } from 'react';

export function useScriptLikes() {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);

  useEffect(() => {
    // Charger les likes depuis le localStorage
    const savedLikes = localStorage.getItem('script-likes');
    const savedUserLikes = localStorage.getItem('user-script-likes');
    
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
    if (savedUserLikes) {
      setUserLikes(JSON.parse(savedUserLikes));
    }
  }, []);

  const toggleLike = async (scriptTitle: string) => {
    if (userLikes.includes(scriptTitle)) {
      // Retirer le like
      setUserLikes(prev => {
        const newUserLikes = prev.filter(title => title !== scriptTitle);
        localStorage.setItem('user-script-likes', JSON.stringify(newUserLikes));
        return newUserLikes;
      });
      
      setLikes(prev => {
        const newLikes = {
          ...prev,
          [scriptTitle]: (prev[scriptTitle] || 1) - 1
        };
        localStorage.setItem('script-likes', JSON.stringify(newLikes));
        return newLikes;
      });
    } else {
      // Ajouter le like
      setUserLikes(prev => {
        const newUserLikes = [...prev, scriptTitle];
        localStorage.setItem('user-script-likes', JSON.stringify(newUserLikes));
        return newUserLikes;
      });
      
      setLikes(prev => {
        const newLikes = {
          ...prev,
          [scriptTitle]: (prev[scriptTitle] || 0) + 1
        };
        localStorage.setItem('script-likes', JSON.stringify(newLikes));
        return newLikes;
      });
    }
  };

  return { likes, userLikes, toggleLike };
} 