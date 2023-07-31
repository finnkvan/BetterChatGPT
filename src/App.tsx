import React, { useEffect } from 'react';
import useStore from '@store/store';
import i18n from './i18n';

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import ApiPopup from '@components/ApiPopup';
import Toast from '@components/Toast';

function App() {
  const initialiseNewChat = useInitialiseNewChat();
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }, []);

  useEffect(() => {
    const chats = useStore.getState().chats;
    const currentChatIndex = useStore.getState().currentChatIndex;
    if (!chats || chats.length === 0) {
      initialiseNewChat();
    }
    if (
      chats &&
      !(currentChatIndex >= 0 && currentChatIndex < chats.length)
    ) {
      setCurrentChatIndex(0);
    }
  }, []);

  return (
    <div className='overflow-hidden w-full h-full relative'>
      <Menu />
      <Chat />
      <ApiPopup />
      <Toast />
    </div>
  );
}

export default App;
