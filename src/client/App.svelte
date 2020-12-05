<script lang="ts">
    import Footer from "./Footer.svelte";
    import Form from "./Form.svelte";
    import Header from "./Header.svelte";
    import Result from "./Result.svelte";
    import { slide } from "svelte/transition";
    import { appState } from "./Stores";
</script>

<style>
    main {
        margin: 0 auto;
    }
</style>

<Header />
<main>
    {#if $appState.formSent}
        <div transition:slide={{ duration: 400 }}>
            <Result />
        </div>
    {:else}
        <div transition:slide={{ duration: 400 }}>
            <Form />
        </div>
    {/if}
</main>
<Footer />
