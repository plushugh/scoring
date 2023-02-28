<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="container">
	<h2>An Error Occured</h2>
	<p>{$page.error?.message || 'An unknown error occured'}</p>
	<div><code>Error Code: {$page.error?.errorId || 'UNKNOWN'}</code></div>
	<a class="back-to-home" href={$page.data.user ? '/record' : '/'}
		><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			/></svg
		>
		{$page.data.user ? 'Back to record' : 'Back to home'}
	</a>
</main>

<style lang="scss">
	.container {
		max-width: 65ch;
		padding: 14% 1rem 0 1rem;
		margin: 0 auto;

		h2 {
			font-size: 3rem;
			margin-bottom: 1em;
		}

		p {
			font-size: 1rem;
			margin-bottom: 1em;
			line-height: 1.4;
		}

		div {
			width: 100%;
			padding: 1rem;

			margin-bottom: 1rem;

			border-radius: 0.5rem;
			background-color: #202031;

			color: white;

			code {
				margin: 0 auto;
				font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
					'Courier New', monospace;
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
	}
</style>
