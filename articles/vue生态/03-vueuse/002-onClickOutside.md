# onClickOutside

当点击某个DOM以外的元素的时候，触发事件

```ts
const containerTarget = ref<HTMLDivElement>();
onClickOutside(containerTarget, () => {
    console.log('点了 div 以外的DOM')
});
```

