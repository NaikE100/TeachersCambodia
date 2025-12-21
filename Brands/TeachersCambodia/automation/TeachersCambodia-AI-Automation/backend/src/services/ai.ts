import OpenAI from 'openai';
import { logger, logAIRequest, logAIError } from '../utils/logger';
import { getCachedAIResponse, cacheAIResponse } from '../config/redis';
import { AIRequest, AIResponse, AIRequestType, AIOptions, AIMetadata } from '../types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Service Configuration
const AI_CONFIG = {
  model: process.env.OPENAI_MODEL || 'gpt-4',
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
  timeout: 30000,
};

// Initialize AI Services
export const initializeAIServices = async (): Promise<void> => {
  try {
    // Test OpenAI connection
    const testResponse = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [{ role: 'user', content: 'Hello, this is a test.' }],
      max_tokens: 10,
    });
    
    logger.info('✅ AI services initialized successfully');
    logger.info(`🤖 Using model: ${AI_CONFIG.model}`);
  } catch (error) {
    logger.error('❌ Failed to initialize AI services:', error);
    throw error;
  }
};

// Main AI processing function
export const processAIRequest = async (
  request: AIRequest
): Promise<AIResponse> => {
  const startTime = Date.now();
  
  try {
    // Check cache first
    const cacheKey = `${request.type}:${JSON.stringify(request.data)}`;
    const cachedResponse = await getCachedAIResponse(cacheKey);
    
    if (cachedResponse) {
      logger.info(`Cache hit for ${request.type}`);
      return {
        success: true,
        data: cachedResponse,
        metadata: {
          model: AI_CONFIG.model,
          tokens: 0,
          duration: Date.now() - startTime,
          cost: 0,
          timestamp: new Date(),
        },
      };
    }

    // Process based on request type
    let result: any;
    
    switch (request.type) {
      case AIRequestType.JOB_MATCHING:
        result = await processJobMatching(request.data, request.options);
        break;
      case AIRequestType.CONTENT_GENERATION:
        result = await processContentGeneration(request.data, request.options);
        break;
      case AIRequestType.DOCUMENT_ANALYSIS:
        result = await processDocumentAnalysis(request.data, request.options);
        break;
      case AIRequestType.TRANSLATION:
        result = await processTranslation(request.data, request.options);
        break;
      case AIRequestType.CHATBOT:
        result = await processChatbot(request.data, request.options);
        break;
      case AIRequestType.RESUME_PARSING:
        result = await processResumeParsing(request.data, request.options);
        break;
      case AIRequestType.INTERVIEW_PREP:
        result = await processInterviewPrep(request.data, request.options);
        break;
      default:
        throw new Error(`Unknown AI request type: ${request.type}`);
    }

    // Cache the response
    await cacheAIResponse(cacheKey, result);

    const duration = Date.now() - startTime;
    
    const response: AIResponse = {
      success: true,
      data: result,
      metadata: {
        model: AI_CONFIG.model,
        tokens: result.usage?.total_tokens || 0,
        duration,
        cost: calculateCost(result.usage?.total_tokens || 0),
        timestamp: new Date(),
      },
    };

    logAIRequest(request, response, duration);
    return response;

  } catch (error) {
    const duration = Date.now() - startTime;
    logAIError(error, request);
    
    return {
      success: false,
      data: null,
      metadata: {
        model: AI_CONFIG.model,
        tokens: 0,
        duration,
        cost: 0,
        timestamp: new Date(),
      },
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Job Matching AI Service
const processJobMatching = async (data: any, options?: AIOptions) => {
  const { teacherProfile, jobRequirements } = data;
  
  const prompt = `
    Analyze the compatibility between a teacher profile and job requirements.
    
    Teacher Profile:
    - Qualifications: ${teacherProfile.qualifications?.join(', ') || 'Not specified'}
    - Experience: ${teacherProfile.experience?.map(exp => `${exp.position} at ${exp.institution}`).join(', ') || 'Not specified'}
    - Skills: ${teacherProfile.skills?.map(skill => `${skill.name} (${skill.level})`).join(', ') || 'Not specified'}
    - Languages: ${teacherProfile.languages?.join(', ') || 'Not specified'}
    - Location: ${teacherProfile.location?.city}, ${teacherProfile.location?.country || 'Not specified'}
    - Salary Expectations: ${teacherProfile.preferences?.salaryRange?.min}-${teacherProfile.preferences?.salaryRange?.max} ${teacherProfile.preferences?.salaryRange?.currency || 'USD'}
    
    Job Requirements:
    - Title: ${jobRequirements.title}
    - Required Qualifications: ${jobRequirements.qualifications?.join(', ') || 'Not specified'}
    - Required Experience: ${jobRequirements.experience || 'Not specified'}
    - Required Skills: ${jobRequirements.skills?.join(', ') || 'Not specified'}
    - Required Languages: ${jobRequirements.languages?.join(', ') || 'Not specified'}
    - Location: ${jobRequirements.location?.city}, ${jobRequirements.location?.country || 'Not specified'}
    - Salary Range: ${jobRequirements.salary?.min}-${jobRequirements.salary?.max} ${jobRequirements.salary?.currency || 'USD'}
    
    Please provide:
    1. A match score (0-100)
    2. Key strengths that make this a good match
    3. Potential concerns or gaps
    4. Cultural fit assessment
    5. Specific recommendations for the teacher
    6. Interview preparation tips
    
    Respond in JSON format with the following structure:
    {
      "matchScore": number,
      "strengths": string[],
      "concerns": string[],
      "culturalFit": number,
      "recommendations": string[],
      "interviewTips": string[],
      "skillGaps": string[],
      "overallAssessment": string
    }
  `;

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  const content = response.choices[0]?.message?.content;
  return {
    ...JSON.parse(content || '{}'),
    usage: response.usage,
  };
};

// Content Generation AI Service
const processContentGeneration = async (data: any, options?: AIOptions) => {
  const { type, details, context } = data;
  
  let prompt = '';
  
  switch (type) {
    case 'job_posting':
      prompt = `
        Create an engaging job posting for a teaching position in Cambodia.
        
        Job Details:
        - Position: ${details.position}
        - School: ${details.school}
        - Location: ${details.location}
        - Requirements: ${details.requirements?.join(', ')}
        - Benefits: ${details.benefits?.join(', ')}
        - Salary: ${details.salary}
        
        Please create:
        1. An attention-grabbing title
        2. A compelling job description
        3. Detailed requirements section
        4. Attractive benefits section
        5. Call-to-action
        6. SEO-optimized keywords
        
        Make it professional, engaging, and appealing to international teachers.
        Include information about Cambodia's culture and education system.
      `;
      break;
      
    case 'school_profile':
      prompt = `
        Create an attractive school profile description.
        
        School Details:
        - Name: ${details.name}
        - Type: ${details.type}
        - Location: ${details.location}
        - Mission: ${details.mission}
        - Values: ${details.values?.join(', ')}
        - Facilities: ${details.facilities?.join(', ')}
        
        Create a compelling profile that highlights the school's unique qualities,
        educational approach, and benefits for teachers.
      `;
      break;
      
    default:
      prompt = `Generate content for: ${type}\n\nDetails: ${JSON.stringify(details)}`;
  }

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  return {
    content: response.choices[0]?.message?.content,
    usage: response.usage,
  };
};

// Document Analysis AI Service
const processDocumentAnalysis = async (data: any, options?: AIOptions) => {
  const { documentType, content, text } = data;
  
  let prompt = '';
  
  switch (documentType) {
    case 'resume':
      prompt = `
        Analyze this resume and extract key information:
        
        Resume Content:
        ${text}
        
        Please extract and structure:
        1. Personal Information
        2. Education History
        3. Work Experience
        4. Skills and Certifications
        5. Languages
        6. Key Achievements
        7. Contact Information
        
        Respond in JSON format.
      `;
      break;
      
    case 'certificate':
      prompt = `
        Analyze this certificate and extract key information:
        
        Certificate Content:
        ${text}
        
        Please extract:
        1. Certificate Name
        2. Issuing Organization
        3. Issue Date
        4. Expiry Date (if any)
        5. Verification Status
        6. Credential Level
        
        Respond in JSON format.
      `;
      break;
      
    default:
      prompt = `Analyze this ${documentType} document:\n\n${text}`;
  }

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  return {
    analysis: JSON.parse(response.choices[0]?.message?.content || '{}'),
    usage: response.usage,
  };
};

// Translation AI Service
const processTranslation = async (data: any, options?: AIOptions) => {
  const { text, fromLanguage, toLanguage, context } = data;
  
  const prompt = `
    Translate the following text from ${fromLanguage} to ${toLanguage}.
    
    Context: ${context || 'General'}
    
    Text to translate:
    ${text}
    
    Please provide:
    1. The translated text
    2. Any cultural considerations
    3. Alternative translations if applicable
    4. Confidence level in the translation
    
    Respond in JSON format.
  `;

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  return {
    translation: JSON.parse(response.choices[0]?.message?.content || '{}'),
    usage: response.usage,
  };
};

// Chatbot AI Service
const processChatbot = async (data: any, options?: AIOptions) => {
  const { message, context, userType, conversationHistory } = data;
  
  const systemPrompt = `
    You are an AI assistant for TeachersCambodia.com, a platform connecting teachers with opportunities in Cambodia.
    
    User Type: ${userType || 'teacher'}
    Context: ${context || 'general'}
    
    Guidelines:
    - Be helpful, professional, and friendly
    - Provide accurate information about teaching in Cambodia
    - Help with job search, application process, and cultural adaptation
    - If you don't know something, suggest contacting support
    - Keep responses concise but informative
    - Use appropriate language level (English/Khmer as needed)
  `;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory?.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })) || [],
    { role: 'user', content: message },
  ];

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages,
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  return {
    response: response.choices[0]?.message?.content,
    usage: response.usage,
  };
};

