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
    flex-direction: column-reverse;
    align-items: center;
}
input {
    font-size: 1em;
}

span {
    flex-grow: 1;
    text-align: end;
    margin-bottom: 0.5em;
}

input {
    flex-grow: 1;
}

</style>