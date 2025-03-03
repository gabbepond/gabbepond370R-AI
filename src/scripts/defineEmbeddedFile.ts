import weaviate, { dataType, type WeaviateClient, type Collection } from 'weaviate-client'

let client: WeaviateClient

// the following function is custom for Thor's machine only!!
async function connectToWeaviate() : Promise<WeaviateClient> {
    const clientPromise = weaviate.connectToCustom({
		httpHost: 'localhost',
		httpPort: 8080,
		grpcHost: 'localhost',
		grpcPort: 50051
	});
	return clientPromise;
}

const embeddedFileSchema = {
    name: 'Chunks',
    description: 'Relevant chunks of text from selected PDF files',
    vectorizers: weaviate.configure.vectorizer.text2VecOllama({
        // Configure the Ollama embedding integration
        model: 'nomic-embed-text',
        apiEndpoint: 'http://host.docker.internal:11434'
    }),
    generative: weaviate.configure.generative.ollama({
        model: 'llama3.2',
        apiEndpoint: 'http://host.docker.internal:11434'
    }),
    properties: [
        {
            name: 'chunk_text',
            dataType: dataType.TEXT
        },
        {
            name: 'file_name',
            dataType: dataType.TEXT
        },
        {
            name: 'metadata',
            dataType: dataType.OBJECT,
            nestedProperties: [
                {
                    name: 'totalPages',
                    dataType: dataType.INT
                },
                {
                    name: 'pageNumberLocation',
                    dataType: dataType.INT
                },
                {
                    name: 'chunkIndex',
                    dataType: dataType.INT
                }
            ]
        }
    ]
}

async function addCollection() {
    try {
        await client.collections.create(embeddedFileSchema)
        console.log('Added the Chunks collection')
    } catch (err) {
        console.error('Failed to add the Chunks collection')
    }
}

async function getCollectionCount(collectionName: string) {
    try {
        const collection: Collection = client.collections.get(collectionName)
        let count = 0
        for await (const _ of collection.iterator()) {
            count++
        }
        console.log(`The ${collectionName} collection has ${count} items`)
    } catch (err) {
        console.error(`Failed to get the ${collectionName} collection`)
    }
}

async function run() {
    const startTime: Date = new Date()
    console.log('Starting user embedded file schema creation...')

   client = await connectToWeaviate()
    //await addCollection()
    //await client.collections.delete('Chunks')
    await getCollectionCount('Chunks')

    const endTime: Date = new Date()
    const elapsedTime: number = endTime.getTime() - startTime.getTime();
	const elapsedTimeSeconds: number = elapsedTime / 1000;
	const elapsedTimeMinutes: number = elapsedTimeSeconds / 60;

	console.log(
		`Total running time: ${elapsedTimeSeconds} seconds or ${elapsedTimeMinutes} minutes.`
	);
}

await run()