// Resume Parsing AI Service
const processResumeParsing = async (data: any, options?: AIOptions) => {
  const { resumeText, format } = data;
  
  const prompt = `
    Parse and structure this resume into a standardized format:
    
    Resume Text:
    ${resumeText}
    
    Please extract and structure the following information:
    1. Personal Information (name, email, phone, location)
    2. Summary/Objective
    3. Education (degree, institution, year, GPA if available)
    4. Work Experience (position, company, dates, responsibilities, achievements)
    5. Skills (technical, soft skills, languages)
    6. Certifications
    7. Awards/Achievements
    8. References (if available)
    
    Format the response as structured JSON data.
  `;

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  return {
    parsedData: JSON.parse(response.choices[0]?.message?.content || '{}'),
    usage: response.usage,
  };
};

// Interview Preparation AI Service
const processInterviewPrep = async (data: any, options?: AIOptions) => {
  const { jobDetails, teacherProfile, interviewType } = data;
  
  const prompt = `
    Provide interview preparation guidance for a teacher applying to a position in Cambodia.
    
    Job Details:
    - Position: ${jobDetails.position}
    - School: ${jobDetails.school}
    - Requirements: ${jobDetails.requirements?.join(', ')}
    
    Teacher Profile:
    - Experience: ${teacherProfile.experience?.length || 0} years
    - Qualifications: ${teacherProfile.qualifications?.join(', ')}
    - Languages: ${teacherProfile.languages?.join(', ')}
    
    Interview Type: ${interviewType || 'general'}
    
    Please provide:
    1. Common interview questions for this position
    2. Sample answers and best practices
    3. Cultural considerations for interviews in Cambodia
    4. Questions the teacher should ask
    5. Preparation tips
    6. What to bring to the interview
    7. Follow-up advice
    
    Structure the response in a clear, organized format.
  `;

  const response = await openai.chat.completions.create({
    model: AI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
  });

  return {
    preparationGuide: response.choices[0]?.message?.content,
    usage: response.usage,
  };
};

// Cost calculation helper
const calculateCost = (tokens: number): number => {
  // Approximate cost calculation (adjust based on actual OpenAI pricing)
  const costPer1kTokens = 0.03; // GPT-4 pricing (approximate)
  return (tokens / 1000) * costPer1kTokens;
};

// Export individual service functions for direct use
export {
  processJobMatching,
  processContentGeneration,
  processDocumentAnalysis,
  processTranslation,
  processChatbot,
  processResumeParsing,
  processInterviewPrep,
};

