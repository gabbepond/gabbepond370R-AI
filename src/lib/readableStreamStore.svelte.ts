export function readableStreamStore() {
    let loading = $state(false);
    let text = $state("");
    
    async function request(request: Request) {
        loading = true;
        text = "";
        
        try {
            const result = await fetch(request);
            
            if (!result.ok) throw new Error(result.statusText);
            if (!result.body) return;

            const reader = result.body
                .pipeThrough(new TextDecoderStream())
                .getReader();

            let finaltext = "";
            while (true) {
                const { value: token, done } = await reader.read();

                if (token != undefined) {
                    finaltext += token;
                    text = finaltext;
                }
                if (done) break;
            }

            loading = false;
            text = "";
            
            return finaltext;
        } catch (err: any) {
            loading = false;
            text = err.toString();
            throw err;
        }
    }

    return {
        get loading() { return loading; },
        get text() { return text; },
        request
    };
}