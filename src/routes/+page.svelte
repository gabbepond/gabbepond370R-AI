<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import Calendar from 'lucide-svelte/icons/calendar';
	import CircleUser from 'lucide-svelte/icons/circle-user';
</script>

<AppBar>
	{#snippet lead()}
		<ArrowLeft size={24} />
	{/snippet}
	{#snippet trail()}
		<Paperclip size={20} />
		<Calendar size={20} />
		<CircleUser size={20} />
	{/snippet}
	{#snippet children()}
		<p class="text-blue-500">Center Align</p>
	{/snippet}
	<!--     {#snippet headline()}
      <p class="bg-slate-700 text-indigo-200 text-center">Headline</p>
    {/snippet} -->
</AppBar>

<h1 class="m-6 text-center text-4xl text-purple-600">Welcome to Gab's Full Stack SvelteKit App!</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

