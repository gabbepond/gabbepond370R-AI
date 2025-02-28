interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface MessageBody {
    chats: Message[];
    systemPrompt: string;
    deepSeek: boolean;
    fileNames?: string[];
}