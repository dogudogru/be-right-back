import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Send, Smile, Paperclip, Mic } from 'lucide-react-native';
import { useChatMessages } from '@/hooks/useChatMessages';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import ChatHeader from '@/components/ChatHeader';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { messages, contact, sendMessage, loading, isTyping } = useChatMessages(id as string);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const handleSend = () => {
    if (inputText.trim().length === 0) return;
    
    sendMessage(inputText);
    setInputText('');
  };
  
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  
  if (loading || !contact) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25D366" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <ChatHeader 
        title={contact.name}
        avatar={contact.avatar}
        onBack={() => router.back()}
      />
      
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble 
              message={item}
              contactName={contact.name}
            />
          )}
          contentContainerStyle={styles.messageList}
        />
        
        {isTyping && <TypingIndicator contactName={contact.name} />}
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        >
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachmentButton}>
              <Paperclip size={24} color="#8E8E93" />
            </TouchableOpacity>
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Message"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <TouchableOpacity style={styles.emojiButton}>
                <Smile size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSend}
            >
              {inputText.length > 0 ? (
                <Send size={24} color="#FFFFFF" />
              ) : (
                <Mic size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },
  messageList: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F6F6F6',
  },
  attachmentButton: {
    padding: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
});