<script lang="ts">
    export let radius: number = 100;
    let style = `height: ${radius}px`;
</script>

<style>
    .breathing {
        animation-duration: 3s;
        animation-name: breathing;
        animation-iteration-count: infinite;
    }

    @keyframes breathing {
        from {
            transform: scale3d(0, 0, 0);
        }

        50% {
            transform: scale3d(0.5, 0.5, 0.5);
        }

        to {
            transform: scale3d(0, 0, 0);
        }
    }
</style>

<svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {style}
    class="breathing">
    <circle cx="50" cy="50" r="50" style="fill: var(--primary)" />
</svg>
