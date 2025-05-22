import { useState, useEffect, useRef, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-toastify';

const generateUserColor = (userId) => {
  const colors = [
    '#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
  ];
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const Chat = ({ token, user }) => {
  const [supabase] = useState(() =>
    createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      }
    )
  );

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
  const [newChatName, setNewChatName] = useState('');

  const messagesEndRef = useRef(null);
  const channelRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Log JWT and user details
  useEffect(() => {
    console.log('JWT token:', token);
    console.log('User:', user);
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
  }, [token, user]);

  // Test Realtime with a simple public table subscription
  useEffect(() => {
    const testChannel = supabase
      .channel('test-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('Test Realtime payload:', payload);
        }
      )
      .subscribe((status, error) => {
        console.log('Test Realtime subscription status:', status);
        if (error) {
          console.error('Test Realtime subscription error:', error);
        }
      });

    return () => {
      supabase.removeChannel(testChannel);
    };
  }, []);

  const fetchChats = async () => {
    try {
      setIsLoadingChats(true);
      const response = await fetch(`https://pisafondo-production.up.railway.app/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching chats');
      }
      const data = await response.json();
      console.log('Fetched chats:', data);
      setChats(data);
      if (data.length > 0 && !selectedChat) {
        setSelectedChat(data[0].id);
        console.log('Selected chat:', data[0].id);
      }
    } catch (err) {
      console.error('Fetch chats error:', err);
      setError('No se pudieron cargar los chats');
    } finally {
      setIsLoadingChats(false);
    }
  };

  const fetchMessages = async (chatId) => {
    if (!chatId) return;
    try {
      setIsLoading(true);
      const response = await fetch(`https://pisafondo-production.up.railway.app/chats/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching messages');
      }
      const data = await response.json();
      setMessages(data);
      setError('');
    } catch (err) {
      console.error('Fetch messages error:', err);
      setError('No se pudieron cargar los mensajes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchChats();
  }, [token]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
      setupRealtimeSubscription(selectedChat);
    }
  }, [selectedChat]);

  const setupRealtimeSubscription = (chatId) => {
    if (!chatId) {
      console.log('No chatId provided, skipping subscription');
      return;
    }

    if (channelRef.current) {
      console.log('Removing existing channel:', channelRef.current);
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    console.log('Setting up subscription for chatId:', chatId);

    const channel = supabase
      .channel(`messages-chat-${chatId}-${Date.now()}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // Cambiado de '*' a 'INSERT' para escuchar solo inserciones
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          console.log('New message received via realtime:', payload);
          setMessages((prev) => {
            if (prev.some((msg) => msg.id === payload.new.id)) {
              console.log('Duplicate message ignored:', payload.new.id);
              return prev;
            }
            console.log('Adding new message to UI:', payload.new);
            return [...prev, payload.new];
          });
        }
      )
      .subscribe((status, error) => {
        console.log('Realtime subscription status changed to:', status);
        if (error) {
          console.error('Realtime subscription error:', error);
          setError('Error connecting to realtime updates. You may need to refresh.');
        }
        setIsConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = newMessage.trim();
    if (!messageText || isSending || !selectedChat) return;

    try {
      setIsSending(true);
      setNewMessage('');

      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        content: messageText,
        user_id: user.id,
        username: user.username,
        chat_id: selectedChat,
        created_at: new Date().toISOString(),
        isOptimistic: true,
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      const response = await fetch(`https://pisafondo-production.up.railway.app/chats/${selectedChat}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: messageText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el mensaje');
      }

      const messageData = await response.json();
      console.log('Message sent successfully:', messageData);

      setMessages((prev) =>
        prev.map((msg) => (msg.id === optimisticMessage.id ? messageData : msg))
      );

      inputRef.current?.focus();
    } catch (err) {
      console.error('Send message error:', err);
      setError(err.message);
      setNewMessage(messageText);
      setMessages((prev) => prev.filter((msg) => !msg.isOptimistic));
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateChat = async (e) => {
    e.preventDefault();
    if (!newChatName.trim()) {
      toast.error('El nombre del chat es obligatorio', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`https://pisafondo-production.up.railway.app/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newChatName.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating chat');
      }
      const newChat = await response.json();
      setChats([...chats, newChat]);
      setSelectedChat(newChat.id);
      setIsDropdownOpen(false);
      setIsCreateChatModalOpen(false);
      setNewChatName('');
      toast.success(`Chat "${newChatName}" creado exitosamente`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Create chat error:', err);
      toast.error('No se pudo crear el chat', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleJoinChat = async (e) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) {
      toast.error('El código de invitación es obligatorio', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`https://pisafondo-production.up.railway.app/chats/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ invite_code: inviteCodeInput.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al unirse al chat');
      }

      const { chat_id } = await response.json();
      await fetchChats();
      setSelectedChat(chat_id);
      setInviteCodeInput('');
      setInviteError('');
      toast.success('¡Te uniste al chat exitosamente!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Join chat error:', err);
      setInviteError(err.message);
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const copyInviteLink = (inviteCode) => {
    navigator.clipboard.writeText(inviteCode); // Copiar solo el código
    toast.success('¡Código de invitación copiado!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date in formatMessageTime:', dateString);
      return 'Hora desconocida';
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupMessagesByDate = (msgs) => {
    const groups = {};
    msgs.forEach((message) => {
      if (!message.created_at) {
        console.warn('Missing created_at in message:', message);
        return;
      }
      const date = new Date(message.created_at);
      if (isNaN(date.getTime())) {
        console.warn('Invalid created_at in message:', message);
        return;
      }
      const dateKey = date.toISOString().split('T')[0];
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
    });
    return groups;
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date in formatDateHeader:', dateString);
      return 'Fecha desconocida';
    }
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === yesterday.toDateString()) return 'Ayer';
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const messageGroups = useMemo(() => {
    const groups = groupMessagesByDate(messages);
    console.log('Updated messageGroups:', groups);
    return groups;
  }, [messages]);

  const currentChatName = selectedChat ? chats.find((chat) => chat.id === selectedChat)?.name || 'Chat' : 'Sin selección';
  const currentInviteCode = selectedChat ? chats.find((chat) => chat.id === selectedChat)?.invite_code : null;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-indigo-600 px-6 py-3 text-white flex items-center justify-between">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex justify-between w-48 rounded-md border border-indigo-400 shadow-sm px-4 py-2 bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isLoadingChats ? 'Cargando chats...' : currentChatName}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                {chats.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">No hay chats disponibles</div>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedChat === chat.id ? 'bg-indigo-100 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setSelectedChat(chat.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {chat.name}
                    </button>
                  ))
                )}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100"
                    onClick={() => setIsCreateChatModalOpen(true)}
                  >
                    + Nuevo chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-700 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.username?.charAt(0)?.toUpperCase() || ''}
          </div>
          <span className="font-medium text-sm">{user?.username || 'Usuario'}</span>
        </div>
      </div>

      {/* Modal para crear chat */}
      {isCreateChatModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear nuevo chat</h3>
            <form onSubmit={handleCreateChat}>
              <input
                type="text"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Nombre del chat"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateChatModalOpen(false);
                    setNewChatName('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
            {currentChatName.charAt(0)?.toUpperCase() || 'C'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentChatName}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              {isConnected ? 'Conectado' : 'Desconectado'}
              <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {currentInviteCode && (
            <button
              onClick={() => copyInviteLink(currentInviteCode)}
              className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
              title="Copiar código de invitación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
              </svg>
            </button>
          )}
          <button
            onClick={() => fetchMessages(selectedChat)}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Refrescar mensajes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <form onSubmit={handleJoinChat} className="flex items-center gap-3">
          <input
            type="text"
            value={inviteCodeInput}
            onChange={(e) => setInviteCodeInput(e.target.value)}
            placeholder="Ingresa un código de invitación"
            className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inviteCodeInput.trim()}
            className={`p-2 rounded-full transition-all ${
              inviteCodeInput.trim()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </form>
        {inviteError && <p className="text-red-600 text-sm mt-2">{inviteError}</p>}
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {!selectedChat ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="text-lg font-medium">Ningún chat seleccionado</p>
            <p className="text-sm mt-2">Selecciona un chat o únete con un código</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-lg font-medium">No hay mensajes aún</p>
            <p className="text-sm mt-2">Sé el primero en enviar un mensaje</p>
          </div>
        ) : (
          Object.keys(messageGroups).map((dateKey) => (
            <div key={dateKey} className="mb-8">
              <div className="flex justify-center mb-4">
                <span className="bg-gray-200 text-gray-700 text-xs font-medium px-4 py-1.5 rounded-full">
                  {formatDateHeader(dateKey)}
                </span>
              </div>
              {messageGroups[dateKey].map((message, index) => {
                const isMe = message.user_id === user.id;
                const showAvatar = index === 0 || messageGroups[dateKey][index - 1]?.user_id !== message.user_id;
                const userColor = isMe ? '#4F46E5' : generateUserColor(message.user_id);

                return (
                  <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
                    {!isMe && showAvatar && (
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                        style={{ backgroundColor: userColor }}
                      >
                        {message.username?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                    <div className={`max-w-xs lg:max-w-md ${!isMe && !showAvatar ? 'ml-13' : ''}`}>
                      {showAvatar && (
                        <p className={`text-sm text-gray-600 mb-1 ${isMe ? 'text-right' : 'text-left'}`}>
                          {isMe ? 'Tú' : message.username}
                        </p>
                      )}
                      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`inline-block px-4 py-3 rounded-2xl shadow-sm transition-all ${
                            isMe ? 'bg-indigo-600 text-white rounded-br-md' : 'text-white rounded-bl-md'
                          }`}
                          style={{ backgroundColor: isMe ? undefined : userColor }}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${isMe ? 'text-indigo-200' : 'text-gray-200'}`}>
                            {formatMessageTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {isMe && showAvatar && (
                      <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold ml-3">
                        {user.username?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6 rounded-lg flex items-center gap-3">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm flex-1">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-red-500 hover:text-red-600 focus:outline-none"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={selectedChat ? 'Escribe un mensaje...' : 'Selecciona un chat para enviar mensajes'}
            disabled={!isConnected || isSending || !selectedChat}
            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!isConnected || !newMessage.trim() || isSending || !selectedChat}
            className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isConnected && newMessage.trim() && !isSending && selectedChat
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSending ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;