<script lang="ts">
import { getPercentageString } from "../helpers/getPorcentageString";

    export let winChance: number;
    export let payAmount: number;
    export let betAmount: number;
</script>


<h1>Overview</h1>
<div class="overview-bet">
    <span>Win chance:</span>{getPercentageString(winChance)}
    <span>We pay:</span>{payAmount}
    <span>You pay:</span>{betAmount}
</div>
<div class="payment">
    <h4>Pay to</h4>
    <code>bc1testtesttesttesttesttesttesttesttesttes</code>
</div>

<style>
	.overview-bet {
		display: grid;
		grid-template-columns: auto auto;
		text-align: start;
		column-gap: 1em;
		font-size: 1.3em;
	}
	span {
		text-align: end;
	}
	.payment {
		margin-top: 2em;
		display: grid;
		gap: 1em;
	}
	h4 {margin: 0;}
	code {font-size: 0.7em;}
</style>