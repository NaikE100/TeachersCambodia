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
const SYSTEM_PROMPT = `You are a helpful AI assistant for TeachersCambodia, a comprehensive career services company specializing in CV optimization, job placement, and career support across ALL industries and sectors.

Key information about the company:
- **CV Services**: Professional CV review and optimization starting at R500
- **Service Packages**: 
  • CV Review (R500) - Professional review, ATS optimization, format enhancement
  • Standard Package (R1,299) - CV upgrade, cover letter writing, interview preparation
  • Premium Package (R2,499) - Full-service career support with dedicated consultant
- **Core Services**: CV optimization, cover letter writing, interview preparation, job placement assistance, visa support, document verification
- **Industries Served**: ALL industries including but not limited to:
  • Corporate/Business (finance, marketing, sales, management, IT, etc.)
  • Hospitality & Tourism (hotels, restaurants, event management)
  • Healthcare (nurses, doctors, medical support)
  • Construction & Engineering (architects, engineers, project managers)
  • Skilled Trades (electricians, plumbers, mechanics, technicians)
  • Education & Teaching (teachers, tutors, administrators)
  • Retail & Customer Service
  • And many more sectors
- **Locations**: Opportunities in Cambodia, UAE, and 6+ European countries
- **Contact**: Website: teacherscambodia.com | Email: info@teacherscambodia.com

IMPORTANT GUIDELINES:
- Emphasize that we serve ALL industries - teaching is just one of many sectors
- Focus on CV optimization and career services as the core offerings
- Be inclusive of all job seekers regardless of industry
- When asked about specific industries, acknowledge we support them all
- Don't prioritize or emphasize teaching over other industries
- Keep responses general enough to apply to any career sector
- Highlight that our CV services work for anyone needing career advancement

You should:
- Be friendly, professional, and helpful to all job seekers
- Answer questions about CV services, pricing, and application processes
- Guide users to relevant sections of the website
- Provide accurate information about packages (R500, R1,299, R2,499)
- Keep responses concise but informative
- If you don't know something, offer to connect them with the team
- Emphasize our comprehensive career support for ALL industries

Always respond in a conversational, helpful manner that reflects we're a career services company for everyone.`;

