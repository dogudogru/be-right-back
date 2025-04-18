import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { parseWhatsAppChat } from '@/utils/chatParser';
import { saveConversation } from '@/utils/storage';
import Header from '@/components/Header';
import ImportSteps from '@/components/ImportSteps';

export default function ImportScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [contactName, setContactName] = useState('');
  
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain'],
        copyToCacheDirectory: true,
      });
      
      if (result.canceled) {
        return;
      }
      
      setFileName(result.assets[0].name);
      setStep(2);
      setError(null);
    } catch (err) {
      setError('Error selecting file. Please try again.');
    }
  };
  
  const handleImport = async () => {
    if (!fileName || !contactName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // This is a placeholder - in a real app, this would read the file
      // For demo purposes, we'll just simulate parsing
      const chatData = await parseWhatsAppChat(fileName);
      
      // Generate a unique conversation ID and save the data
      const conversationId = Date.now().toString();
      await saveConversation({
        id: conversationId,
        name: contactName,
        messages: chatData.messages,
        lastMessage: chatData.messages[chatData.messages.length - 1].content,
        lastMessageTime: chatData.messages[chatData.messages.length - 1].timestamp,
        avatar: null, // User would configure this later
      });
      
      // Navigate to the conversation screen with the new conversation
      router.push(`/(tabs)/conversation?id=${conversationId}`);
    } catch (err) {
      setError('Error importing chat. Please check the file format and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Import Chat" />
      <ScrollView contentContainerStyle={styles.content}>
        <ImportSteps currentStep={step} />
        
        <View style={styles.section}>
          {step === 1 ? (
            <>
              <Text style={styles.sectionTitle}>Select WhatsApp Chat Export</Text>
              <Text style={styles.instruction}>
                1. Open WhatsApp and navigate to the conversation you want to import
              </Text>
              <Text style={styles.instruction}>
                2. Tap on the contact name at the top
              </Text>
              <Text style={styles.instruction}>
                3. Scroll down and tap "Export Chat"
              </Text>
              <Text style={styles.instruction}>
                4. Choose "Without Media"
              </Text>
              <Text style={styles.instruction}>
                5. Share the .txt file to this app
              </Text>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={handleFilePick}
              >
                <Text style={styles.buttonText}>Select .txt File</Text>
              </TouchableOpacity>
              
              {fileName && (
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>Selected: {fileName}</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text style={styles.instruction}>
                Enter the name of your conversation partner
              </Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contact Name</Text>
                <TextInput
                  style={styles.input}
                  value={contactName}
                  onChangeText={setContactName}
                  placeholder="Enter name"
                />
              </View>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => {
                    setStep(1);
                    setFileName(null);
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, !contactName.trim() && styles.disabledButton]}
                  onPress={handleImport}
                  disabled={!contactName.trim() || loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Import Chat</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  instruction: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#EFEFEF',
  },
  secondaryButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
  fileInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0F7F4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#25D366',
  },
  fileName: {
    fontSize: 14,
    color: '#444444',
  },
  inputContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF2F2',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
  },
});