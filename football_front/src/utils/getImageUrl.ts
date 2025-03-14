export const getImageUrl = (img: string): string => {
    
    if (img.startsWith("http")) {
      return img;
    }
    const baseUrl = import.meta.env.VITE_API_URL ;
    const fullUrl = `${baseUrl}${img}`;
  
    return fullUrl;
  };