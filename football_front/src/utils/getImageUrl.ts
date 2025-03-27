export const getImageUrl = (img?: string): string => {
    const defaultImg = "/default-avatar.png"; 
    if (!img) return defaultImg;
    if (img.startsWith("http")) {
      return img;
    }
    const baseUrl = import.meta.env.VITE_SERVER_URL ;
    const fullUrl = `${baseUrl}${img}`;
    return fullUrl;
  };