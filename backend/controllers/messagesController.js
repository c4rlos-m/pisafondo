const supabase = require('../config/database');

// Fetch messages for a specific chat
const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  const { id: user_id } = req.user;

  if (!chatId) {
    return res.status(400).json({ error: 'Chat ID is required' });
  }

  try {
    const { data: membership, error: membershipError } = await supabase
      .from('chat_members')
      .select('chat_id')
      .eq('chat_id', chatId)
      .eq('user_id', user_id)
      .single();

    if (membershipError || !membership) {
      return res.status(403).json({ error: 'You are not a member of this chat' });
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      return res.status(500).json({ error: 'Error fetching messages' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Post a new message to a specific chat
const postMessage = async (req, res) => {
  const { content } = req.body;
  const { id: user_id, username } = req.user;
  const chatId = req.params.chatId;

  if (!content || !chatId || !username) {
    return res.status(400).json({ error: 'Content, chat ID, and username are required' });
  }

  try {
    const { data: chatData, error: chatError } = await supabase
      .from('chats')
      .select('id')
      .eq('id', chatId)
      .single();

    if (chatError) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const { data: membership, error: membershipError } = await supabase
      .from('chat_members')
      .select('chat_id')
      .eq('chat_id', chatId)
      .eq('user_id', user_id)
      .single();

    if (membershipError || !membership) {
      return res.status(403).json({ error: 'You are not a member of this chat' });
    }

    const messageData = {
      content,
      user_id,
      username,
      chat_id: chatId,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select();

    if (error) {
      console.error('Error posting message:', error);
      return res.status(500).json({ error: 'Error posting message' });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getMessages, postMessage };