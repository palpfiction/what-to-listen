<script lang="ts">
    import type { AlbumResponse } from "./AlbumResponse";
    import { slide } from "svelte/transition";
    import type { AlbumRequest } from "./AlbumRequest";
    import { onMount } from "svelte";
    import Circle from "./Circle.svelte";
    import { appState } from "./Stores";
    import { timePeriodToValue } from "./TimePeriod";
    import type { response } from "express";

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

        if ($appState.albumRequest.period) {
            url.searchParams.append(
                "period",
                timePeriodToValue($appState.albumRequest.period)
            );
        }

        return url.href;
    }

    function onImageLoadingError(event) {
        if (event.target.src !== "default-album-cover.png")
            event.target.src = "default-album-cover.png";
    }
</script>

<style>
    #result {
        padding: 10px;
    }

    #album {
        text-align: left;
    }

    img {
        border-radius: 4px;
        margin: auto;
        display: block;
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
        display: block;
        color: var(--primary);
        margin-top: 5px;
    }
</style>

<div>
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
                    <span id="playcount">{response.album.playcount} plays</span>

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
