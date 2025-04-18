import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showActionButton?: boolean;
  onActionPress?: () => void;
}

export default function Header({ title, showActionButton = false, onActionPress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.header, 
      { paddingTop: Platform.OS === 'ios' ? 0 : insets.top }
    ]}>
      <Text style={styles.title}>{title}</Text>
      
      {showActionButton && (
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onActionPress}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#128C7E',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});