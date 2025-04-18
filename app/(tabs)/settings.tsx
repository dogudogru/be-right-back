import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Header from '@/components/Header';
import { ChevronRight, Moon, Sun, Palette, MessageSquare, Zap, Database, Key } from 'lucide-react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [typingSimulation, setTypingSimulation] = useState(true);
  const [messageStatus, setMessageStatus] = useState(true);
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              {darkMode ? (
                <Moon size={22} color="#34B7F1" />
              ) : (
                <Sun size={22} color="#F7B955" />
              )}
            </View>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E5E5', true: '#34B7F1' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Palette size={22} color="#9C8FFF" />
            </View>
            <Text style={styles.settingLabel}>Chat Wallpaper</Text>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <MessageSquare size={22} color="#25D366" />
            </View>
            <Text style={styles.settingLabel}>Typing Simulation</Text>
            <Switch
              value={typingSimulation}
              onValueChange={setTypingSimulation}
              trackColor={{ false: '#E5E5E5', true: '#25D366' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Zap size={22} color="#34B7F1" />
            </View>
            <Text style={styles.settingLabel}>Message Status</Text>
            <Switch
              value={messageStatus}
              onValueChange={setMessageStatus}
              trackColor={{ false: '#E5E5E5', true: '#34B7F1' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Model</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Database size={22} color="#FF9500" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Model Selection</Text>
              <Text style={styles.settingValue}>GPT-4</Text>
            </View>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Key size={22} color="#FF2D55" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>API Key</Text>
              <Text style={styles.settingValue}>Configured</Text>
            </View>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  settingContent: {
    flex: 1,
  },
  settingValue: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  versionInfo: {
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});