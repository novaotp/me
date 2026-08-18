<script lang="ts">
    import * as Accordion from "$components/home/Accordion";
    import Services from "$components/home/Services.svelte";

    const faq = [
        {
            question: "Why do I need a website ?",
            answer: "A website gives you an online presence where your clients can easily find you. It helps you get noticed, attract customers, and showcase what you offer effectively.",
        },
        {
            question: "How can a website help my business grow ?",
            answer: "Websites attract potential customers 24/7, provide valuable information, and create a trustworthy online presence. You can reach audiences well beyond your local market, improve customer communication, and even automate tasks such as scheduling or processing orders.",
        },
        {
            question: "What are the key elements of a successful website ?",
            answer: "A good website should be fast, easy to navigate, and pleasant to view on all screens, including smartphones. Information should be clear and well-presented, and the site should be secure to protect visitors.",
        },
        {
            question: "Can I use a free website builder ?",
            answer: "Yes, you can use a free builder, but there are often limitations. The design will be less unique, you might have ads on your site, and you'll have less control over what you can do. A custom site allows you to have something that truly represents you and can grow with your business.",
        },
        {
            question: "How much does it cost to create a website ?",
            answer: "The cost of a website depends on what you want. A basic informational site is quite affordable, while a more elaborate site, like an online store, will cost more. It's an investment that varies based on your needs and budget.",
        },
        {
            question: "What do I need to do to maintain my website after it's built ?",
            answer: "After your site is created, it’s important to regularly update it, check for security issues to avoid problems, and manage the content to keep it current and relevant. Many people opt for a maintenance plan to ensure everything is handled efficiently and without hassle.",
        },
    ];
</script>

<svelte:head>
    <title>Home - Sajidur Rahman</title>
    <meta
        name="description"
        content="Welcome to My World! Explore my website to learn about my passions, projects, and articles in web development."
    />
</svelte:head>

<main class="relative w-full max-w-[980px] flex flex-col items-center px-10 gap-28 my-10">
    <section class="relative flex flex-col items-start justify-center w-full h-full gap-16">
        <p>Hello, I am Sajidur Rahman.</p>
        <h1
            class="text-3xl leading-snug max-w-[1400px] md:text-4xl md:leading-normal xl:text-5xl xl:leading-relaxed"
        >
            Un développeur axé sur des applications performantes pour une <span
                class="text-indigo-700 dark:text-sky-300"
            >
                satisfaction client optimale
            </span>.
        </h1>
    </section>
    <section class="relative flex flex-col items-center justify-center w-full h-full gap-16">
        <h2 class="w-full text-3xl text-start">Services</h2>
        <Services />
    </section>
    <section class="relative flex flex-col items-start justify-center w-full h-full gap-16">
        <h2 class="text-3xl text-center">FAQ</h2>
        <Accordion.Root class="w-full">
            {#each Object.values(faq) as { question, answer }}
                <Accordion.Item value={question}>
                    <Accordion.Trigger>{question}</Accordion.Trigger>
                    <Accordion.Content>{answer}</Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </section>
</main>
