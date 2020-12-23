<svelte:head>
	<title>Bet Up!</title>
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import IfContainerSlideFade from '../components/IfContainerSlideFade.svelte';
import InputNumber from '../components/InputNumber.svelte';
import ServerPlayground from '../components/ServerPlayground.svelte';
import WinChance from '../components/WinChance.svelte';

	/**
	 * User inputs
	 */
	let netWinAmount: number;
	let betAmount: number;

	/**
	 * Trigger fade-in transition on mounting
	 */
	let isMounted = false;
	onMount(()=>isMounted=true)

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
		<div class="makeBet">
			<IfContainerSlideFade
				if_={!betAccepted}
				id="betInputs"
			>
				<IfContainerSlideFade
					if_={isMounted}
				>
					<InputNumber
						bind:value={netWinAmount}
						label="How much you'd like to win?"
						autofocus
						min="0"
					/>
				</IfContainerSlideFade>
				<IfContainerSlideFade
					if_={netWinAmount}
				>
					<InputNumber
						bind:value={betAmount}
						label="How much you'd like to bet?"
						min="0"
					/>
				</IfContainerSlideFade>
			</IfContainerSlideFade>
			<IfContainerSlideFade
				if_={netWinAmount && winChance}
			>
				<WinChance {winChance} {payAmount} />
				<IfContainerSlideFade
					if_={!betAccepted}
				>
					<button id="acceptBet" on:click={acceptBet}>Accept Bet</button>
				</IfContainerSlideFade>
			</IfContainerSlideFade>
			<IfContainerSlideFade
				if_={betAccepted}
			>
				<div class="payment">
					<h4>Pay {betAmount}$ to</h4>
					<code>bc1testtesttesttesttesttesttesttesttesttes</code>
				</div>
				<button on:click={unacceptBet}>Go back</button>
				<button on:click={()=>{}}>Simulate Payment</button>
			</IfContainerSlideFade>
		</div>
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
		align-items: flex-start;
		justify-content: stretch;
		text-align: center;
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
		--winColor: green;
		--loseColor: gray;
		--winColorLight: lightgreen;
		--loseColorLight: lightgray;
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
		transition-duration: 1s;
	}
	:global(#betInputs) {
		display: grid;
		gap: 2em;
		margin-bottom: 2em;
	}
	button {
		padding: 0.5em;
		font-size: 1em;
		margin: 1em;
	}
	button#acceptBet {
		width: 100%;
		margin: 1em 0;
	}
	.payment {
		display: grid;
		margin-top: 2em;
	}
	code {font-size: 0.7em;}
</style>