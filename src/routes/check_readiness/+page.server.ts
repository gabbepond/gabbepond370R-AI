import weaviate from 'weaviate-client'
import type { WeaviateClient } from 'weaviate-client'
import type { PageServerLoad } from './$types'

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

export const load: PageServerLoad = async () => {
    // Only Thor needs to use his custom connectToWeaviate function
    client = await connectToWeaviate()
    // everyone but Thor should uncomment and use the following line
    //client = await weaviate.connectToLocal()

    const clientReadiness = await client.isReady()

    console.log('Client is ready:', clientReadiness) // should return true

    client.close()

    return {
        ready: clientReadiness
    }
}