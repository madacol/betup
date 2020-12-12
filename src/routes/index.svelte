<svelte:head>
	<title>Bet Up!</title>
</svelte:head>

<script lang="ts">
import { fade, slide } from 'svelte/transition';
import BetInputs from '../components/BetInputs.svelte';
import WinChancePreview from '../components/WinChancePreview.svelte';
import Overview from '../components/Overview.svelte';
import ServerPlayground from '../components/ServerPlayground.svelte';

	/**
	 * User inputs
	 */
	let netWinAmount: number;
	let betAmount: number;

	/**
	 * Server parameters
	 */
	let availableCapital = 10000;
	let maxRiskChance = 1e-6;
	let profitPercent = 0.02;

	/**
	 * Update calculations
	 */
	$: payAmount = netWinAmount+betAmount;
	$: idealWinChance = betAmount/payAmount;
	$: fairWinChance = idealWinChance * (1-profitPercent);

	let maxWinChance: number;
	$: {
		let repeatedBetsCapacity = availableCapital / (netWinAmount);
		maxWinChance = maxRiskChance ** (1/repeatedBetsCapacity);
	}
	$: maxWinChanceReached = fairWinChance > maxWinChance;

	let winChance: number;
	let realProfitPercent: number;
	$: if (maxWinChanceReached) {
		winChance = maxWinChance;
		realProfitPercent = 1 - (winChance / idealWinChance)
		/**
		 * Put a limit to the betAmount when this condition happens
		 */
		// betAmount = maxWinChance*netWinAmount / (1-profitPercent);
	} else {
		winChance = fairWinChance;
		realProfitPercent = profitPercent;
	}

	/**
	 * Bet management
	 */
	let betAccepted=false;
	function acceptBet() {betAccepted=true;}
	function unacceptBet() {betAccepted=false;}
</script>


<div id="screenSize">

	<div id="body">
		<h1>Bet Up!</h1>
		{#if !betAccepted}
			<div transition:slide class="makeBet">
				<BetInputs
					bind:netWinAmount
					bind:betAmount
				/>
				{#if netWinAmount && winChance}
					<div transition:fade|local>
						<div transition:slide|local>
							<WinChancePreview {winChance}/>
							<button on:click={acceptBet}>Accept Bet</button>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div transition:slide|local>
				<div transition:fade|local>
					<Overview
						{winChance}
						{payAmount}
						{betAmount}
					/>
					<button on:click={unacceptBet}>Go back</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<hr>

<ServerPlayground
	{maxWinChanceReached}
	{fairWinChance}
	{realProfitPercent}
	bind:availableCapital
	bind:maxRiskChance
	bind:profitPercent
/>

<style>
	#screenSize {
		padding: 2em;
		display: grid;
		align-items: center;
		justify-content: stretch;
		text-align: center;
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
	}
	#body {
		width: 100%;
	}
	#body > h1 {
		font-size: 3em;
	}
	.makeBet {
		display: grid;
		align-items: center;
		grid-template-rows: 1fr 1fr auto;
		gap: 2em;
		transition-duration: 1s;
	}
	button {
		margin: 1em;
		padding: 0.5em;
		font-size: 1em;
	}
</style>