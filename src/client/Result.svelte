<script lang="ts">
    import type { AlbumResponse } from "./AlbumResponse";
    import { slide } from "svelte/transition";
    import type { AlbumRequest } from "./AlbumRequest";
    import { onMount } from "svelte";
    import Circle from "./Circle.svelte";
    import { appState } from "./Stores";

    let albumResponse: Promise<AlbumResponse>;

    onMount(() => {
        albumResponse = getAlbum();
    });

    async function getAlbum(): Promise<AlbumResponse> {
        return await fetch(
            `get-album?user=${$appState.albumRequest.user}`
        ).then((r) => r.json());
    }

    function onImageLoadingError(event) {
        if (event.target.src !== "default-album-cover.png")
            event.target.src = "default-album-cover.png";
    }
</script>

<style>
    #album {
        text-align: left;
        padding: 10px;
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
</style>

<div>
    {#if albumResponse}
        {#await albumResponse}
            <Circle radius={50} />
        {:then response}
            {#if response.error}
                <span>error bro</span>
            {:else}
                <div id="album" transition:slide={{ duration: 400 }}>
                    <h2>{response.album.artist}</h2>
                    <h1>{response.album.name}</h1>
                    <img
                        src={response.album.image}
                        alt={response.album.name}
                        on:error={onImageLoadingError} />

                    <button on:click={() => (albumResponse = getAlbum())}>try
                        again</button>
                    <button
                        class="btn-secondary"
                        on:click={() => ($appState.formSent = false)}>go back</button>
                </div>
            {/if}
        {/await}
    {/if}
</div>
