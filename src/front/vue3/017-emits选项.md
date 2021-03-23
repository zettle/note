# 017-emits选项

vue3提供了emits选项，能让我们对emit的事件和数据进行一定的校验

**这个emits的校验仅仅能让控制台出现warm而已，但不会影响事件的广播**

```vue
// 子组件
export default defineComponent({
    emits: ['change', 'clear'],
    setup (_, {emit}) {
        emit('change'); // 通过
        emit('哈哈'); // 通过，会有warm
    }
})
```

除了数组的写法，也支持JSON的写法
```vue
emits: {
    change: () => {
        return false;
    }
}
```

