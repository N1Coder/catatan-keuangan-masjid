<script setup></script>

<template>
  <div
    class="print:hidden fixed min-h-screen bg-slate-900/30 backdrop-blur-md inset-0 z-50"
    @click.self="$emit('close')"
  >
    <slot></slot>
  </div>
</template>
