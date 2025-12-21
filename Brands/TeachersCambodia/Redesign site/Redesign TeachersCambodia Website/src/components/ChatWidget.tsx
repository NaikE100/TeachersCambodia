import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const AUTO_RESPONSES: Record<string, string> = {
  'hello': 'Hello! 👋 Welcome to TeachersCambodia. How can I help you today?',
  'hi': 'Hi there! 👋 I\'m here to help you with any questions about teaching opportunities in Cambodia.',
  'requirements': 'To teach in Cambodia, you typically need a Bachelor\'s degree, TEFL/TESOL certificate, and a valid passport. Some schools may require teaching experience. Would you like more details?',
  'salary': 'Teacher salaries in Cambodia vary by school and experience, typically ranging from $800-$2000 per month. International schools offer higher packages. Can I help you find specific opportunities?',
  'visa': 'Most schools in Cambodia assist with visa sponsorship. You\'ll typically get a business visa initially, then transition to a work permit. Need help with the application process?',
  'location': 'We place teachers in Phnom Penh, Siem Reap, and other major cities across Cambodia. Each location offers unique experiences. What interests you most?',
  'apply': 'You can apply directly through our website! Visit the "Apply" section to upload your resume and complete the application form. I can guide you through it!',
  'help': 'I can help you with:\n• Application process\n• Requirements and qualifications\n• Visa information\n• Salary and benefits\n• School locations\n• Job opportunities\n\nWhat would you like to know?',
  'contact': 'You can reach us via:\n• Email: info@teacherscambodia.com\n• Phone: (available in the Contact section)\n• This chat widget\n\nIs there something specific I can help with?',
};

const GREETING_MESSAGES = [
  "Hi! 👋 I'm here to help you learn about teaching opportunities in Cambodia. What would you like to know?",
  "Hello! Welcome to TeachersCambodia. Ask me anything about teaching in Cambodia!",
];

function findAutoResponse(userMessage: string): string | null {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Check for exact matches first
  if (AUTO_RESPONSES[lowerMessage]) {
    return AUTO_RESPONSES[lowerMessage];
  }
  
  // Check for keywords
  for (const [key, response] of Object.entries(AUTO_RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for common question patterns
  if (lowerMessage.includes('how much') || lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
    return AUTO_RESPONSES['salary'];
  }
  if (lowerMessage.includes('need') || lowerMessage.includes('require') || lowerMessage.includes('qualification')) {
    return AUTO_RESPONSES['requirements'];
  }
  if (lowerMessage.includes('visa') || lowerMessage.includes('permit') || lowerMessage.includes('document')) {
    return AUTO_RESPONSES['visa'];
  }
  if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('city')) {
    return AUTO_RESPONSES['location'];
  }
  if (lowerMessage.includes('apply') || lowerMessage.includes('application') || lowerMessage.includes('resume')) {
    return AUTO_RESPONSES['apply'];
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return AUTO_RESPONSES['contact'];
  }
  
  // Default response if no match found
  return "Thank you for your message! A member of our team will get back to you soon. In the meantime, feel free to ask about:\n• Application requirements\n• Teaching locations\n• Salary and benefits\n• Visa information";
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('teacherscambodia_chat_messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch (error) {
        console.error('Error loading chat messages:', error);
      }
    } else {
      // Show greeting message when chat is first opened
      const greetingMessage: Message = {
        id: `greeting-${Date.now()}`,
        text: GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)],
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('teacherscambodia_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay, then send auto-response
    setTimeout(() => {
      const autoResponse = findAutoResponse(userMessage.text);
      const supportMessage: Message = {
        id: `support-${Date.now()}`,
        text: autoResponse || AUTO_RESPONSES['help'] || 'Thank you for your message!',
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else if (isOpen && !isMinimized) {
      setIsMinimized(true);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <Button
              onClick={handleToggle}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: isMinimized ? 0 : 1, 
              y: isMinimized ? 300 : 0, 
              scale: isMinimized ? 0.8 : 1 
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 ${
              isMinimized ? 'pointer-events-none' : ''
            }`}
          >
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col h-[500px] sm:h-[600px] max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">TeachersCambodia Support</h3>
                    <p className="text-xs text-blue-100">We're here to help!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-2">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat Button */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <Button
              onClick={handleToggle}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700 text-white relative"
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {messages.length}
                </span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

