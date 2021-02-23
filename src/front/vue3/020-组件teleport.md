# 020-组件teleport

称为“传送门”组件

## 1、场景

在vue2中，我们定义一个弹窗组件Alter.vue
```html
<div class="alert-box" v-if="isShow">
    <span class="close" @click="$emit('update:isShow', !isShow)">X</span>
    this is alter component
</div>
```

然后在父组件引用，子组件的html结构是在父组件里面，但是我们往往想要放在body上
```html
<teleport to="body">
    <div class="alert-box" v-if="isShow">
        <span class="close" @click="$emit('update:isShow', !isShow)">X</span>
        this is alter component
    </div>
</teleport>
```
vue会通过`document.querySelect()`查到上面的to指定的DOM

![](./img/telep.png)



## 2、属性
`<teleport />`上有个属性disabled，设置为true表示禁止传送门功能，那就和普通组件一样的展示方式
```html
<teleport to="body" :disabled="true">
    ...
</teleport>
```
