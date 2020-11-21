<script lang="ts">
    import { getTimePeriods, timePeriodToLabel } from "./TimePeriod";
    import { appState } from "./Stores";
    import { fly } from "svelte/transition";

    let formErrors = [];

    function onSubmit(event: Event) {
        event.preventDefault();
        validate();
        if (formErrors.length === 0) $appState.formSent = true;
    }

    function validate() {
        formErrors = [];
        if (isBlank($appState.albumRequest.user))
            formErrors = [...formErrors, `Username must be provided.`];
    }

    function isBlank(str: string): boolean {
        return !str || str.length === 0;
    }
</script>

<style>
    form {
        margin: 1em;
    }

    form label {
        margin: 1em 0 0 0;
        font-weight: 800;
    }

    .info {
        text-decoration: underline dotted;
    }
</style>

<form on:submit={onSubmit}>
    {#if formErrors.length !== 0}
        <ul id="validation-feedback" transition:fly={{ y: 200, duration: 600 }}>
            {#each formErrors as error}
                <li>{error}</li>
            {/each}
        </ul>
    {/if}

    <label for="username">last.fm username</label>
    <input
        type="text"
        name="username"
        id="username"
        bind:value={$appState.albumRequest.user} />

    <label
        for="min-plays"
        title="number of times you've played songs from that album"
        class="info">
        mininum plays</label>
    <input
        type="number"
        name="min-plays"
        id="min-plays"
        bind:value={$appState.albumRequest.minPlayCount} />

    <label for="period">time period</label>
    <select id="period" bind:value={$appState.albumRequest.period}>
        {#each getTimePeriods() as timePeriod}
            <option value={timePeriod}>{timePeriodToLabel(timePeriod)}</option>
        {/each}
    </select>

    <button type="submit">give me an album!</button>
</form>
