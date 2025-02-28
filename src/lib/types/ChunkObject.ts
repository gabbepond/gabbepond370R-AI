export interface ChunkObject {
    chunk_text: string;
    file_name: string;
    metadata?: {
        totalPages: number;
        pageNumberLocation: number;
        chunkIndex: number;
    };
    [key: string]: unknown;
}