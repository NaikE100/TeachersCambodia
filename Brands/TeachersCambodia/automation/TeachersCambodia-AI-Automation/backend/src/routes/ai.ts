import { Router, Request, Response } from 'express';
import { processAIRequest, AIRequestType } from '../services/ai';
import { authMiddleware, requireRole, UserRole } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { AIRequest, AIResponse } from '../types';

const router = Router();

// Apply authentication to all AI routes
router.use(authMiddleware);

// Job Matching AI Endpoint
router.post('/match', asyncHandler(async (req: Request, res: Response) => {
  const { teacherProfile, jobRequirements, options } = req.body;

  if (!teacherProfile || !jobRequirements) {
    return res.status(400).json({
      success: false,
      error: 'Teacher profile and job requirements are required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.JOB_MATCHING,
    data: { teacherProfile, jobRequirements },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Job matching completed successfully', {
      teacherId: teacherProfile.id,
      jobId: jobRequirements.id,
      matchScore: result.data?.matchScore,
    });
  }

  res.json(result);
}));

// Content Generation AI Endpoint
router.post('/generate-content', asyncHandler(async (req: Request, res: Response) => {
  const { type, details, context, options } = req.body;

  if (!type || !details) {
    return res.status(400).json({
      success: false,
      error: 'Content type and details are required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.CONTENT_GENERATION,
    data: { type, details, context },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Content generation completed successfully', {
      type,
      userId: req.user?.userId,
    });
  }

  res.json(result);
}));

// Document Analysis AI Endpoint
router.post('/analyze-document', asyncHandler(async (req: Request, res: Response) => {
  const { documentType, content, text, options } = req.body;

  if (!documentType || (!content && !text)) {
    return res.status(400).json({
      success: false,
      error: 'Document type and content are required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.DOCUMENT_ANALYSIS,
    data: { documentType, content, text },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Document analysis completed successfully', {
      documentType,
      userId: req.user?.userId,
    });
  }

  res.json(result);
}));

// Translation AI Endpoint
router.post('/translate', asyncHandler(async (req: Request, res: Response) => {
  const { text, fromLanguage, toLanguage, context, options } = req.body;

  if (!text || !fromLanguage || !toLanguage) {
    return res.status(400).json({
      success: false,
      error: 'Text, from language, and to language are required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.TRANSLATION,
    data: { text, fromLanguage, toLanguage, context },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Translation completed successfully', {
      fromLanguage,
      toLanguage,
      userId: req.user?.userId,
    });
  }

  res.json(result);
}));

// Chatbot AI Endpoint
router.post('/chatbot', asyncHandler(async (req: Request, res: Response) => {
  const { message, context, conversationHistory, options } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'Message is required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.CHATBOT,
    data: {
      message,
      context,
      userType: req.user?.role,
      conversationHistory,
    },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Chatbot response generated successfully', {
      userId: req.user?.userId,
      messageLength: message.length,
    });
  }

  res.json(result);
}));

// Resume Parsing AI Endpoint
router.post('/parse-resume', asyncHandler(async (req: Request, res: Response) => {
  const { resumeText, format, options } = req.body;

  if (!resumeText) {
    return res.status(400).json({
      success: false,
      error: 'Resume text is required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.RESUME_PARSING,
    data: { resumeText, format },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Resume parsing completed successfully', {
      userId: req.user?.userId,
      format,
    });
  }

  res.json(result);
}));

