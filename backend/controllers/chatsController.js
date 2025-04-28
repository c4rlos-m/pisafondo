const supabase = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Obtener todos los chats del usuario
const getChats = async (req, res) => {
  const { id: user_id } = req.user;

  try {
    const { data: memberships, error: membershipError } = await supabase
      .from('chat_members')
      .select('chat_id')
      .eq('user_id', user_id);

    if (membershipError) {
      console.error('Error fetching memberships:', membershipError);
      return res.status(500).json({ error: 'Error fetching chats' });
    }

    const chatIds = memberships.map((m) => m.chat_id);

    if (chatIds.length === 0) {
      return res.status(200).json([]);
    }

    const { data: chats, error: chatsError } = await supabase
      .from('chats')
      .select('id, name, created_by, created_at, invite_code')
      .in('id', chatIds)
      .order('created_at', { ascending: false });

    if (chatsError) {
      console.error('Error fetching chats:', chatsError);
      return res.status(500).json({ error: 'Error fetching chats' });
    }

    res.status(200).json(chats);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Crear un nuevo chat
const createChat = async (req, res) => {
  const { name } = req.body;
  const { id: user_id } = req.user;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const inviteCode = uuidv4().slice(0, 8);
    const chatData = {
      name,
      created_by: user_id,
      created_at: new Date().toISOString(),
      invite_code: inviteCode,
    };

    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .insert([chatData])
      .select()
      .single();

    if (chatError) {
      console.error('Error creating chat:', chatError);
      return res.status(500).json({ error: 'Error creating chat' });
    }

    const { error: memberError } = await supabase
      .from('chat_members')
      .insert([{ chat_id: chat.id, user_id, joined_at: new Date().toISOString() }]);

    if (memberError) {
      console.error('Error adding creator to chat:', memberError);
      return res.status(500).json({ error: 'Error adding creator to chat' });
    }

    res.status(201).json(chat);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Obtener un chat específico
const getChatById = async (req, res) => {
  const { id } = req.params;
  const { id: user_id } = req.user;

  try {
    const { data: membership, error: membershipError } = await supabase
      .from('chat_members')
      .select('chat_id')
      .eq('chat_id', id)
      .eq('user_id', user_id)
      .single();

    if (membershipError || !membership) {
      return res.status(403).json({ error: 'You are not a member of this chat' });
    }

    const { data, error } = await supabase
      .from('chats')
      .select('id, name, created_by, created_at, invite_code')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Unirse a un chat mediante código de invitación
const joinChat = async (req, res) => {
  const { invite_code } = req.body;
  const { id: user_id } = req.user;

  if (!invite_code) {
    return res.status(400).json({ error: 'Invite code is required' });
  }

  try {
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('id')
      .eq('invite_code', invite_code)
      .single();

    if (chatError || !chat) {
      return res.status(404).json({ error: 'Invalid invite code' });
    }

    const { data: existingMembership, error: membershipError } = await supabase
      .from('chat_members')
      .select('chat_id')
      .eq('chat_id', chat.id)
      .eq('user_id', user_id)
      .single();

    if (existingMembership) {
      return res.status(400).json({ error: 'You are already a member of this chat' });
    }

    const { error: insertError } = await supabase
      .from('chat_members')
      .insert([{ chat_id: chat.id, user_id, joined_at: new Date().toISOString() }]);

    if (insertError) {
      return res.status(500).json({ error: 'Error joining chat' });
    }

    res.status(200).json({ chat_id: chat.id });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getChats, createChat, getChatById, joinChat };