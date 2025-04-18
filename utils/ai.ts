import { Message } from '@/types/chat';

export async function simulateAIResponse(
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> {
  // In a real implementation, this would make API calls to LLM services like OpenAI, Anthropic, etc.
  // For demo purposes, we'll use simple predefined responses
  
  // Get last 5 messages for context
  const recentMessages = conversationHistory.slice(-5);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Simple response logic based on message content
  const lowercaseMessage = userMessage.toLowerCase();
  
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return "Hi there! How can I help you today?";
  }
  
  if (lowercaseMessage.includes('how are you')) {
    return "I'm doing well, thanks for asking! How about you?";
  }
  
  if (lowercaseMessage.includes('weather')) {
    return "I don't have access to real-time weather data, but I hope it's nice where you are!";
  }
  
  if (lowercaseMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help with?";
  }
  
  if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
    return "Goodbye! Have a great day!";
  }
  
  if (lowercaseMessage.includes('help')) {
    return "I'm here to help! What do you need assistance with?";
  }
  
  if (lowercaseMessage.includes('name')) {
    return "I'm an AI assistant designed to simulate conversation patterns. What's your name?";
  }
  
  if (lowercaseMessage.includes('project') || lowercaseMessage.includes('app')) {
    return "Your project sounds interesting! I'd love to hear more about the technical details and challenges you're facing.";
  }
  
  if (lowercaseMessage.endsWith('?')) {
    return "That's a good question. Let me think about it... I think it depends on the specific context, but I'd be happy to discuss it further.";
  }
  
  // Default responses for when no pattern is matched
  const defaultResponses = [
    "That's interesting! Tell me more about it.",
    "I understand. What are your thoughts on this?",
    "I see what you mean. How do you feel about that?",
    "That makes sense. What would you like to talk about next?",
    "I appreciate you sharing that with me. What else is on your mind?",
    "That's a good point. I hadn't thought about it that way before.",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}