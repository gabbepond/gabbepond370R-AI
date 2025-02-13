<script lang="ts">
    //let { selectedSystemPrompt = $bindable() } = $props()
    
let systemPrompts = [
        'Helpful Assistant',
        'Emoji Pirate',
        'Web Development Instructor',
        'Physics Tutor',
    ];

    let examplePrompts = [
        'Tell me a joke',
        'Explain quantum computing',
        'Write a haiku about programming',
        'Describe the benefits of exercise',
    ];

    let { 
        selectedSystemPrompt = $bindable(systemPrompts[0]),
        selectedExamplePrompt = $bindable(''),
        deepSeek = $bindable(false) 
    } = $props<{
        selectedSystemPrompt?: string;
        selectedExamplePrompt?: string;
        deepSeek?: boolean;
    }>();

/* 
    function handleSystemPromptChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
        selectedSystemPrompt = (event.currentTarget as HTMLSelectElement).value;
    }

    function handleExamplePromptChange(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
        selectedExamplePrompt = event.currentTarget.value;
    } */
  </script>
  
  <nav class="bg-primary-800 w-full p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white font-bold text-xl">AI Chat Experiments</div>
      
      <div class="flex items-center space-x-4">
        <!-- System Prompt Dropdown -->
        <div class="relative">
          <select
            class="bg-secondary-900 text-white py-2 px-4 rounded-md"
            bind:value={selectedSystemPrompt}
          >
            {#each systemPrompts as prompt}
              <option value={prompt}>{prompt}</option>
            {/each}
          </select>
        </div>
  
        <!-- Example Prompts Dropdown -->
        <div class="relative">
          <select
            class="bg-secondary-900 text-white py-2 px-4 rounded-md"
            bind:value={selectedExamplePrompt}
          >
            <option value="">Select an example prompt</option>
            {#each examplePrompts as prompt}
              <option value={prompt}>{prompt}</option>
            {/each}
          </select>
        </div>
  
        <!-- JSON Mode Toggle -->
        <div class="flex items-center">
          <span class="text-white mr-2">Use DeepSeek?</span>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button
            class={`w-12 h-6 rounded-full p-1 ${
              deepSeek ? 'bg-green-400' : 'bg-gray-400'
            }`}
            onclick={() => deepSeek = !deepSeek}
          >
            <div
              class={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                deepSeek ? 'translate-x-6' : ''
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  </nav>
  
{#if selectedSystemPrompt}
    <div class="bg-yellow-100 p-4 mt-4">
      <p class="text-yellow-800">System Prompt: {selectedSystemPrompt}</p>
    </div>
  {/if}
  
  