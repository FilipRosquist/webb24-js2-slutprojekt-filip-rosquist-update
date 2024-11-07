
export async function fetchProducts(searchQuery = "", sortOption = "az") {
    const url = `http://localhost:3000/api/search?query=${searchQuery}&sort=${sortOption}`;
    
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  