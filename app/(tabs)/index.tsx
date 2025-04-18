import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConversations } from '@/hooks/useConversations';
import Header from '@/components/Header';

export default function ChatsScreen() {
  const { conversations, loading } = useConversations();
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Chats" />
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading conversations...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (conversations.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Chats" />
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No conversations yet</Text>
          <Text style={styles.emptySubtext}>
            Import a WhatsApp chat to get started
          </Text>
          <Link href="/(tabs)/import" asChild>
            <TouchableOpacity style={styles.importButton}>
              <Text style={styles.importButtonText}>Import Chat</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chats" />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/(tabs)/conversation?id=${item.id}`} asChild>
            <TouchableOpacity style={styles.chatItem}>
              <Image 
                source={{ uri: item.avatar || 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100' }} 
                style={styles.avatar} 
              />
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.time}>{item.lastMessageTime}</Text>
                </View>
                <Text 
                  style={styles.lastMessage} 
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  importButton: {
    backgroundColor: '#25D366',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  importButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 15,
    color: '#666666',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 72,
  },
});