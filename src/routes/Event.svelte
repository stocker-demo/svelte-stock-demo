<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const sayHello = () => {
        dispatch('hello', { name: 'world' });
    };

    const sayGoodbye = () => {
        dispatch('goodbye', { name: 'world' });
    };
</script>


<button on:click={sayHello}>
    click to say hello
</button>

<button on:click={sayGoodbye}>
    click to say goodbye
</button>