# 002-getCurrentInstance获取父组件

## 获取父组件

比如现在有页面组件`HomeView.vue` 如下：

```vue
<template>
    <TheWelcome />
</template>

<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';

defineOptions({
  name: 'HomeView'
})

function say() {
}

defineExpose({
  say
})
</script>
```

而子组件 `TheWelcome.vue` 代码如下，可以通过 `getCurrentInstance().parent` 得到组件的信息，返回的是一个 VNode 类型：

```vue
<template>
  <p>这是 TheWelcome</p>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, type ComponentInternalInstance } from 'vue';

const instance = getCurrentInstance();
onMounted(() => {
  console.log('instance.parent', instance?.parent); // instance?.parent得到父组件
  console.log('父组件的name值', instance?.parent?.type.name);
});
</script>
```

在开发中，往往我们的结构没有那么简单，比如在组件 `TheWelcome.vue` 外多嵌套了另外一个组件 `BoxWarp.vue`

`BoxWarp.vue` 代码如下，一个简单的插槽：

```vue
<template>
  <div class="box-warp">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BoxWarp'
})
</script>
```

然后页面组件 `HomeView.vue` 代码如下：

```vue
<template>
  <box-warp class="haha">
    <!-- 随便注释点 -->
    <TheWelcome />
  </box-warp>
</template>

<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import BoxWarp from '../components/BoxWarp.vue';

defineOptions({
  name: 'HomeView'
})
function say() {}

defineExpose({
  say
})
</script>
```

那么在子组件中，就需要通过`instance?.parent.parent` 一层层往上。

需要递归向上找到指定的组件，因此可以封装个函数

```vue
<script lang="ts" setup>
import { getCurrentInstance, onMounted, type ComponentInternalInstance } from 'vue';

const instance = getCurrentInstance();
onMounted(() => {
  const target = findParentComponent(instance, 'HomeView');
  console.log("🚀 ~ onMounted ~ target:", target)
})

// 封装一个函数：往上递归需要指定的父组件
function findParentComponent (instance: ComponentInternalInstance | null, componentName: string) {
  let parentInstance = instance?.parent;
  while (parentInstance) {
    if (parentInstance.type.name === componentName) {
      return parentInstance;
    }
    parentInstance = parentInstance.parent;
  }
  return null;
}
</script>
```

## 获取根组件

通过 `getCurrentInstance().root` 可以方便的直接获取vue中唯一的根组件（一般就是我们的 `App.vue`）组件

```vue
<script lang="ts" setup>
const instance = getCurrentInstance();
onMounted(() => {
  console.log('root', instance?.root);
})
</script>
```

获取根组件不想 `getCurrentInstance().parent` 一样受组件嵌套影响

