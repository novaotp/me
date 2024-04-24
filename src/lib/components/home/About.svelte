<script lang="ts">
    import LL from '$i18n/i18n-svelte';
</script>

<div class="relative w-full h-full flex lg:grid lg:grid-cols-2 justify-center items-center flex-col gap-10">
    <h2 class="text-center text-3xl lg:hidden">{$LL.homePage.aboutMe.title()}</h2>
    <div class="flex flex-col gap-10">
        <p>{$LL.homePage.aboutMe.studies()}</p>
        <div class="relative flex flex-col gap-2">
            <p>{$LL.homePage.aboutMe.skills.title()}</p>
            <ul class="relative left-10 list-disc">
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>SvelteKit</li>
                <li>Git</li>
                <li>Responsive design</li>
                <li>Design UI/UX</li>
                <li>SEO</li>
                <li>Figma</li>
            </ul>
        </div>
        <p>{$LL.homePage.aboutMe.hobbies()}</p>
        <p>{$LL.homePage.aboutMe.availability()}</p>
    </div>
    <h2 class="text-center text-3xl hidden lg:block">{$LL.homePage.aboutMe.title()}</h2>
</div>

<style>
    p {
        text-align: justify;
    }
</style>
