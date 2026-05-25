import React from 'react';
import { Box, Typography } from '@mui/material';
import ChatClient from '../../components/features/chat/ChatClient';

const HostInboxPage: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 3 } }}>
      <ChatClient role="host" />
    </Box>
  );
};

export default HostInboxPage;
