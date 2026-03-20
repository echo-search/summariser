// ddg.js
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const query = event.queryStringParameters.q;
    if (!query) {
      return { statusCode: 400, body: "Missing query parameter `q`" };
    }

    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&skip_disambig=1`;
    const res = await fetch(url);
    const data = await res.json();

    // Return JSON to frontend
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
