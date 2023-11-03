import { BASE_URL, API_KEY } from "./env";

export async function fetchCredit(creditId) {
    if (!BASE_URL || !API_KEY) throw new Error("API Key Missing");
  
    const encodedText = encodeURIComponent(creditId);
    const url = `${BASE_URL}/credit/${encodedText}`;
    const credit = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then((response) => {
      return response.json();
    });
  
    return credit;
  };
  