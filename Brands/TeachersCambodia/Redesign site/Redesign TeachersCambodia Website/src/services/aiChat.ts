// AI Chat Service
// This service provides AI-powered responses with fallback to enhanced keyword matching

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIConfig {
  apiEndpoint?: string;
  enabled: boolean;
}

// Configuration - can be set via environment variables or config
const AI_CONFIG: AIConfig = {
  apiEndpoint: import.meta.env.VITE_AI_API_ENDPOINT || undefined,
  enabled: import.meta.env.VITE_AI_ENABLED !== 'false', // Enabled by default if endpoint is set
};

// Enhanced context for better responses
const SYSTEM_PROMPT = `You are a helpful AI assistant for TeachersCambodia, a career services company that helps people with CV optimization, job placement, and career support across all industries and sectors (not just teaching). 

Key information about the company:
- Offers CV review and optimization services (starting at R500)
- Provides complete application support packages (Standard: R1,299, Premium: R2,499)
- Services include CV upgrade, cover letter writing, interview preparation
- Helps with visa support and job placement assistance
- Services all industries: teaching, hospitality, construction, healthcare, skilled trades, etc.
- Operates in Cambodia, UAE, and 6+ European countries
- Website: teacherscambodia.com
- Email: info@teacherscambodia.com

You should:
- Be friendly, professional, and helpful
- Answer questions about services, pricing, and processes
- Guide users to relevant sections of the website
- Provide accurate information about packages and pricing
- Keep responses concise but informative
- If you don't know something, offer to connect them with the team
- Focus on all career sectors, not just teaching

Always respond in a conversational, helpful manner.`;

// Enhanced fallback responses with better context awareness
const ENHANCED_RESPONSES: Record<string, string | ((context: string[]) => string)> = {
  'hello': 'Hello! 👋 Welcome to TeachersCambodia. I\'m here to help you with CV optimization, job placement, and career support across all industries. How can I assist you today?',
  'hi': 'Hi there! 👋 I\'m your AI assistant. I can help you with questions about our CV services, job placement assistance, or career support. What would you like to know?',
  
  'cv': 'We offer professional CV optimization services starting at R500. Our packages include:\n\n• CV Review (R500) - Professional review, ATS optimization, format enhancement\n• Standard Package (R1,299) - CV upgrade, cover letter, interview prep\n• Premium Package (R2,499) - Full-service with dedicated consultant\n\nWhich package interests you?',
  
  'pricing': 'Our pricing for CV and career services:\n\n• **CV Review**: R500 - Perfect for quick optimization\n• **Standard Package**: R1,299 - Complete application support\n• **Premium Package**: R2,499 - Full-service career support\n\nAll packages include professional CV review and optimization. Would you like details on any specific package?',
  
  'price': 'Here are our current prices:\n\n• CV Review: R500\n• Standard Package: R1,299\n• Premium Package: R2,499\n\nWhat would you like to know about our services?',
  
  'requirements': (context: string[]) => {
    const hasIndustry = context.some(m => /teaching|hospitality|construction|healthcare|trade/i.test(m));
    if (hasIndustry) {
      return 'Requirements vary by industry and position. Our team can help assess your qualifications and guide you through the application process. Would you like to discuss your specific situation?';
    }
    return 'Requirements depend on the industry and position you\'re targeting. Our CV review service (R500) can help identify areas to strengthen, and our Standard Package (R1,299) includes full application support. What industry are you interested in?';
  },
  
  'apply': 'You can apply for our services in a few ways:\n\n1. **Visit our website** - Use the "Apply" section to upload your resume\n2. **Choose a package** - Select from CV Review (R500), Standard (R1,299), or Premium (R2,499)\n3. **Contact us** - Email info@teacherscambodia.com for custom packages\n\nI can help guide you through the process!',
  
  'contact': 'You can reach us through:\n\n• **Email**: info@teacherscambodia.com\n• **Website**: Visit the Contact section\n• **Chat**: I\'m here to help with questions!\n\nWhat would you like assistance with?',
  
  'help': 'I can help you with:\n\n• CV review and optimization services\n• Package information and pricing (R500-R2,499)\n• Application process guidance\n• Industry requirements (all sectors)\n• Job placement assistance\n• Interview preparation\n• Visa support information\n\nWhat would you like to know more about?',
  
  'service': 'We offer comprehensive career services:\n\n• **CV Optimization** - Professional review and enhancement\n• **Cover Letter Writing** - Tailored to your applications\n• **Interview Preparation** - Mock interviews and coaching\n• **Job Placement** - Assistance finding opportunities\n• **Visa Support** - Guidance for international placements\n• **Dedicated Consultants** - Personal support (Premium)\n\nWhich service interests you?',
  
  'package': 'We have three service packages:\n\n1. **CV Review (R500)** - Quick optimization\n2. **Standard (R1,299)** - Complete application support\n3. **Premium (R2,499)** - Full-service with dedicated consultant\n\nWould you like details on any specific package?',
};

function findEnhancedResponse(userMessage: string, conversationHistory: string[]): string | null {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Exact matches
  for (const [key, response] of Object.entries(ENHANCED_RESPONSES)) {
    if (lowerMessage === key || lowerMessage.includes(key)) {
      if (typeof response === 'function') {
        return response(conversationHistory);
      }
      return response;
    }
  }
  
  // Pattern matching with context
  if (lowerMessage.includes('how much') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return ENHANCED_RESPONSES['pricing'] as string;
  }
  
  if (lowerMessage.includes('cv') || lowerMessage.includes('resume')) {
    return ENHANCED_RESPONSES['cv'] as string;
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    return ENHANCED_RESPONSES['service'] as string;
  }
  
  if (lowerMessage.includes('need') || lowerMessage.includes('require')) {
    return typeof ENHANCED_RESPONSES['requirements'] === 'function' 
      ? ENHANCED_RESPONSES['requirements'](conversationHistory)
      : null;
  }
  
  return null;
}

// AI API call function
export async function getAIResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  // If AI is disabled or no endpoint, use fallback
  if (!AI_CONFIG.enabled || !AI_CONFIG.apiEndpoint) {
    const history = conversationHistory.map(m => m.content);
    const fallback = findEnhancedResponse(userMessage, history);
    if (fallback) {
      // Add small delay to simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      return fallback;
    }
    return "Thank you for your message! A member of our team will get back to you soon. In the meantime, feel free to ask about our CV services, pricing packages (R500-R2,499), or application processes.";
  }

  try {
    // Prepare messages with system prompt
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    // Call AI API endpoint
    const response = await fetch(AI_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle different response formats
    if (data.response || data.message || data.content) {
      return data.response || data.message || data.content;
    }
    
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    
    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('AI API error:', error);
    
    // Fallback to enhanced responses
    const history = conversationHistory.map(m => m.content);
    const fallback = findEnhancedResponse(userMessage, history);
    if (fallback) {
      return fallback;
    }
    
    return "I'm having trouble connecting right now, but I'd be happy to help! Feel free to ask about our CV services (starting at R500), application packages, or email us at info@teacherscambodia.com.";
  }
}

// Export configuration for checking status
export function isAIEnabled(): boolean {
  return AI_CONFIG.enabled && !!AI_CONFIG.apiEndpoint;
}

export function getAIConfig(): AIConfig {
  return { ...AI_CONFIG };
}
