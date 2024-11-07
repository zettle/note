# function

在sass中定义函数如下：

```scss
@function say ($color) {
  @return $color;
}

.box {
  color: say(1);
}
```

通过 `@return ` 返回函数值