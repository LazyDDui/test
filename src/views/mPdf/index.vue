<script setup lang="ts">
import MPdf from "@/components/Phone/MPdf.vue";
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useSeal} from "@/store/useSeal";
const {fileId, sealInfo, docName} = storeToRefs(useSeal());
const pdfUrl = ref("")

const getPdfFile = async () => {
  pdfUrl.value = "http://182.151.13.73:9999" + "/app/file/" + fileId.value;
};

getPdfFile()

</script>

<template>
  <MPdf :pdf-url="pdfUrl"/>
</template>

<style scoped lang="scss">

</style>
