# GoDaddy Integration Guide for TeachersCambodia AI Platform

## Overview
This guide explains how to integrate the AI automation platform with your GoDaddy-hosted website at www.teacherscambodia.com. Since you don't have WordPress access, we'll use JavaScript-based integration methods.

## 🚀 Integration Options

### Option 1: JavaScript Widget Integration (Recommended)
Add AI-powered features directly to your existing GoDaddy website using JavaScript widgets.

### Option 2: API Integration
Connect your website to the AI platform via REST API calls.

### Option 3: Redirect Integration
Redirect users to the AI platform for enhanced features while maintaining your main website.

## 📋 Prerequisites

1. **AI Platform Deployment**: The AI platform must be deployed and accessible
2. **API Keys**: You'll need API keys for authentication
3. **GoDaddy Website Access**: Ability to edit HTML/CSS/JavaScript files
4. **Domain Configuration**: CORS settings configured for your domain

## 🔧 Option 1: JavaScript Widget Integration

### Step 1: Add the AI Widget Script
Add this script to your GoDaddy website's `<head>` section:

```html
<!-- AI Platform Integration Script -->
<script>
// AI Platform Configuration
window.TeachersCambodiaAI = {
  apiUrl: 'https://your-ai-platform.vercel.app/api',
  apiKey: 'your-api-key-here',
  features: {
    jobMatching: true,
    chatbot: true,
    contentGeneration: true,
    documentAnalysis: true
  }
};

// Load AI Widget
(function() {
  const script = document.createElement('script');
  script.src = 'https://your-ai-platform.vercel.app/widget.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>
```

### Step 2: Add AI Chatbot Widget
Add this HTML where you want the chatbot to appear:

```html
<!-- AI Chatbot Widget -->
<div id="ai-chatbot-widget" class="ai-widget">
  <div class="chat-header">
    <span>🤖 AI Assistant</span>
    <button onclick="toggleChat()">×</button>
  </div>
  <div class="chat-messages" id="chat-messages"></div>
  <div class="chat-input">
    <input type="text" id="chat-input" placeholder="Ask me about teaching in Cambodia...">
    <button onclick="sendMessage()">Send</button>
  </div>
</div>
```

### Step 3: Add AI Job Matching Widget
Add this to your job listings page:

```html
<!-- AI Job Matching Widget -->
<div id="ai-job-matcher" class="ai-widget">
  <h3>🎯 AI-Powered Job Matching</h3>
  <div class="matching-form">
    <input type="text" id="teacher-skills" placeholder="Your skills (e.g., English, Math, 5 years experience)">
    <input type="text" id="teacher-location" placeholder="Preferred location">
    <button onclick="findMatchingJobs()">Find Matching Jobs</button>
  </div>
  <div id="matching-results"></div>
</div>
```

### Step 4: Add CSS Styling
Add this CSS to your website:

