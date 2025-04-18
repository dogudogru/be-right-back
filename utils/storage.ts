import AsyncStorage from '@react-native-async-storage/async-storage';
import { Conversation } from '@/types/chat';

const CONVERSATIONS_KEY = 'whatsapp_ai_conversations';

export async function getConversations(): Promise<Conversation[]> {
  try {
    const data = await AsyncStorage.getItem(CONVERSATIONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error getting conversations:', error);
    return [];
  }
}

export async function getConversation(id: string): Promise<Conversation | null> {
  try {
    const conversations = await getConversations();
    return conversations.find(conv => conv.id === id) || null;
  } catch (error) {
    console.error('Error getting conversation:', error);
    return null;
  }
}

export async function saveConversation(conversation: Conversation): Promise<void> {
  try {
    const conversations = await getConversations();
    conversations.push(conversation);
    await AsyncStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}

export async function updateConversation(updatedConversation: Conversation): Promise<void> {
  try {
    const conversations = await getConversations();
    const index = conversations.findIndex(conv => conv.id === updatedConversation.id);
    
    if (index !== -1) {
      conversations[index] = updatedConversation;
      await AsyncStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    }
  } catch (error) {
    console.error('Error updating conversation:', error);
  }
}

export async function deleteConversation(id: string): Promise<void> {
  try {
    const conversations = await getConversations();
    const filteredConversations = conversations.filter(conv => conv.id !== id);
    await AsyncStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(filteredConversations));
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
}