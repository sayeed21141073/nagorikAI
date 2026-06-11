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

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return { text: data.text };
  } catch (error) {
    console.error('API Error:', error);
    return {
      text: 'Sorry, I am having trouble connecting to the backend servers right now. Please try again later.',
    };
  }
};
