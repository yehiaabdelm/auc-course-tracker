<script>
	import { enhance } from '$app/forms';
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
	<div class="padd" style="padding-bottom: 1em">
		<p class="scroll-m-20 text-lg text-gray-800">
			Please input your email to stop receiving ALL emails
		</p>
	</div>
	<form method="POST" use:enhance>
		<div>
			<Label for="email">Email</Label>
			<div class="email padd">
				<Input type="email" id="email" name="email" placeholder="email" />
			</div>
		</div>
		<div class="end padd">
			<p class="text-sm text-muted-foreground">
				Please make sure your input is correct as it is not being validated.
			</p>
		</div>
		<div class="end padd">
			<Button>Submit</Button>
		</div>
	</form>
	{#if form?.error}
		<div class="padd">
			<Alert.Root variant="destructive">
				<AlertCircle class="h-4 w-4" />
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>
					{form.message}
				</Alert.Description>
			</Alert.Root>
		</div>
	{:else if form?.message}
		<div class="padd">
			<Alert.Root>
				<Terminal class="h-4 w-4" />
				<Alert.Title>Success!</Alert.Title>
				<Alert.Description>
					{form.message}
				</Alert.Description>
			</Alert.Root>
		</div>
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
