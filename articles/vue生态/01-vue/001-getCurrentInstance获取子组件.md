# 获取子组件

在vue中，比如有下面代码：

`TheWelcome.vue`代码如下：

```vue
<template>
  <p>这是 TheWelcome</p>
</template>

<script lang="ts" setup>
function say(name: string) {
  console.log('say', name);
}

defineExpose({
  say
})
</script>
```

然后在父组件`HomeView.vue`中使用：

```vue
<template>
  <TheWelcome />
</template>
```

那么在父组件怎么获取子组件呢？可以通过`getCurrentInstance()`这个api

```vue
<template>
  <TheWelcome />
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, type VNode } from 'vue';
import TheWelcome from '../components/TheWelcome.vue';

const instance = getCurrentInstance();
console.log('instance', instance?.subTree);

onMounted(() => {
  console.log('subTree.component==>', instance?.subTree.component); // vue3中将子组件信息放在了subTree这个属性下面
})
</script>
```

需要注意的是，有且只有一个节点的时候，vue3才会放子组件放在`instance?.subTree.component`下面，当有多节点包括注释的时候，vue3就是将子组件信息放在了

```vue
<template>
  <!-- 随便注释点 -->
  <TheWelcome />
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, type VNode } from 'vue';
import TheWelcome from '../components/TheWelcome.vue';

const instance = getCurrentInstance();
console.log('instance', instance?.subTree);

onMounted(() => {
  console.log('subTree.children==>', instance?.subTree.children as VNode[]); // 子组件放在这里，包括了注释也是
  console.log('subTree.component==>', instance?.subTree.component); // underfined
})
</script>
```

在ts中，`instance?.subTree.children` 是一个 `VNode[]` 类型，`instance?.subTree.component` 是一个 `VNode` 类型。

