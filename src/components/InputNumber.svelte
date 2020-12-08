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

</style>