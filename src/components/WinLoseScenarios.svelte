<script lang="ts">
import { getPercentageString } from "../helpers/getPorcentageString";
import ShowValue from "./ShowValue.svelte";

    export let winChance: number;
    export let loseChance: number;
    export let netWinAmount: number;
    export let betAmount: number;

    $: payAmount = netWinAmount + betAmount;
</script>

<div class="winLoseScenarios box">
    <div class="win" title={winChance.toString()}>
        <ShowValue label="Win chance" value={getPercentageString(winChance)}/>
        <progress value={winChance}/>
        <span>+{netWinAmount}</span>
        <span>(We pay {payAmount})</span>
    </div>
    <div class="lose" title={loseChance.toString()}>
        <ShowValue label="Lose chance" value={getPercentageString(loseChance, false)}/>
        <progress value={loseChance}/>
        <span>-{betAmount}</span>
    </div>
</div>

<style>
	.winLoseScenarios {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.winLoseScenarios > div {
		display: grid;
		border-radius: 1em;
		box-sizing: border-box;
		width: calc(50% - 0.5em);
		padding: 1em;
		align-content: flex-start;
	}
	.winLoseScenarios > div > progress + span {
		font-size: 1.5em;
	}
	.winLoseScenarios > div > span + span {
		font-size: 0.6em;
	}
	.winLoseScenarios > div > progress {
		border: 0;
	}
	.win {
		border: var(--winColorLight) solid;
		background-color: var(--winColorLight);
	}
	.win > progress {
		width: 100%;
	}
	.win progress::-webkit-progress-value,
	.win progress::-moz-progress-bar {
		background-color: var(--winColor);
	}
	.lose {
		border: var(--loseColorLight) solid;
		background-color: var(--loseColorLight);
	}
	.lose > progress {
		width: 100%;
	}
	.lose progress::-webkit-progress-value,
	.lose progress::-moz-progress-bar {
		background-color: var(--loseColor);
	}
</style>