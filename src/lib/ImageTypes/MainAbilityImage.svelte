<script lang="ts">
    import { ability_filenames } from "../../assets/abilityParams";

    export let abilityId:string;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img src={`https://leanny.github.io/splat3/images/skill/${ability_filenames[abilityId]}.webp`}/>

<style>
    img{
        height: 64px;
        width: 64px;
        background-color: black;
        border-radius: 50%;
    }
</style>
