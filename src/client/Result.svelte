<script lang="ts">
    import type { AlbumResponse } from "./AlbumResponse";
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";
    import Circle from "./Circle.svelte";
    import { appState } from "./Stores";
    import { timePeriodToValue } from "./TimePeriod";
    import Keydown from "svelte-keydown";

    const BASE_URL = "get-album";

    let albumResponse: Promise<AlbumResponse>;

    onMount(() => {
        albumResponse = getAlbum();
    });

    async function getAlbum(): Promise<AlbumResponse> {
        return await fetch(buildAlbumRequestURL()).then((r) => r.json());
    }

    function buildAlbumRequestURL() {
        const url = new URL(BASE_URL, window.location.href);
        url.searchParams.append("user", $appState.albumRequest.user);

        if ($appState.albumRequest.minPlayCount) {
            url.searchParams.append(
                "minPlayCount",
                $appState.albumRequest.minPlayCount.toString()
            );
        }

        if ($appState.albumRequest.maxPlayCount) {
            url.searchParams.append(
                "maxPlayCount",
                $appState.albumRequest.maxPlayCount.toString()
            );
        }

        if ($appState.albumRequest.period) {
            url.searchParams.append(
                "period",
                timePeriodToValue($appState.albumRequest.period)
            );
        }

        return url.href;
    }
    // TODO: which type is event?
    function onImageLoadingError(event) {
        if (event.target.src !== "default-album-cover.png")
            event.target.src = "default-album-cover.png";
    }
</script>

<style>
    #container {
        display: flex;
        flex-direction: column;
        max-width: var(--max-width);
        padding: 10px;
    }
    img {
        border-radius: var(--border-radius);
        margin: auto;
        transition: 0.1s;
    }

    img:hover {
        transform: translate(-6px, -6px);
        box-shadow: 6px 6px var(--primary);
    }

    h2 {
        color: grey;
        margin-bottom: 0;
        font-size: 18px;
    }

    h1 {
        margin-top: 0;
    }

    #playcount {
        color: var(--primary);
        margin-top: 5px;
    }

    #album {
        text-align: left;
    }
</style>

<Keydown
    on:Enter={() => (albumResponse = getAlbum())}
    on:b={() => ($appState.formSent = false)} />

<div id="container">
    {#if albumResponse}
        {#await albumResponse}
            <Circle radius={50} />
        {:then response}
            {#if response.error}
                <h1>i tried, but i couldn't find anything like that :(</h1>
                <button
                    class="btn-secondary"
                    on:click={() => ($appState.formSent = false)}>go back</button>
            {:else}
                <div id="result" transition:slide={{ duration: 400 }}>
                    <div id="album">
                        <h2>{response.album.artist}</h2>
                        <h1>{response.album.name}</h1>
                    </div>

                    <img
                        src={response.album.image}
                        alt={response.album.name}
                        on:error={onImageLoadingError} />
                    <div id="playcount">{response.album.playcount} plays</div>

                    <button on:click={() => (albumResponse = getAlbum())}>try
                        again</button>
                    <button
                        class="btn-secondary"
                        on:click={() => ($appState.formSent = false)}>go back</button>
                </div>
            {/if}
        {:catch}
            <h1>
                seems like something isn't working... maybe try again later?
            </h1>
            <button
                class="btn-secondary"
                on:click={() => ($appState.formSent = false)}>go back</button>
        {/await}
    {/if}
</div>
