'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, MessageSquarePlus } from 'lucide-react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useConversationStore } from '@/lib/store';
import { useTranslations } from 'next-intl';

export function ChatInterface() {
    const t = useTranslations('Chat');
    // const theme = useTheme();

    const {
        conversations,
        currentConversationId,
        addMessage,
        createConversation
    } = useConversationStore();

    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentConversation = conversations.find(c => c.id === currentConversationId);
    const messages = currentConversation?.messages || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentConversationId]);

    const handleSendMessage = () => {
        if (!inputValue.trim() || !currentConversationId) return;

        // Add user message
        addMessage(currentConversationId, {
            role: 'user',
            content: inputValue.trim(),
        });

        setInputValue('');

        // Simulate AI response (mock)
        setTimeout(() => {
            addMessage(currentConversationId, {
                role: 'assistant',
                content: "I've received your message. I'm a mock AI for now, but I can store conversation history by Zustand!",
            });
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!currentConversation) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary', gap: 2 }}>
                <MessageSquarePlus size={48} style={{ opacity: 0.5 }} />
                <Typography>{t('emptyState')}</Typography>
                <Button variant="contained" onClick={createConversation}>
                    Create New Chat
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {messages.length === 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%', color: 'text.secondary' }}>
                        <Typography>{t('emptyState')}</Typography>
                    </Box>
                ) : (
                    messages.map((msg) => (
                        <Box
                            key={msg.id}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                maxWidth: 800,
                                mx: 'auto',
                                width: '100%',
                                flexDirection: 'row'
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: msg.role === 'assistant' ? 'background.paper' : 'primary.light',
                                    color: msg.role === 'assistant' ? 'text.primary' : 'primary.main',
                                    border: 1,
                                    borderColor: 'divider',
                                    width: 36,
                                    height: 36
                                }}
                            >
                                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                            </Avatar>

                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {msg.role === 'assistant' ? t('aiName') : t('userName')}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                    {msg.content}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, background: 'linear-gradient(to top, var(--mui-palette-background-default) 80%, transparent)' }}>
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        p: 1,
                        display: 'flex',
                        alignItems: 'end',
                        gap: 1,
                        borderRadius: 3,
                        border: 1,
                        borderColor: 'divider'
                    }}
                >
                    <IconButton sx={{ mb: 0.5 }} aria-label={t('upload')}>
                        <Paperclip size={20} />
                    </IconButton>

                    <TextField
                        multiline
                        maxRows={4}
                        fullWidth
                        placeholder={t('placeholder')}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        variant="standard"
                        InputProps={{ disableUnderline: true, sx: { py: 1.5 } }}
                    />

                    <IconButton
                        color="primary"
                        disabled={!inputValue.trim()}
                        onClick={handleSendMessage}
                        aria-label={t('send')}
                        sx={{ mb: 0.5 }}
                    >
                        <Send size={20} />
                    </IconButton>
                </Paper>
            </Box>
        </Box>
    );
}
