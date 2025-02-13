import type { Actions } from './$types';
import { Readable } from 'stream';
import { promises as fsPromises } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pipeline } from 'stream/promises'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadPath = process.env.NODE_ENV === 'production' ? '/uploads' : path.resolve(__dirname, '../../uploads')

export const actions = {
    uploadFile: async ( {request} ) => {
        const formData = await request.formData();
        console.log(formData);
        const uploadedFile = formData?.get('file') as unknown as File | undefined

        if (!uploadedFile) {
            console.log('No file uploaded')
            return {
                status: 400,
                body: {
                    error: 'No file uploaded'
                }
            }
        }

        try {
            const fileBuffer = await uploadedFile.arrayBuffer();
            
            const readableStream = new Readable()
            readableStream.push(Buffer.from(fileBuffer))
            readableStream.push(null)

            // Delete all existing files in the uploads directory
            const files = await fsPromises.readdir(uploadPath)
            for (const file of files ) {
                await fsPromises.unlink(path.join(uploadPath, file))
            }

            const timeStampSuffix = Date.now();
			const fileNameOnly = uploadedFile.name.replace('.pdf', '');
			const uploadedFilePath = path.join(uploadPath, `${fileNameOnly}-${timeStampSuffix}.pdf`);

			await pipeline(readableStream, fs.createWriteStream(uploadedFilePath));

            console.log('File uploaded')

            return {
				status: 200,
				success: 'File uploaded and processed successfully.',
			};
        }
        catch (e) {
            return {
                status: 500,
                body: {
                    error: 'Failed to upload file'
                }
            }
        }
    }


} as Actions