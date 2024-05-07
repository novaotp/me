<div class="relative w-full flex-grow flex flex-col justify-center items-start gap-3">
    <h3 class="text-xl font-medium flex items-center gap-5">
        <slot name="title" />
    </h3>
    <div class="relative w-14 h-[4px] bg-indigo-700" />
    <p class="text-start text-gray-500">
        <slot name="content" />
    </p>
</div>
