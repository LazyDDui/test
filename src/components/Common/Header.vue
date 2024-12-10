<script setup lang="ts">
import Part1 from "@/components/views/verify/Part1.vue";
import Part1M from "@/components/views/verify/Part1M.vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";

type HeaderProps = {
  title: string;
  subtitle: string;
  type?: "search" | "default" | "news";
};

defineProps<HeaderProps>();

const { isMobile } = storeToRefs(useMainStore());
</script>

<template>
  <div style="margin-top: 40px">
    <Part1 v-if="!isMobile" :type="type" :title="title" :subtitle="subtitle" />
    <Part1M v-else :type="type" :title="title" :subtitle="subtitle" />
  </div>
</template>

<style scoped lang="scss"></style>
