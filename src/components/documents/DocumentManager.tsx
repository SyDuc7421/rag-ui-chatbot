'use client';

import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Upload, FileText, Trash2, File } from 'lucide-react';
import { useDocumentStore } from '@/lib/store';
import { useTranslations } from 'next-intl';

export function DocumentManager() {
    const t = useTranslations('Documents');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { documents, uploadDocument, deleteDocument } = useDocumentStore();

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // basic validation
                if (
                    file.type === 'application/pdf' ||
                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    file.name.endsWith('.pdf') ||
                    file.name.endsWith('.docx')
                ) {
                    uploadDocument({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                    });
                } else {
                    alert('Only PDF and DOCX files are allowed.');
                }
            }
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Box
            component="aside"
            sx={{
                width: 280,
                height: '100%',
                bgcolor: 'background.paper',
                borderLeft: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                pt: 2,
                pb: 2,
            }}
        >
            <Box sx={{ px: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {t('title')}
                </Typography>

                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Upload size={18} />}
                    onClick={handleUploadClick}
                    sx={{ textTransform: 'none', mb: 1, py: 1 }}
                >
                    {t('clickUpload')}
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                    {t('formats')}
                </Typography>

                <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
                <List>
                    {documents.map((doc) => (
                        <ListItem
                            key={doc.id}
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                mb: 1,
                                bgcolor: 'background.default',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                            secondaryAction={
                                <IconButton edge="end" size="small" onClick={() => deleteDocument(doc.id)} color="error">
                                    <Trash2 size={16} />
                                </IconButton>
                            }
                        >
                            <Box sx={{ mr: 1.5, color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                {doc.name.endsWith('.pdf') ? <FileText size={20} /> : <File size={20} />}
                            </Box>
                            <ListItemText
                                primary={doc.name}
                                secondary={formatBytes(doc.size)}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    noWrap: true,
                                    fontWeight: 500
                                }}
                                secondaryTypographyProps={{
                                    variant: 'caption'
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
                {documents.length === 0 && (
                    <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
                        <Typography variant="body2">No documents uploaded yet.</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
