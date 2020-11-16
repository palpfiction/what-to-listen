<script lang="ts">
    import type { AlbumRequest } from "./AlbumRequest";
    import { getTimePeriods, timePeriodToLabel } from "./TimePeriod";
    import { appState } from "./Stores";

    function onSubmit(event: Event) {
        event.preventDefault();
        $appState.formSent = true;
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
