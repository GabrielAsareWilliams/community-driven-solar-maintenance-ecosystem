const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const sendEmail = async (email: string, htmlContent: string) => {
    const endpoint = `${SERVER_URL}/mailgun`;
  
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          htmlContent,
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText);
        return undefined;
      }
  
      const contentType = res.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        return await res.json();
      } else {
        return await res.text();
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return undefined;
    }
  };