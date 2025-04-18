import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { Configuration, OpenAIApi } from 'npm:openai@4.24.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  content: string;
  sender: string;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: Deno.env.get('OPENAI_API_KEY'),
      })
    );

    const { conversationId, message } = await req.json();

    // Get conversation history
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('content, sender, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(10);

    if (messagesError) {
      throw new Error('Error fetching messages');
    }

    // Prepare conversation history for OpenAI
    const conversationHistory = messages.map((msg: Message) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    // Add the new message
    conversationHistory.push({
      role: 'user',
      content: message,
    });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are simulating a WhatsApp chat conversation. Analyze the conversation history and respond in a way that matches the style and tone of the previous responses. Keep responses concise and natural, as if in a real chat. Include appropriate emojis if they were used in the conversation.`,
        },
        ...conversationHistory,
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content;

    // Save AI response to database
    const { error: insertError } = await supabase.from('messages').insert([
      {
        conversation_id: conversationId,
        content: aiResponse,
        sender: 'ai',
        is_ai_generated: true,
        status: 'sent',
      },
    ]);

    if (insertError) {
      throw new Error('Error saving AI response');
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});