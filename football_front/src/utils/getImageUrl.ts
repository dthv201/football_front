export const getImageUrl = (img: string): string => {
    
    if (img.startsWith("http")) {
      return img;
    }
    // const baseUrl = import.meta.env.VITE_API_URL ;
    const fullUrl = `http://localhost:3000${img}`;
    console.log("Full URL:", fullUrl);
    return fullUrl;
  };