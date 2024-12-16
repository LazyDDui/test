<script setup lang="ts">
import { onMounted } from "vue";
import { fabric } from "fabric";

let canvas: fabric.Canvas;

onMounted(() => {
  // 初始化 Fabric.js 画布
  canvas = new fabric.Canvas("canvas", {
    width: 600,
    height: 400
  });

  // 定义一个矩形
  const rect = new fabric.Rect({
    left: 275, // 设置矩形水平居中
    top: 50, // 初始纵向位置
    fill: "red",
    width: 50,
    height: 50,
    originX: "center",
    originY: "center"
  });

  // 添加矩形到画布
  canvas.add(rect);

  // 禁止横向移动，限制垂直移动范围
  canvas.on("object:moving", options => {
    const obj = options.target;

    // 禁止横向移动
    obj.set("left", 275); // 固定 `left` 值

    // 确保矩形始终完全显示在画布内
    const halfHeight = obj.height! / 2; // 矩形的一半高度

    // 如果顶部超出画布，调整 `top` 值
    if (obj.top! < halfHeight) {
      obj.set("top", halfHeight);
    }

    // 如果底部超出画布，调整 `top` 值
    const maxTop = canvas.height - halfHeight; // 画布允许的最大 `top`
    if (obj.top! > maxTop) {
      obj.set("top", maxTop);
    }

    // 更新画布渲染
    canvas.renderAll();
  });
});
</script>

<template>
  <canvas id="canvas" />
</template>

<style scoped>
/* 画布边框样式 */
canvas {
  border: 1px solid #ccc;
}
</style>
