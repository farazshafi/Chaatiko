import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import { Box } from '@chakra-ui/react';  // Import Box from Chakra UI
import animationActiveData from '../animations/active.json';
import animationOfflineData from '../animations/offline.json';

const lottieStyleOffline = {
  width: '70px',
};
const lottieStyleActive = {
  width: '70px',
};

const IsOnlineAnimation = ({ isOpponentOnline, selectedChat }) => {
  useEffect(() => {
    console.log('Opponent status Changed');
  }, [isOpponentOnline]);

  return (
    <Box id='status'>
      {!selectedChat.isGroupChat &&
        (isOpponentOnline ? (
          <Lottie
            animationData={animationActiveData}
            style={lottieStyleActive}
            loop={true}
            autoPlay={true}
          />
        ) : (
          <Lottie
            animationData={animationOfflineData}
            style={lottieStyleOffline}
            loop={true}
            autoPlay={true}
          />
        ))}
    </Box>
  );
};

export default IsOnlineAnimation;
