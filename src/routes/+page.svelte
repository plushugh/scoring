<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { pb } from '$lib/pocketbase';
	import { serializeNonPOJOs } from '$lib/utils';
	import type { HousesResponse, StudentsResponse } from 'src/pocketbase-types';
	import { onDestroy, onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	let houses: HousesResponse[] = [];
	let unsubscribeHouses: () => void;
	let studentsG: StudentsResponse[] = [];
	let unsubscribeStudentsG: () => void;
	let studentsH: StudentsResponse[] = [];
	let unsubscribeStudentsH: () => void;
	let studentsR: StudentsResponse[] = [];
	let unsubscribeStudentsR: () => void;
	let studentsS: StudentsResponse[] = [];
	let unsubscribeStudentsS: () => void;

	onMount(async () => {
		// // Initial
		// const initial = serializeNonPOJOs(
		// 	await pb.collection('students').getFullList<StudentsResponse>(undefined, {
		// 		orderBy: 'score',
		// 		order: 'desc'
		// 	})
		// );
		// students = initial;

		// // Subscribe
		// unsubscribe = await pb
		// 	.collection('students')
		// 	.subscribe<StudentsResponse>('*', ({ action, record }) => {
		// 		if (action === 'create') {
		// 			students = [...students, serializeNonPOJOs(record)];
		// 		}
		// 		if (action === 'delete') {
		// 			students = students.filter((s) => s.cardNumber !== serializeNonPOJOs(record).cardNumber);
		// 		}
		// 		if (action === 'update') {
		// 			students = students.map((s) =>
		// 				s.cardNumber === serializeNonPOJOs(record).cardNumber ? serializeNonPOJOs(record) : s
		// 			);
		// 		}
		// 	});

		// Initial
		const initial = serializeNonPOJOs(
			await pb.collection('houses').getFullList<HousesResponse>(undefined, {
				orderBy: 'score',
				order: 'desc'
			})
		);
		houses = initial;

		// Subscribe
		unsubscribeHouses = await pb
			.collection('houses')
			.subscribe<HousesResponse>('*', ({ action, record }) => {
				if (action === 'update') {
					houses = houses.map((s) =>
						s.name === serializeNonPOJOs(record).name ? serializeNonPOJOs(record) : s
					);
				}
			});

		// Initial
		const initialG = serializeNonPOJOs(
			await pb.collection('students').getFullList<StudentsResponse>(undefined, {
				filter: "house='gryffindor'",
				orderBy: 'score',
				order: 'desc'
			})
		);
		studentsG = initialG;

		// Subscribe
		unsubscribeStudentsG = await pb
			.collection('students')
			.subscribe<StudentsResponse>('*', ({ action, record }) => {
				if (action === 'create') {
					studentsG = [...studentsG, serializeNonPOJOs(record)];
				}
				if (action === 'delete') {
					studentsG = studentsG.filter(
						(s) => s.cardNumber !== serializeNonPOJOs(record).cardNumber
					);
				}
				if (action === 'update') {
					studentsG = studentsG.map((s) =>
						s.cardNumber === serializeNonPOJOs(record).cardNumber ? serializeNonPOJOs(record) : s
					);
				}
			});
		// Initial
		const initialH = serializeNonPOJOs(
			await pb.collection('students').getFullList<StudentsResponse>(undefined, {
				filter: "house='hufflepuff'",
				orderBy: 'score',
				order: 'desc'
			})
		);
		studentsH = initialH;

		// Subscribe
		unsubscribeStudentsH = await pb
			.collection('students')
			.subscribe<StudentsResponse>('*', ({ action, record }) => {
				if (action === 'create') {
					studentsH = [...studentsH, serializeNonPOJOs(record)];
				}
				if (action === 'delete') {
					studentsH = studentsH.filter(
						(s) => s.cardNumber !== serializeNonPOJOs(record).cardNumber
					);
				}
				if (action === 'update') {
					studentsH = studentsH.map((s) =>
						s.cardNumber === serializeNonPOJOs(record).cardNumber ? serializeNonPOJOs(record) : s
					);
				}
			});

		// Initial
		const initialR = serializeNonPOJOs(
			await pb.collection('students').getFullList<StudentsResponse>(undefined, {
				filter: "house='ravenclaw'",
				orderBy: 'score',
				order: 'desc'
			})
		);
		studentsR = initialR;

		// Subscribe
		unsubscribeStudentsR = await pb
			.collection('students')
			.subscribe<StudentsResponse>('*', ({ action, record }) => {
				if (action === 'create') {
					studentsR = [...studentsR, serializeNonPOJOs(record)];
				}
				if (action === 'delete') {
					studentsR = studentsR.filter(
						(s) => s.cardNumber !== serializeNonPOJOs(record).cardNumber
					);
				}
				if (action === 'update') {
					studentsR = studentsR.map((s) =>
						s.cardNumber === serializeNonPOJOs(record).cardNumber ? serializeNonPOJOs(record) : s
					);
				}
			});

		// Initial
		const initialS = serializeNonPOJOs(
			await pb.collection('students').getFullList<StudentsResponse>(undefined, {
				filter: "house='slytherin'",
				orderBy: 'score',
				order: 'desc'
			})
		);
		studentsS = initialS;

		// Subscribe
		unsubscribeStudentsS = await pb
			.collection('students')
			.subscribe<StudentsResponse>('*', ({ action, record }) => {
				if (action === 'create') {
					studentsS = [...studentsS, serializeNonPOJOs(record)];
				}
				if (action === 'delete') {
					studentsS = studentsS.filter(
						(s) => s.cardNumber !== serializeNonPOJOs(record).cardNumber
					);
				}
				if (action === 'update') {
					studentsS = studentsS.map((s) =>
						s.cardNumber === serializeNonPOJOs(record).cardNumber ? serializeNonPOJOs(record) : s
					);
				}
			});
	});

	$: sortedHouses = houses.sort((a, b) => (b.score || 0) - (a.score || 0));

	$: sortedStudentsG = studentsG.sort((a, b) => (b.score || 0) - (a.score || 0));
	$: sortedStudentsH = studentsH.sort((a, b) => (b.score || 0) - (a.score || 0));
	$: sortedStudentsR = studentsR.sort((a, b) => (b.score || 0) - (a.score || 0));
	$: sortedStudentsS = studentsS.sort((a, b) => (b.score || 0) - (a.score || 0));

	// $: sortedStudents = students.sort((a, b) => b.score - a.score);
	// // $: sortedTopStudents = sortedStudents.slice(0, 10);
	// $: sortedTopStudents = sortedStudents;

	// $: topScore = sortedStudents[0]?.score || 0;

	onDestroy(() => {
		unsubscribeHouses?.();
		unsubscribeStudentsG?.();
		unsubscribeStudentsH?.();
		unsubscribeStudentsR?.();
		unsubscribeStudentsS?.();
	});

	let WINDOW_HEIGHT = 0;
	let WINDOW_WIDTH = 0;
	$: HEIGHT = WINDOW_HEIGHT - 10;
	$: WIDTH = WINDOW_WIDTH - 40;

	let PADDING = 10;
	let BAR_PADDING = 10;
	let BAR_HEIGHT = 40;

	// let startRandomizer = false;

	// let ci: NodeJS.Timer | undefined;

	// $: {
	// 	if (startRandomizer) {
	// 		ci = setInterval(async () => {
	// 			const prev1 = await pb.collection('students').getOne<StudentsResponse>('j29i06553e9gp7u');
	// 			await pb.collection('students').update<StudentsResponse>('j29i06553e9gp7u', {
	// 				score: prev1.score + Math.floor(Math.random() * 100)
	// 			});
	// 			const prev2 = await pb.collection('students').getOne<StudentsResponse>('3gqn5lrgtox4kvi');
	// 			await pb.collection('students').update<StudentsResponse>('3gqn5lrgtox4kvi', {
	// 				score: prev2.score + Math.floor(Math.random() * 110)
	// 			});
	// 			const prev3 = await pb.collection('students').getOne<StudentsResponse>('ii64lzha8970nim');
	// 			await pb.collection('students').update<StudentsResponse>('ii64lzha8970nim', {
	// 				score: prev3.score + Math.floor(Math.random() * 120)
	// 			});
	// 			const prev4 = await pb.collection('students').getOne<StudentsResponse>('a5kwbqn31xdcrlo');
	// 			await pb.collection('students').update<StudentsResponse>('a5kwbqn31xdcrlo', {
	// 				score: prev4.score + Math.floor(Math.random() * 130)
	// 			});
	// 		}, 1000);
	// 	} else {
	// 		ci && clearInterval(ci);
	// 		ci = undefined;
	// 	}
	// }

	// onDestroy(() => {
	// 	ci && clearInterval(ci);
	// });
</script>

<svelte:window bind:innerHeight={WINDOW_HEIGHT} bind:innerWidth={WINDOW_WIDTH} />

<!-- <button on:click={() => (startRandomizer = !startRandomizer)}>
	{startRandomizer ? 'Stop randomizer' : 'Start randomizer'}
</button> -->

<!-- <div class="realtime-leaderboard">
	{#each sortedTopStudents as student, i (student.cardNumber)}
		<div
			animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}
			class="student"
			style="--width: {(student.score / topScore) *
				(WIDTH - 2 * PADDING)}px; --height: {BAR_HEIGHT}px; --tf-x: {PADDING}px; --tf-y: {PADDING +
				i * (BAR_HEIGHT + BAR_PADDING)}px; --bg: {student.house === 'gryffindor'
				? '#C94848'
				: student.house === 'hufflepuff'
				? '#B9C53A'
				: student.house === 'ravenclaw'
				? '#4883C9'
				: student.house === 'slytherin'
				? '#38A142'
				: 'black'}"
		>
			<div class="student__name">{student.name}</div>
			<div class="student__score">{student.score}</div>
		</div>
	{/each}