// Enhanced fallback responses with better context awareness
const ENHANCED_RESPONSES: Record<string, string | ((context: string[]) => string)> = {
  'hello': 'Hello! 👋 Welcome to TeachersCambodia. I\'m here to help you with CV optimization, job placement, and career support across ALL industries and sectors. How can I assist you today?',
  'hi': 'Hi there! 👋 I\'m your AI assistant. I can help you with questions about our CV services, job placement assistance, or career support for any industry. What would you like to know?',
  
  'cv': 'We offer professional CV optimization services starting at R500 for ALL industries and career sectors. Our packages include:\n\n• CV Review (R500) - Professional review, ATS optimization, format enhancement\n• Standard Package (R1,299) - CV upgrade, cover letter writing, interview prep\n• Premium Package (R2,499) - Full-service with dedicated consultant\n\nOur CV services work for corporate, hospitality, healthcare, construction, skilled trades, education, and all other sectors. Which package interests you?',
  
  'pricing': 'Our pricing for CV and career services (applicable to all industries):\n\n• **CV Review**: R500 - Perfect for quick optimization\n• **Standard Package**: R1,299 - Complete application support\n• **Premium Package**: R2,499 - Full-service career support\n\nAll packages include professional CV review and optimization tailored to your industry. Would you like details on any specific package?',
  
  'price': 'Here are our current prices:\n\n• CV Review: R500\n• Standard Package: R1,299\n• Premium Package: R2,499\n\nThese services are available for job seekers in all industries. What would you like to know about our services?',
  
  'requirements': (context: string[]) => {
    const hasIndustry = context.some(m => /teaching|hospitality|construction|healthcare|trade|corporate|business|finance|marketing|it|tech|retail/i.test(m));
    if (hasIndustry) {
      return 'Requirements vary by industry and position. We support candidates across all sectors - corporate, hospitality, healthcare, construction, skilled trades, education, IT, finance, and more. Our team can help assess your qualifications and guide you through the application process. Would you like to discuss your specific industry and situation?';
    }
    return 'Requirements depend on the industry and position you\'re targeting. We help job seekers across ALL industries. Our CV review service (R500) can help identify areas to strengthen for your sector, and our Standard Package (R1,299) includes full application support. What industry or career field are you interested in?';
  },
  
  'apply': 'You can apply for our CV and career services in a few ways:\n\n1. **Visit our website** - Use the "Apply" section to upload your resume\n2. **Choose a package** - Select from CV Review (R500), Standard (R1,299), or Premium (R2,499)\n3. **Contact us** - Email info@teacherscambodia.com for custom packages\n\nOur services work for all industries and career levels. I can help guide you through the process!',
  
  'contact': 'You can reach us through:\n\n• **Email**: info@teacherscambodia.com\n• **Website**: Visit the Contact section\n• **Chat**: I\'m here to help with questions!\n\nWhat would you like assistance with?',
  
  'help': 'I can help you with:\n\n• CV review and optimization services (for all industries)\n• Package information and pricing (R500-R2,499)\n• Application process guidance\n• Industry-specific support (corporate, hospitality, healthcare, construction, skilled trades, education, IT, and more)\n• Job placement assistance\n• Interview preparation\n• Visa support information\n\nWhat would you like to know more about?',
  
  'service': 'We offer comprehensive career services for ALL industries:\n\n• **CV Optimization** - Professional review and enhancement tailored to your sector\n• **Cover Letter Writing** - Industry-specific applications\n• **Interview Preparation** - Mock interviews and coaching\n• **Job Placement** - Assistance finding opportunities across multiple sectors\n• **Visa Support** - Guidance for international placements\n• **Dedicated Consultants** - Personal support (Premium package)\n\nWe serve corporate professionals, hospitality workers, healthcare staff, construction workers, skilled tradespeople, educators, IT professionals, and more. Which service interests you?',
  
  'package': 'We have three service packages available for all industries:\n\n1. **CV Review (R500)** - Quick optimization for any career sector\n2. **Standard (R1,299)** - Complete application support\n3. **Premium (R2,499)** - Full-service with dedicated consultant\n\nWould you like details on any specific package?',
  
  'industry': 'We provide CV and career services across ALL industries including:\n\n• Corporate & Business (finance, marketing, sales, management, HR, IT)\n• Hospitality & Tourism (hotels, restaurants, event management)\n• Healthcare (nurses, doctors, medical support staff)\n• Construction & Engineering (architects, engineers, project managers)\n• Skilled Trades (electricians, plumbers, mechanics, technicians)\n• Education & Teaching\n• Retail & Customer Service\n• And many more sectors\n\nWhat industry are you targeting? We can help optimize your CV for that specific sector!',
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
  
  // Industry-related questions
  if (lowerMessage.includes('industry') || lowerMessage.includes('sector') || lowerMessage.includes('field') || 
      lowerMessage.includes('corporate') || lowerMessage.includes('hospitality') || lowerMessage.includes('healthcare') ||
      lowerMessage.includes('construction') || lowerMessage.includes('trade') || lowerMessage.includes('business')) {
    return ENHANCED_RESPONSES['industry'] as string;
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
    return "Thank you for your message! A member of our team will get back to you soon. In the meantime, feel free to ask about our CV services (starting at R500), pricing packages (R500-R2,499), application processes, or how we can help your specific industry or career field.";
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
    
    return "I'm having trouble connecting right now, but I'd be happy to help! Feel free to ask about our CV services (starting at R500) for all industries, application packages, or email us at info@teacherscambodia.com. We serve job seekers across all career sectors!";
  }
}

// Export configuration for checking status
export function isAIEnabled(): boolean {
  return AI_CONFIG.enabled && !!AI_CONFIG.apiEndpoint;
}

export function getAIConfig(): AIConfig {
  return { ...AI_CONFIG };
}
