export const processUserQuery = async (query, history = []) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: query,
        history: history,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error((data && data.error) ? data.error : `API error: ${response.status}`);
    }
    
    if (data && data.error) {
      throw new Error(data.error);
    }
    
    return { text: data.text };
  } catch (error) {
    console.error('API Error:', error);
    return {
      text: `⚠️ **System Notice**: ${error.message}`,
    };
  }
};
