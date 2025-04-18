import { StyleSheet, View, Text } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  contactName: string;
}

export default function MessageBubble({ message, contactName }: MessageBubbleProps) {
  const isFromMe = message.sender === 'user';
  
  return (
    <View style={[
      styles.container,
      isFromMe ? styles.rightContainer : styles.leftContainer
    ]}>
      {!isFromMe && (
        <Text style={styles.senderName}>{contactName}</Text>
      )}
      
      <View style={[
        styles.bubble,
        isFromMe ? styles.myBubble : styles.theirBubble
      ]}>
        <Text style={styles.messageText}>{message.content}</Text>
        
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>
            {formatTimestamp(message.timestamp)}
          </Text>
          
          {isFromMe && (
            <View style={styles.status}>
              {message.status === 'sent' ? (
                <Check size={14} color="#8E8E93" />
              ) : message.status === 'delivered' ? (
                <CheckCheck size={14} color="#8E8E93" />
              ) : (
                <CheckCheck size={14} color="#34B7F1" />
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  leftContainer: {
    alignSelf: 'flex-start',
  },
  rightContainer: {
    alignSelf: 'flex-end',
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#128C7E',
    marginLeft: 12,
    marginBottom: 2,
  },
  bubble: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  myBubble: {
    backgroundColor: '#E1FFC7',
    borderTopRightRadius: 2,
  },
  theirBubble: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 11,
    color: '#8E8E93',
    marginRight: 4,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});