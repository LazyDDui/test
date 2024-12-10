<script setup lang="ts">
import Part1 from "@/components/views/verify/Part1.vue";
import Part1M from "@/components/views/verify/Part1M.vue";
import {storeToRefs} from "pinia";
import {useMainStore} from "@/store/useMainStore";

type HeaderProps = {
  title: string;
  subtitle: string;
  type?: 'search' | 'default' | 'news';
}

defineProps<HeaderProps>()

const {isMobile} = storeToRefs(useMainStore())

</script>

<template>
  <div style="margin-top: 40px;">
    <Part1 :type="type" v-if="!isMobile" :title="title" :subtitle="subtitle"></Part1>
    <Part1M :type="type" v-else :title="title" :subtitle="subtitle"></Part1M>
  </div>
</template>

<style scoped lang="scss">

</style>
