<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import '../app.scss';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="header">
	{#if data.user}
		<p>登记员：{data.user.username}</p>

		<form
			method="POST"
			action="/logout"
			use:enhance={() => {
				return async ({ result }) => {
					pb.authStore.clear();
					await applyAction(result);
				};
			}}
		>
			<button class="action-btn">登出</button>
		</form>
		<a class="action-btn" href="/record">登记入口</a>
	{:else if !($page.url.pathname === '/login')}
		<a class="action-btn" href="/login">登记员登陆</a>
	{/if}
</header>

<div class="">
	<slot />
</div>

<style lang="scss">
	:global(body) {
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		gap: 1rem;

		position: fixed;
		top: 0;
		right: 0;
		margin: 1rem;

		z-index: 100;
	}

	.action-btn {
		color: #000;
		text-decoration: none;

		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		background-color: hsla(0, 0%, 100%, 0.5);
		backdrop-filter: blur(0.5rem);
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
</style>
