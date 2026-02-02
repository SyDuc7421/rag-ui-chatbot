'use client';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: 'background.default' }}>
            <Sidebar />
            <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
