export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string | null;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
}