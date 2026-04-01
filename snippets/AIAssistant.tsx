/// <reference types="react" />
/// <reference types="node" />

/**
 * AIAssistant - A custom chat component for Extensy Documentation.
 * Uses Google Gemini API (Flash 1.5) to answer questions based on docs.
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the Extensy Doc Assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const SYSTEM_PROMPT = `You are the official Extensy AI Assistant. Your goal is to help users build and publish Chrome extensions using the Extensy platform.

STRICT CONSTRAINTS:
1. Answer questions based ONLY on the documentation project you are part of.
2. If you don't know the answer or it isn't in the docs, say: "I'm sorry, I couldn't find an answer to that in our documentation. Please ask in our Discord community."
3. Do not provide code for other frameworks or general programming tips not related to Extensy.
4. Keep answers concise and developer-focused.`;

  const sendMessage = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Note: In production, process.env.NEXT_PUBLIC_GEMINI_API_KEY should be set in Vercel.
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDjGguUO9yr8QaMSLwyB8C3UZO2RJjSLDQ';
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + input }] }
            ]
          })
        }
      );

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I encountered an error processing your request.";
      
      setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: "Error: Unable to connect to the AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ 
      border: '1px solid #333', 
      borderRadius: '12px', 
      padding: '20px', 
      background: '#0a0a0a',
      color: '#fff',
      marginTop: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ height: '350px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg: Message, i: number) => (
          <div key={i} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#60A5FA' : '#1f2937',
            padding: '12px 16px',
            borderRadius: '16px',
            maxWidth: '85%',
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            {msg.content}
          </div>
        ))}
        {loading && <div style={{ color: '#888', fontStyle: 'italic', fontSize: '13px' }}>AI is thinking...</div>}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask a question..."
          style={{ 
            flex: 1, 
            background: '#1a1a1a', 
            border: '1px solid #444', 
            color: '#fff', 
            padding: '10px 15px', 
            borderRadius: '8px',
            outline: 'none'
          }}
        />
        <button 
          onClick={sendMessage}
          disabled={loading}
          style={{ 
            background: '#60A5FA', 
            color: '#000', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
