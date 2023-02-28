<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main class="container">
	<form
		method="POST"
		class="signin-form"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.loadFromCookie(document.cookie);
				await applyAction(result);
			};
		}}
	>
		<h1 class="form-title">Log in</h1>
		{#if form?.type === 'MISSING'}
			<div class="form-error">
				<p>Missing username or password</p>
			</div>
		{/if}
		{#if form?.type === 'INVALID'}
			<div class="form-error">
				<p>Invalid username or password</p>
			</div>
		{/if}
		<div class="form-control">
			<label class="form-group">
				Username
				<input
					type="username"
					name="username"
					placeholder="Username"
					class="form-input"
					required
					value={form?.username || ''}
				/>
			</label>
			<label class="form-group">
				Password
				<input type="password" name="password" placeholder="Password" class="form-input" required />
			</label>
			<button class="form-submit" type="submit">Log in</button>
		</div>
	</form>
	<a class="back-to-home" href="/">
		<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			/></svg
		>Back to home
	</a>
</main>

<style lang="scss">
	.container {
		max-width: 400px;
		margin: 0 auto;
		padding-top: 10%;
	}

	.signin-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.form-title {
		font-size: 3rem;
		font-weight: 600;
		margin-bottom: 2rem;
	}

	.form-control {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
	}

	.form-input {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		outline: none;

		&:focus,
		&:active {
			outline: #0be5ff solid 1px;
		}
	}

	.form-submit {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		background-color: #fff;
		cursor: pointer;

		transition: background-color 0.15s ease-in-out;
		&:hover {
			background-color: #eee;
		}
		&:active {
			background-color: #ddd;
		}
		&:focus,
		&:active {
			outline: #0be5ff solid 1px;
		}
	}
	.back-to-home {
		display: flex;

		flex-direction: row;

		gap: 0.5rem;

		align-items: center;
		justify-content: center;

		width: max-content;

		text-align: center;

		color: #000;
		text-decoration: none;
		text-transform: uppercase;

		border-radius: 0.25rem;

		padding: 0.4rem 0.8rem;
		margin: 1rem auto;
		background-color: #fff;
		cursor: pointer;

		transition: background-color 0.15s ease-in-out;
		&:hover {
			background-color: #eee;
			color: #075f84;
		}
		&:active {
			background-color: #ddd;
		}
		&:focus,
		&:active {
			outline: #0be5ff solid 1px;
		}
	}

	.form-error {
		width: 100%;
		padding: 0.7rem 1rem;
		margin: 1rem 0;
		border: 1px solid #f70032;
		border-radius: 0.25rem;
		background-color: #f70032;
		color: #fff;
	}

	.form-error p {
		margin: 0;
	}
</style>
