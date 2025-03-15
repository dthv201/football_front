export const getUserData = async () => {
    const response = await fetch("/api/user"); 
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  };
  