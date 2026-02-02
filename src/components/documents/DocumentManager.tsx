'use client';

import { FileText, Trash2, UploadCloud } from 'lucide-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { useTranslations } from 'next-intl';

export function DocumentManager() {
    const t = useTranslations('Documents');

    return (
        <Box
            component="aside"
            sx={{
                width: 300,
                height: '100%',
                bgcolor: 'background.paper',
                borderLeft: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                p: 2
            }}
        >
            <Box sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={600}>
                    {t('title')}
                </Typography>
            </Box>

            <Box
                sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    mb: 2,
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                        color: 'primary.main'
                    }
                }}
            >
                <UploadCloud size={32} />
                <Typography variant="subtitle2" fontWeight={500}>{t('clickUpload')}</Typography>
                <Typography variant="caption">{t('formats')}</Typography>
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <List disablePadding>
                    {/* Mock Files */}
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" size="small">
                                <Trash2 size={16} />
                            </IconButton>
                        }
                        sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            mb: 1,
                            bgcolor: 'background.default'
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'transparent', color: 'primary.main' }}>
                                <FileText size={20} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="marketing_v1.pdf"
                            secondary="2.4 MB"
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500, noWrap: true }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                        />
                    </ListItem>

                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" size="small">
                                <Trash2 size={16} />
                            </IconButton>
                        }
                        sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            mb: 1,
                            bgcolor: 'background.default'
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'transparent', color: 'primary.main' }}>
                                <FileText size={20} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="notes.txt"
                            secondary="12 KB"
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500, noWrap: true }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
