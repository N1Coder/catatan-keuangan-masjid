<script setup>
const props = defineProps(["background"])
</script>

<template>
  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 p-4 gap-4"
    :class="background"
  >
    <slot> </slot>
  </article>
</template>
