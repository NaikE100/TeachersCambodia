// User Types
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  preferences: UserPreferences;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  TEACHER = 'teacher',
  SCHOOL = 'school',
  ADMIN = 'admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location: Location;
  languages: string[];
  nationality?: string;
  dateOfBirth?: Date;
  gender?: string;
}

export interface UserPreferences {
  jobTypes: string[];
  locations: Location[];
  salaryRange: SalaryRange;
  workSchedule: string[];
  benefits: string[];
  remoteWork: boolean;
  relocation: boolean;
  notifications: NotificationPreferences;
}

export interface Location {
  country: string;
  city: string;
  region?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  jobAlerts: boolean;
  applicationUpdates: boolean;
  marketing: boolean;
}

// Teacher Specific Types
export interface TeacherProfile extends UserProfile {
  qualifications: Qualification[];
  experience: Experience[];
  skills: Skill[];
  certifications: Certification[];
  references: Reference[];
  portfolio?: Portfolio;
}

export interface Qualification {
  id: string;
  degree: string;
  field: string;
  institution: string;
  graduationYear: number;
  country: string;
  verified: boolean;
  documentUrl?: string;
}

export interface Experience {
  id: string;
  position: string;
  institution: string;
  location: Location;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: SkillLevel;
  yearsOfExperience: number;
  verified: boolean;
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date;
  documentUrl?: string;
  verified: boolean;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  institution: string;
  email: string;
  phone?: string;
  relationship: string;
  verified: boolean;
}

export interface Portfolio {
  projects: Project[];
  publications: Publication[];
  presentations: Presentation[];
  awards: Award[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  url?: string;
  images?: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: Date;
  url?: string;
  doi?: string;
}

export interface Presentation {
  id: string;
  title: string;
  conference: string;
  date: Date;
  location: Location;
  slidesUrl?: string;
  videoUrl?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: Date;
  description: string;
  certificateUrl?: string;
}

// School Specific Types
export interface SchoolProfile extends UserProfile {
  schoolInfo: SchoolInfo;
  hiringPreferences: HiringPreferences;
  benefits: Benefit[];
  culture: CultureInfo;
}

export interface SchoolInfo {
  name: string;
  type: SchoolType;
  level: EducationLevel[];
  size: SchoolSize;
  accreditation: string[];
  founded: number;
  website: string;
  description: string;
  mission: string;
  vision: string;
  photos: string[];
}

export enum SchoolType {
  INTERNATIONAL = 'international',
  PRIVATE = 'private',
  PUBLIC = 'public',
  CHARTER = 'charter',
  MONTESSORI = 'montessori',
  IB = 'ib',
  OTHER = 'other'
}

export enum EducationLevel {
  PRESCHOOL = 'preschool',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  HIGH_SCHOOL = 'high_school',
  UNIVERSITY = 'university',
  LANGUAGE_CENTER = 'language_center'
}

export enum SchoolSize {
  SMALL = 'small', // < 100 students
  MEDIUM = 'medium', // 100-500 students
  LARGE = 'large', // 500-1000 students
  VERY_LARGE = 'very_large' // > 1000 students
}

export interface HiringPreferences {
  experienceLevel: ExperienceLevel;
  educationLevel: string[];
  certifications: string[];
  languages: string[];
  visaSponsorship: boolean;
  relocationAssistance: boolean;
  contractTypes: ContractType[];
}

export enum ExperienceLevel {
  ENTRY = 'entry',
  MID = 'mid',
  SENIOR = 'senior',
  LEADERSHIP = 'leadership'
}

export enum ContractType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  INTERNSHIP = 'internship'
}

export interface Benefit {
  name: string;
  description: string;
  value?: number;
  currency?: string;
}

export interface CultureInfo {
  values: string[];
  workEnvironment: string;
  professionalDevelopment: string;
  workLifeBalance: string;
  diversity: string;
}

// Job Types
export interface Job {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  requirements: JobRequirement[];
  responsibilities: string[];
  benefits: string[];
  location: Location;
  salary: SalaryRange;
  contractType: ContractType;
  startDate: Date;
  applicationDeadline: Date;
  status: JobStatus;
  aiGeneratedContent?: AIGeneratedContent;
  applications: Application[];
  createdAt: Date;
  updatedAt: Date;
}

