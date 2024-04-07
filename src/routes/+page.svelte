<script lang="ts">
    import { ImagePlaceholder } from "flowbite-svelte";
</script>

<h3>Home</h3>
{#each Array(5) as _, i}
    <ImagePlaceholder />
    <br />
{/each}
