import React from 'react';
import Chat from '../components/app/chat/Chat';

const LiveChat = ({ token, user }) => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-[calc(100vh-12rem)]">
          <Chat token={token} user={user} />
        </div>
        
      </div>
    </div>
  );
};

export default LiveChat;