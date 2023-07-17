<script lang="ts">
    import { ability_filenames } from "../../assets/abilityParams";

    export let abilityId: string;
</script>

{#if abilityId == "15"}<!-- No Ticket -->
<div class="parent">
    <img class="ticket-icon empty-ticket"src="https://cdn.wikimg.net/en/splatoonwiki/images/c/c3/S2_Icon_Drink_Ticket.png" alt="No Ticket"/>
</div>

{:else}<!-- Normal Ticket -->
    <div class="parent">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="ticket-icon"src="https://cdn.wikimg.net/en/splatoonwiki/images/c/c3/S2_Icon_Drink_Ticket.png"/>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="ability"src={`https://leanny.github.io/splat3/images/skill/${ability_filenames[abilityId]}.webp`}/>
    </div>
{/if}

<style>

    .parent {
        position: relative;
        display: inline;
    }
    .ability{
        height: 36px;
        width: 36px;
        /* background-color: black; */
        /* border-radius: 50%; */
    }

    .ticket-icon {
        height: 30px;
    }

    .ability {
        position: absolute;
        bottom: 0px;
        left: 2px;
    }
    .empty-ticket{
        opacity: 0.1;
    }

   
</style>
