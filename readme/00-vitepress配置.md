# vitepress配置

## 主题色配置

## vite配置

## 布局模式

vite提供3种布局模式

### doc 文档模式

vitepress会帮助你解析md内容，并且使用自带的样式

```markdown
---
layout: doc
---
```

### page 页面模式

解析md内容，但不会使用自带样式，这种可以由我们自由通过vue组件实现任何页面效果

```markdown
---
layout: page
---
```

### home 首页模式

用在文档首页上

```markdown
---
layout: home
---
```

在首页中修改渐变色，可以在[coolhue](https://webkul.github.io/coolhue/) 拿自己喜欢的渐变

```css
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #fff3b0 10%, #ca26ff 100%);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #fff3b0 10%, #ca26ff 100%);
  --vp-home-hero-image-filter: blur(44px);
}
```
