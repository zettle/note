<template>
    <div>
        <p>通过设置元数据 `{ layout: page; sidebar: false }`隐藏侧边栏</p>
        <p>然后引入vue组件实现整个页面完全自定义开发</p>
    </div>
    <div>
        <el-button @click="handleAdd">累加</el-button>
        <p>count: {{ count }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(1);
function handleAdd() {
    count.value++;
}
</script>
