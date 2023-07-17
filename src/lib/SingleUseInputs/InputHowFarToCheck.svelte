<script lang="ts">

    export let howFarToCheck:number;

    function onChange(e:Event){
        const target = e.target as HTMLInputElement;

        howFarToCheck=parseInt(target.value)+1

    }

</script>

<label for="howFarToCheck">How far to check:</label>
<input id="howFarToCheck" on:change={onChange} type="number" value={howFarToCheck-1} max=50 step=1 width="4em">