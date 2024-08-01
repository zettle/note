# pdfjs预览

给一个pdf的url

```ts
const loadingTask = PDFJS.getDocument(url)
loadingTask.promise
    .then(async (pdf: any) => {
})
```

* 先调 `PDFJS.getDocument(url)` 得到一个 `loadingTask` 实例，该实例上的 `promise.then()` 方法返回一个 `pdf实例对象`