'use client';

import { useState } from 'react';
import { Plus, MessageSquare, Settings, Pencil, Trash2 } from 'lucide-react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
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

    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameTitle, setRenameTitle] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleCreate = () => {
        createConversation();
    };

    const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setRenamingId(id);
        setRenameTitle(currentTitle);
    };

    const handleSaveRename = () => {
        if (renamingId && renameTitle.trim()) {
            renameConversation(renamingId, renameTitle.trim());
        }
        setRenamingId(null);
    };

    const handleStartDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeletingId(id);
    };

    const handleConfirmDelete = () => {
        if (deletingId) {
            deleteConversation(deletingId);
        }
        setDeletingId(null);
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
                                <Box sx={{ display: 'none', gap: 0.5 }} className="actions">
                                    <IconButton size="small" onClick={(e) => handleStartRename(conv.id, conv.title, e)}>
                                        <Pencil size={14} />
                                    </IconButton>
                                    <IconButton size="small" onClick={(e) => handleStartDelete(conv.id, e)} color="error">
                                        <Trash2 size={14} />
                                    </IconButton>
                                </Box>
                            }
                            sx={{
                                mb: 0.5,
                                '&:hover .actions': { display: 'flex' }
                            }}
                        >
                            <ListItemButton
                                selected={currentConversationId === conv.id}
                                onClick={() => setCurrentConversation(conv.id)}
                                sx={{
                                    borderRadius: 1,
                                    '&.Mui-selected': {
                                        bgcolor: 'action.selected',
                                        color: 'text.primary',
                                        '&:hover': { bgcolor: 'action.selected' },
                                        '& .MuiListItemIcon-root': { color: 'text.primary' }
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

            {/* Rename Dialog */}
            <Dialog open={!!renamingId} onClose={() => setRenamingId(null)} maxWidth="xs" fullWidth>
                <DialogTitle>{t('renameChat')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        value={renameTitle}
                        onChange={(e) => setRenameTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSaveRename();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRenamingId(null)}>{t('cancel')}</Button>
                    <Button onClick={handleSaveRename} variant="contained">{t('save')}</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={!!deletingId} onClose={() => setDeletingId(null)}>
                <DialogTitle>{t('deleteChat')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('deleteConfirm')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeletingId(null)}>{t('cancel')}</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
