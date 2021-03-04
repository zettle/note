# 100-ts封装storage

## 1、代码
```ts
class WebStorage {
    private readonly namePreFix = 'edp-';

    /**
     * 获取完整的keyName名称
     * @param {string} key keyName的值
     * @return {string} 完整的keyName
     */
    private getKeyName (key: string) {
        return `${this.namePreFix}${key}`.toLowerCase();
    }

    /**
     * 要控制的是local还是session
     * @param {boolean} isLocalStorage 要操作的是不是local
     */
    private getLocalOrSession (isLocalStorage: boolean): Storage {
        return isLocalStorage ? localStorage : sessionStorage;
    }

    /**
     * 设置storage
     * @param key {string} 要存储的key
     * @param value {string | object} 要设置的值
     * @param isLocalStorage 是否要用localStorage默认否
     */
    public set (name: string, value: string | object, isLocalStorage = false): void {
        const _storage: Storage = this.getLocalOrSession(isLocalStorage);
        // 再包装一层{value}，为了在get方法中JSON.parse的时候转化为泛型方便
        _storage.setItem(this.getKeyName(name), JSON.stringify({ value }));
    }

    /**
     * 获取storage
     * @param name {string} 要获取的key
     * @param isLocalStorage {boolean} 是否要用localStorage默认否
     * @return <T> | null
     */
    public get<T> (name: string, isLocalStorage = false): T | null {
        const _storage = this.getLocalOrSession(isLocalStorage);
        const resStr = _storage.getItem(this.getKeyName(name));
        if (resStr && resStr !== 'undefined' && resStr !== 'null') {
            try {
                return JSON.parse(resStr).value as T;
            } catch (error) {
                console.log(`JSON.parse转为-${name}-异常`, error);
            }
        }
        return null;
    }

    /**
     * 移除某个缓存
     * @param name {string} 要获取的key
     * @param isLocalStorage {boolean} 是否要用localStorage默认否
     */
    public remove (name: string, isLocalStorage = false): void {
        const _storage: Storage = this.getLocalOrSession(isLocalStorage);
        _storage.removeItem(this.getKeyName(name));
    }

    /**
     * 清除整个缓存
     * @param isLocalStorage {boolean} 是否要用localStorage默认否
     */
    public clear (isLocalStorage = false): void {
        const _storage: Storage = this.getLocalOrSession(isLocalStorage);
        _storage.clear();
    }
}
export default new WebStorage();

```


## 2、遇到的问题
### 2.1 `storage.get()`应该传入一个泛型，约束得到的数据格式

在之前的`get()`是这么写
```ts
public get<T> (name: string, isLocalStorage = false): T | null | string {
    const _storage = this.getLocalOrSession(isLocalStorage);
    const resStr = _storage.getItem(this.getKeyName(name));
    if (!resStr) return null; // 获取不到的直接返回null
    try {
        let resJson: number | T | string = JSON.parse(resStr);
        if (typeof resJson === 'number') {
            resJson = `${resJson}`;
        }
        return resJson as T;
    } catch {
        return resStr; // 会遇到问题不能将类型“string”分配给类型“T | null”
    }
}
```
因为`JSON.parse`得到的是一个`string|null`类型，不能将其强制转为`T`类型，所以在有的场景下显得十分麻烦

比如`stroage.get<CreditFormType>('creditInfo')`就算传入了泛型，得到的是`CreditFormType | string | null`类型，还需要强制转一下`stroage.get<CreditFormType>('creditInfo') as CreditFormType`

**解决方法:**

在`storage.set()`方法里面再将数据包装一层`{value}`，这样有个好处，以后想要扩展有效期的时候也好扩展

然后在`storage.get()`的时候，就是拿`.value as T`返回。这么处理后，得到的就是`T | null`类型了



### 2.2 关于字符串的问题
以前的`storage.set()`是这么写的
```ts
public set (name: string, value: string | object, isLocalStorage = false): void {
    const _storage: Storage = this.getLocalOrSession(isLocalStorage);
    // 再包装一层{value}，为了在get方法中JSON.parse的时候转化为泛型方便
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    _storage.setItem(this.getKeyName(name), value);
}
```
本意是觉得如果存的是string类型，就直接存入，但这么处理的话，`storage.get()`就比较麻烦了

因为下面场景是会报错的
```js
storage.set('name', 'xiaming');
JSON.parse(storage.get('name')); // JSON.parse不能转单引号的字符串
```

**解决方法**

也是在`storage.set()`里面的数据包装一层`{value}`