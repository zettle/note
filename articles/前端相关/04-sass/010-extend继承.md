# extend继承

`@extend`可以在scss中实现一个样式的继承

```scss
.box-test {
  color: red;
}

.box-test-1 {
  @extend .box-test;
}
```

编译之后

```css

```

