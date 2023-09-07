<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { AlertCircle } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';

	export let data;
	export let form;
</script>

<div class="container">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
		AUC Course Tracker
	</h1>
	<div class="flex flex-col gap-3">
		<p class="scroll-m-20 text-3xl text-gray-500">
			Track courses and get notified when a seat is available.
		</p>
		<p class="scroll-m-20 text-xl text-gray-500">
			Input the CRNs you want to track and we will send you an email when a seat is available.
		</p>
		<p class="scroll-m-20 text-sm text-gray-500 italic">
			Last email sent at: {data?.lastEmailDate}
		</p>
	</div>

	<div class="flex flex-col gap-1.5">
		<form method="POST" use:enhance>
			<div>
				<Label for="email">Email</Label>
				<div class="email padd">
					<Input type="email" id="email" name="email" placeholder="email" />
				</div>
			</div>
			<div>
				<Label>CRN</Label>
				<div class="crn padd">
					<Input type="text" id="crn" name="crn1" placeholder="crn" />
					<Input type="text" id="crn" name="crn2" placeholder="crn" />
					<Input type="text" id="crn" name="crn3" placeholder="crn" />
					<Input type="text" id="crn" name="crn4" placeholder="crn" />
					<Input type="text" id="crn" name="crn5" placeholder="crn" />
					<Input type="text" id="crn" name="crn6" placeholder="crn" />
					<Input type="text" id="crn" name="crn7" placeholder="crn" />
				</div>
			</div>
			<div class="end">
				<p class="text-sm text-muted-foreground">
					Please make sure your input is correct as it is not being validated.
				</p>
			</div>

			<div class="end">
				<Button>Submit</Button>
			</div>
		</form>
		{#if form?.message}
			<Alert.Root variant="destructive">
				<AlertCircle class="h-4 w-4" />
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>
					{form.message}
				</Alert.Description>
			</Alert.Root>
		{/if}
	</div>
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
	div.crn {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		padding: 0;
	}
	div {
		/* background-color: #fff; */
		border-radius: 0.5rem;
		padding: 1rem;
	}

	@media (max-width: 800px) {
		div.crn {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
	}
</style>
