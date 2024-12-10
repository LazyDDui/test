<!--
 * @Descripttion: 
 * @Author: zheng xinyi
 * @Date: 2024-05-11 11:01:32
 * @LastEditors: zheng xinyi
 * @LastEditTime: 2024-05-11 17:23:57
-->
<template>
	<v-navigation-drawer class="my-4 layout_navigation" :rail="rail" expand-on-hover rail-width="77" v-model="val" style="position: fixed">
		<v-list class="py-4 mx-2 logo" nav>
			<v-list-item rounded :prepend-avatar="logo" class="mx-1" to="/">
				<v-list-item-title class="title">Material UI</v-list-item-title>
				<v-list-item-subtitle>vue-material-admin</v-list-item-subtitle>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>

		<v-list nav class="mx-2" color="primary">
			<v-list-subheader>Examples</v-list-subheader>
			<template v-for="(item, index) in routes" :key="index">
				<v-list-item
					v-if="item.meta?.visible && !item.children"
					:prepend-icon="item.meta?.icon"
					:title="item.meta?.title"
					:to="{ name: item.name }"
					class="mx-1"
					active-class="nav_active"
					rounded="lg"></v-list-item>

				<v-list-group v-if="item.meta?.visible && item.children && item.children.length > 0" class="mx-1">
					<template v-slot:activator="{ props }">
						<v-list-item v-bind="props" :prepend-icon="item.meta?.icon" :title="item.meta?.title" active-class="nav_active" rounded="lg" />
					</template>
					<template v-for="(row, i) in item.children">
						<v-list-item
							v-if="row.meta?.visible"
							:title="row.meta?.title"
							:prepend-icon="rail ? row.meta?.icon : ''"
							:key="i"
							:to="{ name: row.name }"
							rounded="lg" />
					</template>
				</v-list-group>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>
<script lang="ts" setup>
import logo from '@/assets/admin-logo.png'
import type { RouteRecordRaw } from 'vue-router'
import { defineEmits, computed } from 'vue'
const emit = defineEmits(['update:value'])

const props = withDefaults(
	defineProps<{
		rail: boolean
		value?: boolean | null | undefined | any
		routes: readonly RouteRecordRaw[] | any
	}>(),
	{}
)

const val = computed({
	get() {
		return props.value
	},
	set(val: boolean) {
		emit('update:value', val)
	}
})
</script>
