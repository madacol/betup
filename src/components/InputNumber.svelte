<script lang="ts">
    export let value: string|number|undefined;
    export let label: string;
</script>

<label>
    <input
        bind:value
        on:change
        {...$$restProps}
        type="number"
    >
    <span>{label}&nbsp;</span>
</label>

<style>

label {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
}

span {
    flex-grow: 1;
    text-align: end;
}

input {
    flex-grow: 1;
}

input:checked + span {
    background-color: var(--navBackgroundColor);
}

input:focus + span {
    box-shadow: 0 0 1px var(--navBackgroundColor);
}

input:checked + span:before {
    -webkit-transform: translateX(1em);
    -ms-transform: translateX(1em);
    transform: translateX(1em);
}
</style>