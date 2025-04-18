import { useState, useEffect } from 'react';
import { getConversations } from '@/utils/storage';
import { Conversation } from '@/types/chat';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadConversations() {
      try {
        setLoading(true);
        const loadedConversations = await getConversations();
        setConversations(loadedConversations);
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadConversations();
  }, []);
  
  return { conversations, loading, error };
}