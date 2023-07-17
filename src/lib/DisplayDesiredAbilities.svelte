<script lang="ts">
    import SubAbilityImages from "./ImageTypes/SubAbilityImages.svelte";

    export let desiredAbilities: number[][];

    let hidden: boolean = true;

    function onClick(e: Event) {
        const target = e.target as HTMLButtonElement;
        hidden = !hidden;
    }
</script>

<div class="container">
    <div class="show-hide">
        <label for="toggle">Desired Abilities:</label>
        <button id="toggle" on:click={onClick}>
            {hidden  ? "Show" : "Hide"}
        </button>
    </div>
    <div style={hidden ? "display:none" : ""}>
        {#each desiredAbilities as abilityCombo}
            <div>
                <SubAbilityImages abilityIds={abilityCombo} />
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        border: 3px solid black;
        margin-bottom: 4px;
    }
</style>
