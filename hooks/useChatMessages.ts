import { useState, useEffect } from 'react';
import { getConversation, updateConversation } from '@/utils/storage';
import { simulateAIResponse } from '@/utils/ai';
import { Message, Conversation } from '@/types/chat';

export function useChatMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contact, setContact] = useState<{ name: string; avatar: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    async function loadMessages() {
      if (!conversationId) return;
      
      try {
        setLoading(true);
        const conversation = await getConversation(conversationId);
        
        if (conversation) {
          setMessages(conversation.messages);
          setContact({
            name: conversation.name,
            avatar: conversation.avatar,
          });
        }
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadMessages();
  }, [conversationId]);
  
  const sendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return;
    
    try {
      // Add the user's message
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
        status: 'sent',
      };
      
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      // Simulate typing indicator for AI response
      setIsTyping(true);
      
      // Simulate AI response with delay
      setTimeout(async () => {
        try {
          const aiResponse = await simulateAIResponse(content, updatedMessages);
          
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: 'ai',
            timestamp: new Date().toISOString(),
            status: 'read',
          };
          
          const withAiResponse = [...updatedMessages, aiMessage];
          setMessages(withAiResponse);
          
          // Update user message status to 'read' after AI responds
          const updatedUserMessage = {
            ...userMessage,
            status: 'read',
          };
          
          const finalMessages = withAiResponse.map(msg => 
            msg.id === userMessage.id ? updatedUserMessage : msg
          );
          
          setMessages(finalMessages);
          
          // Update conversation in storage
          if (contact) {
            await updateConversation({
              id: conversationId,
              name: contact.name,
              messages: finalMessages,
              lastMessage: aiMessage.content,
              lastMessageTime: aiMessage.timestamp,
              avatar: contact.avatar,
            });
          }
        } catch (err) {
          console.error('Error simulating AI response:', err);
        } finally {
          setIsTyping(false);
        }
      }, 1500);
      
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
  
  return { messages, contact, sendMessage, loading, error, isTyping };
}