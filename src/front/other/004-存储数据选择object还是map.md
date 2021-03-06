# 004-存储数据选择object还是map

[资料](https://mp.weixin.qq.com/s/vRHwFkz_iHmePuFBAcdR-Q)

使用 Map：
* 储存的键不是字符串/数字/或者 Symbol 时，选择 Map，因为 Object 并不支持
* 储存大量的数据时，选择 Map，因为它占用的内存更小
* 需要进行许多新增/删除元素的操作时，选择 Map，因为速度更快
* 需要保持插入时的顺序的话，选择 Map，因为 Object 会改变排序
* 需要迭代/遍历的话，选择 Map，因为它默认是可迭代对象，迭代更为便捷


使用 Object：
* 只是简单的数据结构时，选择 Object，因为它在数据少的时候占用内存更少，且新建时更为高效
* 需要用到 JSON 进行文件传输时，选择 Object，因为 `JSON.stringify` 不默认支持 Map
* 需要对多个键值进行运算时，选择 Object，因为句法更为简洁
* 需要覆盖原型上的键时，选择 Object
* 虽然 Map 在很多情况下会比 Object 更为高效，不过 Object 永远是 JS 中最基本的引用类型，它的作用也不仅仅是为了储存键值对。