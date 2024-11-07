# debug调试

在sass中，可以通过`@debug` 打印

```scss
$w: 100px;

@debug $w * 100;
.box {
  width: $w * 100;
  height: 123px;
}
```

运行的时候，可以在控制台看到打印结果

```text
src\views\HomeView.vue:4 Debug: 10000px
```

打印多个的时候，可以用括号括起来

```scss
$aa: 1;
$bb: 2;
$cc: 3;
@debug ($aa, $bb, $cc);
```



