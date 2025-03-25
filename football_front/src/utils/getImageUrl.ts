export const getImageUrl = (img: string): string => {
    
    if (img.startsWith("http")) {
      return img;
    }
    const baseUrl = import.meta.env.VITE_SERVER_URL ;
    const fullUrl = `${baseUrl}${img}`;
    // console.log("Full URL:", fullUrl); 
    return fullUrl;
  };