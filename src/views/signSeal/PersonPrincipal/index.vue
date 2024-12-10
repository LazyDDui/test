<script setup lang="ts">
import {useSeal} from "@/store/useSeal";
import {storeToRefs} from "pinia";

const {setAuth} = useSeal()
const {auth} = storeToRefs(useSeal())


</script>

<template>
<div @click="setAuth('ty');console.log(auth)">1111111</div>
</template>

<style scoped lang="scss">

</style>
