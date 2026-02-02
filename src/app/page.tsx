'use client';

import Box from '@mui/material/Box';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { DocumentManager } from '@/components/documents/DocumentManager';

export default function Home() {
  return (
    <AppLayout>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <ChatInterface />
        </Box>
        <DocumentManager />
      </Box>
    </AppLayout>
  );
}
