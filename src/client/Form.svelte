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
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        max-width: 300px;
        gap: 1em;
    }

    form label {
        font-weight: 800;
    }

    .info {
        text-decoration: underline dotted;
    }

    .playcount {
        grid-column: auto / span 2;
    }

    .field,
    #validation-feedback {
        grid-column: auto / span 4;
    }

    #time-period {
        grid-column: 2 / span 2;
    }

    input,
    select {
        margin: 0.5em 0;
        border: none;
        background-color: #f0f0f0;
        border-radius: 5px;
        outline: none;
        transition: 0.1s;
        color: #555;
        width: 100%;
    }

    input:focus,
    select:focus {
        transform: translate(-4px, -4px);
        box-shadow: 4px 4px var(--primary);
    }

    input:disabled,
    select:disabled {
        color: #ccc;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type="number"] {
        -moz-appearance: textfield; /* Firefox */
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
    <div class="field">
        <label for="username">last.fm username</label>
        <input
            type="text"
            name="username"
            id="username"
            bind:value={$appState.albumRequest.user} />
    </div>

    <div class="playcount">
        <label
            for="min-plays"
            title="number of times you've played songs from that album"
            class="info">
            Mininum plays</label>
        <input
            type="number"
            name="min-plays"
            id="min-plays"
            bind:value={$appState.albumRequest.minPlayCount} />
    </div>

    <div class="playcount">
        <label
            for="max-plays"
            title="number of times you've played songs from that album"
            class="info">
            Maximum plays</label>
        <input
            type="number"
            name="max-plays"
            id="max-plays"
            bind:value={$appState.albumRequest.maxPlayCount} />
    </div>

    <div id="time-period" class="field">
        <label for="period">Time period</label>
        <select id="period" bind:value={$appState.albumRequest.period}>
            {#each getTimePeriods() as timePeriod}
                <option value={timePeriod}>
                    {timePeriodToLabel(timePeriod)}
                </option>
            {/each}
        </select>
    </div>

    <button type="submit" class="field">give me an album!</button>
</form>
