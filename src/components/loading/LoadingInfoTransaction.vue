<template>
  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <article
      v-for="index in 3"
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div class="h-4 w-3/5 rounded-full bg-slate-300 animate-pulse"></div>
        <div
          class="w-4 aspect-square rounded-full bg-slate-300 animate-pulse"
        ></div>
      </div>

      <div class="mt-5 h-4 w-2/5 rounded-full bg-slate-300 animate-pulse"></div>
    </article>
  </article>
</template>
