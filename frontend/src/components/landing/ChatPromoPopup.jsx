import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ChatPromoComponent from './LiveChatPromo';

const ChatPromoPopup = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has been marked as "don't show again"
    const hasSeenPopup = localStorage.getItem('chatPromoSeen');
    if (!hasSeenPopup) {
      setIsOpen(true);
    }

    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Promoción de chat en vivo"
        >
          <ChatPromoComponent isAuthenticated={isAuthenticated} onClose={handleClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPromoPopup;