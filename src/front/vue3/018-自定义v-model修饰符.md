# 018-自定义v-model修饰符

在vue2中，v-model有几个内置的修饰符
* `v-model.trim`
* `v-model.number`
* `v-model.lazy`

但是vue2无法让我们自定义修饰符，而在vue3中，提供了自定义修饰符的功能


## 1、v-model的自定义修饰符
下面，我们以`v-model.haha`这个修饰符为例子

在父组件:
```vue
<date-picker v-model.haha="applyDate"></date-picker>
```

在子组件，通过`props.modelModifiers`接受到这个修饰符
```vue
interface IModifiers {
    haha: boolean
}
export default defineComponent({
    props: {
        modelValue: String,
        modelModifiers: { type: Object as PropType<IModifiers>, default: () => ({}) } // 默认值的写法
    },
    setup(props) {
        console.log(props.modelModifiers);
    }
}
```
当有传自定修饰符，就会存入`props.modelModifiers`。比如上面的`props.modelModifiers = {haha: true}`

不传则`props.modelModifiers = {}`

接着，就可以根据这个属性做不同的处理
```js
let newVal = props.modelValue+'a ';
if (props.modelModifiers.haha) { // 当外界是v-model.haha的话，就给字符串加上`haha`
    newVal = newVal + 'haha';
}
emit('update:modelValue', newVal )
```


## 2、v-model多个自定义修饰符
也支持多个自定义修饰符。

比如`v-model.haha.yiyi="applyDate"`，则`props.modelModifiers = {haha: true, yiyi: true}`




## 3、非默认值的自定义修饰符
如果不是默认值`modelValue`的，比如`v-model:isShow="isShowPicker"`，则自定义修饰符是`arg + "Modifiers"`
```vue
// 父组件
<date-picker v-model:isShow.haha="applyDate"></date-picker>

// 子组件
props: {
    isShow: String,
    isShowModifiers: { default: () => ({}) }
}
```