// Interview Preparation AI Endpoint
router.post('/interview-prep', asyncHandler(async (req: Request, res: Response) => {
  const { jobDetails, teacherProfile, interviewType, options } = req.body;

  if (!jobDetails || !teacherProfile) {
    return res.status(400).json({
      success: false,
      error: 'Job details and teacher profile are required',
    });
  }

  const aiRequest: AIRequest = {
    type: AIRequestType.INTERVIEW_PREP,
    data: { jobDetails, teacherProfile, interviewType },
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  if (result.success) {
    logger.info('Interview preparation completed successfully', {
      userId: req.user?.userId,
      interviewType,
    });
  }

  res.json(result);
}));

// Bulk Job Matching (for multiple jobs)
router.post('/bulk-match', asyncHandler(async (req: Request, res: Response) => {
  const { teacherProfile, jobRequirements, limit = 10, options } = req.body;

  if (!teacherProfile || !jobRequirements || !Array.isArray(jobRequirements)) {
    return res.status(400).json({
      success: false,
      error: 'Teacher profile and array of job requirements are required',
    });
  }

  const results = [];
  const maxJobs = Math.min(limit, jobRequirements.length);

  for (let i = 0; i < maxJobs; i++) {
    try {
      const aiRequest: AIRequest = {
        type: AIRequestType.JOB_MATCHING,
        data: { teacherProfile, jobRequirements: jobRequirements[i] },
        options,
      };

      const result: AIResponse = await processAIRequest(aiRequest);
      
      if (result.success) {
        results.push({
          jobId: jobRequirements[i].id,
          match: result.data,
        });
      }
    } catch (error) {
      logger.error('Error in bulk job matching:', error);
      results.push({
        jobId: jobRequirements[i].id,
        error: 'Failed to process',
      });
    }
  }

  // Sort by match score
  results.sort((a, b) => (b.match?.matchScore || 0) - (a.match?.matchScore || 0));

  logger.info('Bulk job matching completed', {
    teacherId: teacherProfile.id,
    totalJobs: jobRequirements.length,
    processedJobs: results.length,
  });

  res.json({
    success: true,
    data: results,
    metadata: {
      totalJobs: jobRequirements.length,
      processedJobs: results.length,
      timestamp: new Date().toISOString(),
    },
  });
}));

// AI Health Check Endpoint
router.get('/health', asyncHandler(async (req: Request, res: Response) => {
  try {
    // Test AI service with a simple request
    const aiRequest: AIRequest = {
      type: AIRequestType.CHATBOT,
      data: {
        message: 'Hello, this is a health check.',
        context: 'health_check',
        userType: 'system',
      },
    };

    const result: AIResponse = await processAIRequest(aiRequest);

    res.json({
      success: true,
      status: 'healthy',
      aiService: result.success ? 'operational' : 'error',
      timestamp: new Date().toISOString(),
      metadata: result.metadata,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      aiService: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}));

// AI Usage Statistics (Admin only)
router.get('/stats', requireRole(UserRole.ADMIN), asyncHandler(async (req: Request, res: Response) => {
  // This would typically fetch from a database or analytics service
  const stats = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    totalTokensUsed: 0,
    totalCost: 0,
    requestsByType: {},
    requestsByDate: {},
  };

  res.json({
    success: true,
    data: stats,
    timestamp: new Date().toISOString(),
  });
}));

// AI Model Configuration (Admin only)
router.get('/config', requireRole(UserRole.ADMIN), asyncHandler(async (req: Request, res: Response) => {
  const config = {
    model: process.env.OPENAI_MODEL || 'gpt-4',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
    timeout: 30000,
    features: {
      jobMatching: true,
      contentGeneration: true,
      documentAnalysis: true,
      translation: true,
      chatbot: true,
      resumeParsing: true,
      interviewPrep: true,
    },
  };

  res.json({
    success: true,
    data: config,
    timestamp: new Date().toISOString(),
  });
}));

// Generic AI Processing Endpoint
router.post('/process', asyncHandler(async (req: Request, res: Response) => {
  const { type, data, options } = req.body;

  if (!type || !data) {
    return res.status(400).json({
      success: false,
      error: 'Request type and data are required',
    });
  }

  // Validate request type
  const validTypes = Object.values(AIRequestType);
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      error: `Invalid request type. Valid types: ${validTypes.join(', ')}`,
    });
  }

  const aiRequest: AIRequest = {
    type,
    data,
    options,
  };

  const result: AIResponse = await processAIRequest(aiRequest);

  logger.info('Generic AI processing completed', {
    type,
    userId: req.user?.userId,
    success: result.success,
  });

  res.json(result);
}));

export default router;

