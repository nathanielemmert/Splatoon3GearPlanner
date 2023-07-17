<script lang="ts">
    import { ability_filenames } from "../../assets/abilityParams";
    import TicketImage from "./TicketImage.svelte";

    export let abilityIds: (string|number)[];
    let ability_filename_array: (string|number)[];
    $:ability_filename_array=abilityIds;
</script>


{#if abilityIds.length===0}
    <b>No tickets needed!</b>

{:else}
    {#each ability_filename_array as ability_filename}
        <TicketImage abilityId={ability_filename.toString()} />
    {/each}
    
{/if}

