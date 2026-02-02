import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: number;
};

export type Conversation = {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
};

interface ConversationStore {
    conversations: Conversation[];
    currentConversationId: string | null;

    // Actions
    createConversation: () => void;
    deleteConversation: (id: string) => void;
    renameConversation: (id: string, newTitle: string) => void;
    setCurrentConversation: (id: string) => void;
    addMessage: (conversationId: string, message: Omit<Message, 'id' | 'createdAt'>) => void;
}

export const useConversationStore = create<ConversationStore>((set, _get) => ({
    conversations: [
        {
            id: '1',
            title: 'Project Discussion',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [
                {
                    id: 'm1',
                    role: 'assistant',
                    content: 'Hello! This is a mock conversation about the project.',
                    createdAt: Date.now(),
                }
            ]
        },
        {
            id: '2',
            title: 'Marketing Strategy',
            createdAt: Date.now() - 100000,
            updatedAt: Date.now() - 100000,
            messages: []
        }
    ],
    currentConversationId: '1',

    createConversation: () => {
        const newConversation: Conversation = {
            id: uuidv4(),
            title: 'New Conversation',
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        set((state) => ({
            conversations: [newConversation, ...state.conversations],
            currentConversationId: newConversation.id,
        }));
    },

    deleteConversation: (id) => {
        set((state) => {
            const newConversations = state.conversations.filter((c) => c.id !== id);
            const isCurrent = state.currentConversationId === id;

            return {
                conversations: newConversations,
                currentConversationId: isCurrent
                    ? (newConversations.length > 0 ? newConversations[0].id : null)
                    : state.currentConversationId,
            };
        });
    },

    renameConversation: (id, newTitle) => {
        set((state) => ({
            conversations: state.conversations.map((c) =>
                c.id === id ? { ...c, title: newTitle } : c
            ),
        }));
    },

    setCurrentConversation: (id) => {
        set({ currentConversationId: id });
    },

    addMessage: (conversationId, message) => {
        const newMessage: Message = {
            id: uuidv4(),
            createdAt: Date.now(),
            ...message,
        };

        set((state) => ({
            conversations: state.conversations.map((c) => {
                if (c.id === conversationId) {
                    return {
                        ...c,
                        messages: [...c.messages, newMessage],
                        updatedAt: Date.now(),
                    };
                }
                return c;
            }),
        }));
    },
}));
