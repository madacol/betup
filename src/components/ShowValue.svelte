<script lang="ts">
    export let value: string|number|undefined;
    export let label: string;
</script>

<h4>{label}</h4>
<span>{value}</span>

<style>
    span {
        font-size: 1.5em;
    }
</style>