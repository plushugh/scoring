<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import { serializeNonPOJOs } from '$lib/utils';
	import type { RecordsResponse, StudentsResponse } from 'src/pocketbase-types';
	import { onDestroy, onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';

	import type { ActionData, PageData } from './$types';

	let cardNumber: string = '';

	$: cardNumber = cardNumber.replace(/[^0-9]/g, ''); // prevent any non-numeric characters

	export let form: ActionData;

	export let data: PageData;

	let success = false;

	let actionName = '';
	let actionHouse = '';
	let actionScore = 0;

	let to: NodeJS.Timer | undefined;

	let records: RecordsResponse<{ student: StudentsResponse }>[] = [];
	let unsubscribeRecords: () => void;

	onMount(async () => {
		// Initial
		const initial = serializeNonPOJOs(
			await pb
				.collection('records')
				.getFullList<RecordsResponse<{ student: StudentsResponse }>>(undefined, {
					filter: `recorder = "${data.user?.id}"`,
					sort: '-created',
					expand: 'student'
				})
		);
		records = initial;

		// Subscribe
		unsubscribeRecords = await pb
			.collection('records')
			.subscribe<RecordsResponse>('*', async ({ action, record }) => {
				if (action === 'create' && record.recorder === data.user?.id) {
					records = [
						...records,
						serializeNonPOJOs(
							await pb
								.collection('records')
								.getOne<RecordsResponse<{ student: StudentsResponse }>>(record.id, {
									expand: 'student'
								})
						)
					];
				}
			});
	});

	$: console.log(records);

	onDestroy(() => {
		to && clearTimeout(to);

		unsubscribeRecords && unsubscribeRecords();
	});
</script>

<main class="container">
	{#if data.user}
		<h2>登记分数</h2>

		<form
			method="POST"
			action="/record"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ result }) => {
					if (result.type === 'success') {
						success = true;

						actionName = result.data?.name;
						actionHouse = result.data?.house;
						actionScore = result.data?.score;

						cardNumber = '';

						to = setTimeout(() => {
							actionName = '';
							actionHouse = '';
							actionScore = 0;
							success = false;
						}, 5000);
					}
					await applyAction(result);
				};
			}}
		>
			<div class="group">
				<span>饭卡号</span>
				<!-- svelte-ignore a11y-autofocus -->
				<!-- svelte-ignore a11y-positive-tabindex -->
				<input
					class="card-number"
					type="text"
					name="cardNumber"
					minlength="11"
					maxlength="11"
					accept="0123456789"
					tabindex="1"
					autofocus
					required
					bind:value={cardNumber}
				/>
				<!-- Ally: I dont care what you say but im using autofocus AND making it being focused first bruh -->
			</div>
			<div class="group">
				<span>分数选项</span>
				<div class="segmented-control">
					<input type="radio" name="score" value="5" id="score-5" checked required />
					<label for="score-5">5</label>
					<input type="radio" name="score" value="10" id="score-10" />
					<label for="score-10">10</label>
					<input type="radio" name="score" value="20" id="score-20" />
					<label for="score-20">20</label>
					<input type="radio" name="score" value="30" id="score-30" />
					<label for="score-30">30</label>
				</div>
			</div>
			<button class="submit" type="submit"
				>录入 <svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"
					/></svg
				></button
			>
			{#if form?.type === 'MISSING'}
				<div class="form-error" in:slide>
					<p>请填写卡号/分数</p>
				</div>
			{/if}
			{#if form?.type === 'UNAUTHORIZED'}
				<div class="form-error" in:slide>
					<p>您没有权限，请尝试刷新页面</p>
				</div>
			{/if}
			{#if form?.type === 'INVALID'}
				<div class="form-error" in:slide>
					<p>卡号不存在</p>
				</div>
			{/if}
			{#if success}
				<div class="form-success" in:slide>
					<p>登记成功：{actionHouse} {actionName} +{actionScore}</p>
				</div>
			{/if}
		</form>
		<h3>记分纪录</h3>
		<table class="records-table">
			<thead class="records-table__head">
				<tr class="records-table__head__row">
					<th>姓名</th>
					<th>学院</th>
					<th>变化</th>
					<th>变化值</th>
					<th>时间</th>
				</tr>
			</thead>
			<tbody class="records-table__body">
				{#each records as record (record.id)}
					<tr
						class="records-table__body__row"
						animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}
					>
						<!-- ts-ignore -->
						<td>{record.expand?.student.name}</td>
						<td
							>{record.expand?.student.house === 'gryffindor'
								? '格兰芬多'
								: record.expand?.student.house === 'hufflepuff'
								? '赫奇帕奇'
								: record.expand?.student.house === 'ravenclaw'
								? '拉文克劳'
								: record.expand?.student.house === 'slytherin'
								? '斯莱特林'
								: '未知学院'}</td
						>
						<td>{record.action === 'increase' ? '+' : '-'}</td>
						<td>{record.change}</td>
						<td
							>{new Intl.DateTimeFormat('zh-CN', { timeStyle: 'medium' }).format(
								new Date(record.created)
							)}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<h2>无权限</h2>
	{/if}
</main>

<style lang="scss">
	.container {
		max-width: 65ch;
		margin: 0 auto;
		padding-top: 14%;

		h2 {
			font-size: 3rem;
			margin-bottom: 1em;
		}

		h3 {
			font-size: 2rem;
			margin-bottom: 1em;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			margin-bottom: 2rem;

			.form-error {
				width: 100%;
				padding: 1rem 1.5rem;
				border: 1px solid #f70032;
				border-radius: 0.25rem;
				background-color: #f70032;
				color: #fff;
			}

			.form-success {
				width: 100%;
				padding: 1rem 1.5rem;
				border: 1px solid #0aa83c;
				border-radius: 0.25rem;
				background-color: #0aa83c;
				color: #fff;
			}

			.form-error p {
				margin: 0;
			}

			.group {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				width: 100%;

				gap: 1rem;
				span {
					font-size: 1.5rem;
				}

				.card-number {
					font-size: 1.5rem;

					font-feature-settings: 'tnum';

					width: 100%;
					padding: 0.75rem 1rem;
					border: 1px solid #ccc;
					border-radius: 0.5rem;
					outline: none;

					&:focus,
					&:active {
						outline: #0be5ff solid 1px;
					}
				}

				.segmented-control {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					gap: 1em;

					input {
						display: none;
					}

					label {
						font-size: 1.5rem;
						padding: 0.5rem 1rem;
						border-radius: 0.5rem;
						cursor: pointer;

						&:hover {
							background-color: #eee;
						}

						&:active {
							background-color: #ddd;
						}
					}

					input:checked + label {
						background-color: #dc3545;
						color: #fff;
					}
				}
			}
			.submit {
				color: #000;
				text-decoration: none;

				display: flex;

				flex-direction: row;

				gap: 0.5rem;

				align-items: center;
				justify-content: center;

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

				svg {
					transform: scale(150%);
				}
			}
		}

		.records-table {
			width: 100%;
			margin: 2rem 0;
			border-collapse: collapse;

			&__head {
				&__row {
					& th {
						font-size: 1.3rem;
						padding: 0.4rem 0.8rem;
						border: 1px solid #ccc;
						background-color: #eee;
					}
				}
			}

			&__body {
				&__row {
					& td {
						font-size: 1rem;
						padding: 0.4rem 0.8rem;
						border: 1px solid #ccc;
						border-radius: 0.25rem;
						background-color: #fff;
					}
				}
			}
		}
	}
</style>