</div> -->

<div class="spacer" />

<div class="qp">
	{#each sortedHouses as house, i (house.name)}
		<div
			class="xy"
			style="--tint: {house.color};"
			animate:flip={{ duration: (d) => 20 * Math.sqrt(d) }}
		>
			<!-- <div class={'rank' + (i === 0 ? ' rank_first' : '')}>#{i + 1}</div> -->
			<div class="logo">
				<Logo house={house.name} />
			</div>
			<h3>
				{house.name === 'gryffindor'
					? '格兰芬多'
					: house.name === 'hufflepuff'
					? '赫奇帕奇'
					: house.name === 'ravenclaw'
					? '拉文克劳'
					: house.name === 'slytherin'
					? '斯莱特林'
					: '未知'}
			</h3>
			<h3>
				{house.name}
			</h3>
			<span>{house.score}</span>
			<ol class="phb">
				{#if house.name === 'gryffindor'}
					{#each sortedStudentsG as student, i (student.cardNumber)}
						<li animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }} class="house-student">
							<div class="house-student__name">{student.name}</div>
							<div class="house-student__score">{student.score}</div>
						</li>
					{/each}
				{/if}
				{#if house.name === 'hufflepuff'}
					{#each sortedStudentsH as student, i (student.cardNumber)}
						<li animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }} class="house-student">
							<div class="house-student__name">{student.name}</div>
							<div class="house-student__score">{student.score}</div>
						</li>
					{/each}
				{/if}
				{#if house.name === 'ravenclaw'}
					{#each sortedStudentsR as student, i (student.cardNumber)}
						<li animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }} class="house-student">
							<div class="house-student__name">{student.name}</div>
							<div class="house-student__score">{student.score}</div>
						</li>
					{/each}
				{/if}
				{#if house.name === 'slytherin'}
					{#each sortedStudentsS as student, i (student.cardNumber)}
						<li animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }} class="house-student">
							<div class="house-student__name">{student.name}</div>
							<div class="house-student__score">{student.score}</div>
						</li>
					{/each}
				{/if}
			</ol>
		</div>
	{/each}
</div>

<div class="spacer" />

<style lang="scss">
	.spacer {
		height: 10vh;
	}
	.qp {
		width: 82vw;
		height: 79vh;

		overflow-y: hidden;

		margin: 0 auto;

		display: grid;

		gap: 1rem;

		grid-template-columns: repeat(4, 1fr);
		.xy {
			display: flex;
			flex-direction: column;
			gap: 3rem;
			position: relative;

			color: white;

			background-color: var(--tint);

			padding: 2rem 1rem;

			// .rank {
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;

			// 	margin: 1rem;

			// 	color: white;

			// 	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			// 		'Courier New', monospace;
			// 	font-weight: 700;
			// 	font-size: 1rem;
			// }

			// .rank_first {
			// 	color: #ffd700;
			// 	font-size: 1.6em;
			// 	-webkit-text-stroke: 1px #000;
			// }

			.logo {
				width: 100%;
				height: 100px;

				display: flex;
				justify-content: center;
				align-items: center;

				:global(svg) {
					width: 100%;
					height: 100%;
				}
			}

			h3 {
				font-size: 3rem;
				font-weight: 900;
				text-align: center;
				line-height: 0.15;

				font-family: 'Heiti SC';

				text-transform: capitalize;
			}

			h3:last-of-type {
				font-size: 2rem;
				font-weight: 700;
				font-family: Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L',
					'Georgia Pro', Georgia, serif;
				margin-bottom: 0.45rem;
			}

			span {
				font-size: 4rem;
				font-weight: 700;
				text-align: center;
				line-height: 1;

				font-family: Avenir, 'Avenir Next LT Pro', Montserrat, Corbel, 'URW Gothic', source-sans-pro,
					sans-serif;

				font-feature-settings: 'tnum';
			}

			ol.phb {
				list-style: none;
				padding: 0 1.5em;

				counter-reset: list;

				li {
					opacity: 0;
				}

				li:nth-of-type(1),
				li:nth-of-type(2),
				li:nth-of-type(3),
				li:nth-of-type(4),
				li:nth-of-type(5),
				li:nth-of-type(6),
				li:nth-of-type(7),
				li:nth-of-type(8),
				li:nth-of-type(9),
				li:nth-of-type(10),
				li:nth-of-type(11) {
					opacity: 1;
				}

				li.house-student {
					&::before {
						counter-increment: list;
						content: counter(list) '.';
						margin-right: 0.5rem;

						font-size: 1.4rem;
						font-weight: 500;
						font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
							'Courier New', monospace;

						font-feature-settings: 'tnum';
					}

					display: flex;
					justify-content: space-between;
					align-items: center;

					color: white;

					width: 100%;
					height: 30px;

					&:not(:last-of-type) {
						margin-bottom: 0.5rem;
					}

					.house-student__name {
						font-size: 1.4rem;
						font-weight: 500;
						text-overflow: ellipsis;
					}

					.house-student__score {
						flex-grow: 1;
						text-align: right;
						font-size: 1.4rem;
						font-weight: 500;
						font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
							'Courier New', monospace;

						font-feature-settings: 'tnum';
						text-overflow: ellipsis;
					}
				}
			}
		}
	}

	// .realtime-leaderboard {
	// 	position: relative;
	// 	width: 100%;
	// 	height: 100%;
	// 	padding-top: 20px;
	// }

	// .student {
	// 	position: absolute;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	border-radius: 5px;
	// 	padding: 0 10px;

	// 	color: white;

	// 	width: var(--width);
	// 	height: var(--height);
	// 	transform: translate(var(--tf-x), var(--tf-y));
	// 	background-color: var(--bg);

	// 	transition: all 0.5s ease-in-out;
	// }

	// .student__name {
	// 	font-size: 1.2rem;
	// 	font-weight: 500;
	// 	text-overflow: ellipsis;
	// }

	// .student__score {
	// 	font-size: 1.2rem;
	// 	font-weight: 500;
	// 	text-overflow: ellipsis;
	// }
</style>
