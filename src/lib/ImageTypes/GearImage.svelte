<script lang="ts">
    export let gear_filename:string;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img src={`https://leanny.github.io/splat3/images/gear/${gear_filename}.webp`}/>

<style>
    img{
        height: 128px;
        width: 128px;
    }
</style>