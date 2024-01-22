<script>
    import "../app.css";
    import Navbar from "$lib/Navbar/Navbar.svelte";
</script>

<div class="relative w-full h-full flex flex-col">
    <main class="relative w-full flex-grow">
        <slot />
    </main>
    <Navbar />
</div>