```css
/* AI Widget Styles */
.ai-widget {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
  font-family: Arial, sans-serif;
}

#ai-chatbot-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  display: none;
}

.chat-header {
  background: #007bff;
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-messages {
  height: 350px;
  overflow-y: auto;
  padding: 10px;
}

.chat-input {
  padding: 10px;
  border-top: 1px solid #ddd;
  display: flex;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}

.chat-input button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#ai-job-matcher {
  padding: 20px;
  background: #f8f9fa;
}

.matching-form {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.matching-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.matching-form button {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

## 🔧 Option 2: API Integration

### Step 1: Create API Helper Functions
Add this JavaScript to your website:

```javascript
// API Helper Functions
const AI_API = {
  baseUrl: 'https://your-ai-platform.vercel.app/api',
  apiKey: 'your-api-key-here',

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Job Matching
  async matchJobs(teacherProfile) {
    return this.request('/ai/match', {
      method: 'POST',
      body: JSON.stringify({ teacherProfile })
    });
  },

  // Content Generation
  async generateContent(type, details) {
    return this.request('/ai/generate-content', {
      method: 'POST',
      body: JSON.stringify({ type, details })
    });
  },

  // Chatbot
  async chat(message, context = '') {
    return this.request('/ai/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    });
  },

  // Document Analysis
  async analyzeDocument(documentType, content) {
    return this.request('/ai/analyze-document', {
      method: 'POST',
      body: JSON.stringify({ documentType, content })
    });
  }
};
```

### Step 2: Implement Job Matching Feature
Add this to your job search page:

```javascript
// Job Matching Implementation
async function findMatchingJobs() {
  const skills = document.getElementById('teacher-skills').value;
  const location = document.getElementById('teacher-location').value;
  const resultsDiv = document.getElementById('matching-results');

  if (!skills) {
    alert('Please enter your skills');
    return;
  }

  try {
    resultsDiv.innerHTML = '<p>🔍 Finding matching jobs...</p>';
    
    const teacherProfile = {
      skills: skills.split(',').map(s => s.trim()),
      location: location,
      experience: '5 years', // You can make this dynamic
      languages: ['English'] // You can make this dynamic
    };

    const response = await AI_API.matchJobs(teacherProfile);
    
    if (response.success && response.data) {
      displayMatchingResults(response.data);
    } else {
      resultsDiv.innerHTML = '<p>❌ No matching jobs found</p>';
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p>❌ Error: ${error.message}</p>`;
  }
}

function displayMatchingResults(matchData) {
  const resultsDiv = document.getElementById('matching-results');
  
  const html = `
    <div class="match-results">
      <h4>Match Score: ${matchData.matchScore}%</h4>
      <div class="strengths">
        <h5>Your Strengths:</h5>
        <ul>
          ${matchData.strengths.map(s => `<li>✅ ${s}</li>`).join('')}
        </ul>
      </div>
      <div class="recommendations">
        <h5>Recommendations:</h5>
        <ul>
          ${matchData.recommendations.map(r => `<li>💡 ${r}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  
  resultsDiv.innerHTML = html;
}
```

### Step 3: Implement Chatbot Feature
Add this to your website:

```javascript
// Chatbot Implementation
let conversationHistory = [];

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const messagesDiv = document.getElementById('chat-messages');
  const message = input.value.trim();

  if (!message) return;

  // Add user message
  addMessage('user', message);
  input.value = '';

  try {
    const response = await AI_API.chat(message, 'website_chat');
    
    if (response.success && response.data) {
      addMessage('bot', response.data.response);
    } else {
      addMessage('bot', 'Sorry, I encountered an error. Please try again.');
    }
  } catch (error) {
    addMessage('bot', 'Sorry, I\'m having trouble connecting. Please try again later.');
  }
}

function addMessage(sender, text) {
  const messagesDiv = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'AI Assistant'}:</strong> ${text}`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function toggleChat() {
  const widget = document.getElementById('ai-chatbot-widget');
  widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
}
```

## 🔧 Option 3: Redirect Integration

### Step 1: Add AI Platform Links
Add these buttons/links to your GoDaddy website:

```html
<!-- AI Platform Integration Links -->
<div class="ai-integration-links">
  <a href="https://your-ai-platform.vercel.app/job-matching" 
     class="ai-button" target="_blank">
    🤖 AI Job Matching
  </a>
  
  <a href="https://your-ai-platform.vercel.app/ai-assistant" 
     class="ai-button" target="_blank">
    💬 AI Assistant
  </a>
  
  <a href="https://your-ai-platform.vercel.app/resume-analyzer" 
     class="ai-button" target="_blank">
    📄 AI Resume Analyzer
  </a>
</div>
```

### Step 2: Add Styling for AI Buttons
```css
.ai-integration-links {
  text-align: center;
  margin: 30px 0;
}

.ai-button {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: transform 0.2s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.ai-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
```

## 🔒 Security Configuration

### Step 1: Configure CORS
The AI platform is already configured to allow requests from your domain. Make sure these origins are allowed:

```javascript
// In the AI platform configuration
const allowedOrigins = [
  'https://www.teacherscambodia.com',
  'https://teacherscambodia.com',
  'http://localhost:3000' // for testing
];
```

### Step 2: API Key Security
Store your API key securely and never expose it in client-side code for production. Consider using:

1. **Environment Variables**: Store API keys server-side
2. **Proxy Endpoints**: Create proxy endpoints on your GoDaddy server
3. **Token-based Authentication**: Use short-lived tokens

## 📊 Analytics and Tracking

### Step 1: Add Analytics Tracking
```javascript
// Track AI feature usage
function trackAIUsage(feature, action) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'ai_feature_used', {
      'feature_name': feature,
      'action': action,
      'page_location': window.location.href
    });
  }
}

// Usage examples
trackAIUsage('job_matching', 'search_initiated');
trackAIUsage('chatbot', 'message_sent');
trackAIUsage('content_generation', 'job_posting_created');
```

## 🚀 Deployment Checklist

### Before Going Live:
- [ ] Deploy AI platform to production
- [ ] Configure environment variables
- [ ] Set up SSL certificates
- [ ] Test all integration methods
- [ ] Configure monitoring and logging
- [ ] Set up error tracking
- [ ] Test with real user data
- [ ] Configure backup systems

### Post-Deployment:
- [ ] Monitor API usage and performance
- [ ] Track user engagement with AI features
- [ ] Gather feedback and iterate
- [ ] Optimize based on usage patterns
- [ ] Scale infrastructure as needed

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your domain is in the allowed origins list
2. **API Key Issues**: Verify API key is correct and has proper permissions
3. **Widget Not Loading**: Check if the widget script URL is accessible
4. **Slow Responses**: Monitor AI service performance and optimize

### Debug Mode:
Add this to enable debug logging:

```javascript
window.TeachersCambodiaAI.debug = true;
```

## 📞 Support

For integration support:
- Email: support@teacherscambodia.com
- Documentation: https://docs.teacherscambodia.com
- GitHub Issues: [Create Issue](https://github.com/your-org/teachers-cambodia-ai/issues)

## 🔄 Updates and Maintenance

The AI platform will receive regular updates. To stay current:

1. **Subscribe to Updates**: Get notified of new features
2. **Test Updates**: Test new features in staging environment
3. **Backup Configuration**: Keep backups of your integration code
4. **Monitor Performance**: Track how updates affect your website

---

**Note**: This integration guide is specifically designed for GoDaddy-hosted websites without WordPress access. The AI platform runs independently and enhances your existing website with AI-powered features.

