export async function parseWhatsAppChat(fileName: string) {
  // In a real implementation, this would read the file and parse actual data
  // For demo purposes, we'll return simulated data
  
  // Simulate parsing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return simulated chat data
  return {
    messages: [
      {
        id: '1',
        sender: 'ai',
        content: 'Hey, how are you doing today?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'read',
      },
      {
        id: '2',
        sender: 'user',
        content: 'I\'m good! Working on a new project. How about you?',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        status: 'read',
      },
      {
        id: '3',
        sender: 'ai',
        content: 'That sounds exciting! What kind of project are you working on?',
        timestamp: new Date(Date.now() - 3400000).toISOString(),
        status: 'read',
      },
      {
        id: '4',
        sender: 'user',
        content: 'I\'m building an app that can simulate conversations using AI. It\'s challenging but fun!',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        status: 'read',
      },
      {
        id: '5',
        sender: 'ai',
        content: 'That\'s really innovative! Are you using a specific AI model for this?',
        timestamp: new Date(Date.now() - 2800000).toISOString(),
        status: 'read',
      },
    ]
  };
}