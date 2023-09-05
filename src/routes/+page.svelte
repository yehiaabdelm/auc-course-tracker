<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Register</h1>

<div class="flex flex-col w-full max-w-sm gap-1.5">
	<form method="POST" use:enhance>
		<Label for="email">Email</Label>
		<Input type="email" id="email" name="email" placeholder="email" />
		<Label>CRN</Label>
		<Input type="text" id="crn" name="crn1" placeholder="crn" />
		<Input type="text" id="crn" name="crn2" placeholder="crn" />
		<Input type="text" id="crn" name="crn3" placeholder="crn" />
		<Input type="text" id="crn" name="crn4" placeholder="crn" />
		<Input type="text" id="crn" name="crn5" placeholder="crn" />
		<Input type="text" id="crn" name="crn6" placeholder="crn" />
		<Button>Submit</Button>
	</form>
</div>

<style>
	div {
		/* background-color: #fff; */
		border-radius: 0.5rem;
		padding: 1rem;
	}
</style>
