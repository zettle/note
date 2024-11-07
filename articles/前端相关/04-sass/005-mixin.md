# mixin

mixin可以轻松实现scss代码的复用

用 `@mixin` 定义好一个mixin，然后通过 `@include` 引用

```scss
@mixin btn($bgColor: #f00) { // 默认值的写法
  width: 120px;
  background-color: $bgColor;
}

.btn-default {
  @include btn();
}

.btn-default {
  @include btn(#0f0);
}
```

编译后代码：

```css
.btn-default {
  width: 120px;
  background-color: #f00;
}
.btn-default {
  width: 120px;
  background-color: #0f0;
}
```

如果mixin不需要参数，那么括号可以简写

```scss
@mixin btn { // 简写
  width: 120px;
}

.btn {
  @include btn;
}
```



## @content

mixin支持`@content`，可以理解为一个占位符，真正展示的是在`@include`的时候传入的样式

```scss
@mixin btn($bgColor: #f00) { // 默认值的写法
  width: 120px;
  background-color: $bgColor;
  @content;
}

.btn-default {
  @include btn() {
    color: yellow;
  };
}
```

编译之后：

```scss
.btn-default {
  width: 120px;
  background-color: #f00;
  color: yellow;
}
```

示例：利用这个特性，我们可以将媒体查询聚合在一起

```scss
@use 'sass:map';

$breakpoints: (
  'xs': 0,
  'sm': 480px,
  'md': 720px,
  'lg': 960px,
  'xl': 12000px,
);

@mixin xs {
  @media (min-width: map.get($breakpoints, 'xs')) {
    @content;
  }
}

@mixin sm {
  @media (min-width: map.get($breakpoints, 'sm')) {
    @content;
  }
}

@mixin md {
  @media (min-width: map.get($breakpoints, 'xs')) {
    @content;
  }
}

@mixin lg {
  @media (min-width: map.get($breakpoints, 'lg')) {
    @content;
  }
}

@mixin xl {
  @media (min-width: map.get($breakpoints, 'xl')) {
    @content;
  }
}

@mixin breakpoint($bp:0) {
  @media (min-width: $bp) {
    @content;
  }
}

.box-test {
  @include xs {
    color: red;
  }
  @include sm {
    color: yellow;
  }
  @include md {
    color: blue;
  }
  @include lg {
    color: black;
  }
  @include xl {
    color: pink;
  }
  @include breakpoint(1000px) {
    color: orange;
  }
}
```

编译之后：

```scss
@media (min-width: 0) {
    .box-test { color: red; }
}
@media (min-width: 480px) {
    .box-test { color: yellow; }
}
@media (min-width: 0) {
    .box-test { color: blue; }
}
@media (min-width: 960px) {
    .box-test { color: black; }
}
@media (min-width: 12000px) {
    .box-test { color: pink; }
}
@media (min-width: 1000px) {
    .box-test { color: orange; }
}
```

