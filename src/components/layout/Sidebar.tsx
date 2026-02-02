'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, MessageSquare, Settings, Pencil, Trash2, Check, X } from 'lucide-react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useConversationStore } from '@/lib/store';
import { useTranslations } from 'next-intl';

export function Sidebar() {
    const t = useTranslations('Sidebar');
    // const theme = useTheme();

    // Use Zustand store directly for now
    const {
        conversations,
        currentConversationId,
        setCurrentConversation,
        createConversation,
        deleteConversation,
        renameConversation
    } = useConversationStore();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when editing starts
    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    const handleCreate = () => {
        createConversation();
    };

    const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(id);
        setEditTitle(currentTitle);
    };

    const handleSaveRename = () => {
        if (editingId && editTitle.trim()) {
            renameConversation(editingId, editTitle.trim());
            setEditingId(null);
        } else {
            setEditingId(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveRename();
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(t('deleteConfirm'))) {
            deleteConversation(id);
        }
    };

    return (
        <Box
            component="aside"
            sx={{
                width: 280,
                height: '100%',
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                pt: 2,
                pb: 2,
            }}
        >
            <Box sx={{ px: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Plus size={20} />}
                    onClick={handleCreate}
                    sx={{ textTransform: 'none', fontWeight: 600, py: 1 }}
                >
                    {t('newChat')}
                </Button>
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <List sx={{ px: 1 }}>
                    {conversations.map((conv) => (
                        <ListItem
                            key={conv.id}
                            disablePadding
                            secondaryAction={
                                editingId !== conv.id && (
                                    <Box sx={{ display: 'none', gap: 0.5 }} className="actions">
                                        <IconButton size="small" onClick={(e) => handleStartRename(conv.id, conv.title, e)}>
                                            <Pencil size={14} />
                                        </IconButton>
                                        <IconButton size="small" onClick={(e) => handleDelete(conv.id, e)} color="error">
                                            <Trash2 size={14} />
                                        </IconButton>
                                    </Box>
                                )
                            }
                            sx={{
                                mb: 0.5,
                                '&:hover .actions': { display: 'flex' }
                            }}
                        >
                            {editingId === conv.id ? (
                                <TextField
                                    fullWidth
                                    inputRef={inputRef}
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleSaveRename}
                                    onClick={(e) => e.stopPropagation()}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mx: 1 }}
                                />
                            ) : (
                                <ListItemButton
                                    selected={currentConversationId === conv.id}
                                    onClick={() => setCurrentConversation(conv.id)}
                                    sx={{
                                        borderRadius: 1,
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.light',
                                            color: 'primary.main',
                                            '&:hover': { bgcolor: 'primary.light' },
                                            '& .MuiListItemIcon-root': { color: 'primary.main' }
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5, color: 'text.secondary' }}>
                                        <MessageSquare size={18} />
                                    </Box>
                                    <ListItemText
                                        primary={conv.title}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            variant: 'body2',
                                            fontWeight: currentConversationId === conv.id ? 600 : 400
                                        }}
                                    />
                                </ListItemButton>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />

            <Box sx={{ px: 2, pt: 2 }}>
                <Button
                    fullWidth
                    startIcon={<Settings size={18} />}
                    sx={{
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        textTransform: 'none'
                    }}
                >
                    {t('settings')}
                </Button>
            </Box>
        </Box>
    );
}
