import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MoveVertical as MoreVertical, Phone, Video } from 'lucide-react-native';

interface ChatHeaderProps {
  title: string;
  avatar?: string | null;
  onBack: () => void;
}

export default function ChatHeader({ title, avatar, onBack }: ChatHeaderProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.header, 
      { paddingTop: Platform.OS === 'ios' ? 0 : insets.top }
    ]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <ArrowLeft size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      <View style={styles.contactInfo}>
        <Image 
          source={{ 
            uri: avatar || 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100' 
          }} 
          style={styles.avatar} 
        />
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Video size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MoreVertical size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#128C7E',
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    maxWidth: 150,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});