export enum JobStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed',
  FILLED = 'filled',
  EXPIRED = 'expired'
}

export interface JobRequirement {
  type: RequirementType;
  value: string;
  required: boolean;
  priority: number;
}

export enum RequirementType {
  EDUCATION = 'education',
  EXPERIENCE = 'experience',
  CERTIFICATION = 'certification',
  LANGUAGE = 'language',
  SKILL = 'skill',
  OTHER = 'other'
}

export interface AIGeneratedContent {
  description: string;
  requirements: string[];
  benefits: string[];
  keywords: string[];
  seoOptimized: boolean;
}

// Application Types
export interface Application {
  id: string;
  teacherId: string;
  jobId: string;
  status: ApplicationStatus;
  coverLetter: string;
  resume: string;
  documents: string[];
  aiMatchScore: number;
  aiInsights: AIInsights;
  timeline: ApplicationTimeline[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  REVIEWING = 'reviewing',
  SHORTLISTED = 'shortlisted',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEWED = 'interviewed',
  OFFERED = 'offered',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn'
}

export interface AIInsights {
  matchScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  culturalFit: number;
  skillGaps: string[];
  interviewTips: string[];
}

export interface ApplicationTimeline {
  status: ApplicationStatus;
  timestamp: Date;
  notes?: string;
  updatedBy: string;
}

// AI Service Types
export interface AIRequest {
  type: AIRequestType;
  data: any;
  options?: AIOptions;
}

export enum AIRequestType {
  JOB_MATCHING = 'job_matching',
  CONTENT_GENERATION = 'content_generation',
  DOCUMENT_ANALYSIS = 'document_analysis',
  TRANSLATION = 'translation',
  CHATBOT = 'chatbot',
  RESUME_PARSING = 'resume_parsing',
  INTERVIEW_PREP = 'interview_prep'
}

export interface AIOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  language?: string;
  context?: string;
}

export interface AIResponse {
  success: boolean;
  data: any;
  metadata: AIMetadata;
  error?: string;
}

export interface AIMetadata {
  model: string;
  tokens: number;
  duration: number;
  cost: number;
  timestamp: Date;
}

// Analytics Types
export interface Analytics {
  id: string;
  eventType: AnalyticsEventType;
  userId?: string;
  data: any;
  timestamp: Date;
  sessionId?: string;
  userAgent?: string;
  ipAddress?: string;
}

export enum AnalyticsEventType {
  USER_REGISTRATION = 'user_registration',
  USER_LOGIN = 'user_login',
  JOB_VIEW = 'job_view',
  JOB_APPLICATION = 'job_application',
  AI_INTERACTION = 'ai_interaction',
  SEARCH_PERFORMED = 'search_performed',
  PROFILE_UPDATE = 'profile_update',
  DOCUMENT_UPLOAD = 'document_upload',
  CHATBOT_MESSAGE = 'chatbot_message'
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  metadata?: {
    timestamp: Date;
    version: string;
    requestId: string;
  };
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error Types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

// Authentication Types
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// File Upload Types
export interface FileUpload {
  id: string;
  userId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  bucket: string;
  key: string;
  uploadedAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  sentAt: Date;
  readAt?: Date;
}

export enum NotificationType {
  JOB_ALERT = 'job_alert',
  APPLICATION_UPDATE = 'application_update',
  MESSAGE = 'message',
  SYSTEM = 'system',
  MARKETING = 'marketing'
}

// Search and Filter Types
export interface SearchFilters {
  keywords?: string;
  location?: Location;
  salaryRange?: SalaryRange;
  jobTypes?: string[];
  experienceLevel?: ExperienceLevel;
  educationLevel?: string[];
  languages?: string[];
  contractType?: ContractType[];
  remoteWork?: boolean;
  visaSponsorship?: boolean;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  filters: SearchFilters;
  suggestions: string[];
  aiRecommendations?: any;
}

