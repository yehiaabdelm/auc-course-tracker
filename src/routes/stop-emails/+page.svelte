<script>
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Terminal } from 'lucide-svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	export let form;
	import { AlertCircle } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
</script>

<div class="container">
	<p class="scroll-m-20 text-lg text-gray-500">Please input your email to stop receiving emails</p>
	<form action="POST">
		<div>
			<Label for="email">Email</Label>
			<div class="email padd">
				<Input type="email" id="email" name="email" placeholder="email" />
			</div>
		</div>
		<div class="end">
			<Button>Submit</Button>
		</div>
	</form>
	{#if form?.error}
		<Alert.Root variant="destructive">
			<AlertCircle class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>
				{form.message}
			</Alert.Description>
		</Alert.Root>
	{:else if form?.message}
		<Alert.Root>
			<Terminal class="h-4 w-4" />
			<Alert.Title>Success!</Alert.Title>
			<Alert.Description>
				{form.message}
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>

<style>
	.padd {
		margin-top: 1rem;
	}

	div.end {
		display: flex;
		/* to the right */
		justify-content: flex-end;
	}
	div.email {
		padding: 0;
	}
</style>
