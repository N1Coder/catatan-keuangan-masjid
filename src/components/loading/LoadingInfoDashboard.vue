<script setup>
const props = defineProps(["count", "colspan"])
</script>

<template>
  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <article
      v-for="index in count"
      class="shadow-sharp border-[3px] border-black bg-white dark:bg-slate-800 p-4 rounded-lg"
      :class="colspan && index === 1 && 'md:col-span-2'"
    >
      <div class="flex items-center justify-between">
        <div
          class="h-4 lg:h-5 w-3/5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
        ></div>
        <div
          class="w-4 aspect-square rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
        ></div>
      </div>

      <div
        class="mt-5 h-4 lg:h-5 w-2/5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
      ></div>
    </article>
  </article>
</template>
