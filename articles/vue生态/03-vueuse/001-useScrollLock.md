# useScrollLock

控制某个DOM是否滚动锁定，锁定之后就不会出现滚动。

比如我们经常看到的一种效果，但popup出现的时候，让body不要滚动

```ts
// 控制body不要滚动
const isLocked = useScrollLock(document.body);
watch(isPopupShow, (newVal) => {
    isLocked.value = newVal; // true的时候，body就会锁死不出现滚动
});
```

