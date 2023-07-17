<script lang="ts">

    export let alwaysCheckFullTicketDepth:boolean;

    function onChange(e:Event){
        const target = e.target as HTMLInputElement;

        alwaysCheckFullTicketDepth=target.checked

    }
    
    

</script>

<label for="alwaysCheckFullTicketDepth">Always check the full # of tickets:</label>
<input id="alwaysCheckFullTicketDepth" on:change={onChange} type="checkbox" value={alwaysCheckFullTicketDepth} width="4em">