<script setup lang="ts">
import MPdf from "@/components/Phone/MPdf.vue";
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useSeal} from "@/store/useSeal";
import {baseUrl} from "@/utils/common";
const {fileId, sealInfo, docName} = storeToRefs(useSeal());
const pdfUrl = ref("")

const getPdfFile = async () => {
  pdfUrl.value = baseUrl + "/app/file/" + fileId.value;
};

getPdfFile()

</script>

<template>
  <MPdf :pdf-url="pdfUrl"/>
</template>

<style scoped lang="scss">

</style>
