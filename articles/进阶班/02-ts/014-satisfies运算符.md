# satisfies运算符

`satisfies`运算符用来检测某个值是否符合指定类型。有时候，不方便将某个值指定为某种类型，但是希望这个值符合类型条件，这时候就可以用`satisfies`运算符对其进行检测。[TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) 添加了这个运算符。

举例来说，有一个对象的属性名拼写错误。

```ts
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255] // 属性名拼写错误
};
```

上面示例中，对象 `palette` 的属性名拼写错了，将 `blue` 拼成了 `bleu`，我们希望通过指定类型，发现这个错误。

```ts
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255] // 报错
};
```

上面示例中，变量 `palette` 的类型被指定为 `Record<Colors, string|RGB>`，这是一个类型工具，用来返回一个对象，本例的`Record<Colors, string|RGB>`，就表示变量 `palette` 的属性名应该符合类型 `Colors`，属性值应该符合类型 `string | RGB`，属性名 `bleu`不 符合类型 `Colors`，所以就报错了。

这样的写法，虽然可以发现属性名的拼写错误，但是带来了新的问题。

```ts
const greenComponent = palette.green.substring(1, 6); // 报错
```

上面示例中，`palette.green `属性调用 `substring()` 方法会报错，原因是这个方法只有字符串才有，而 `palette.green` 的类型是 `string | RGB`，除了字符串，还可能是元组 `RGB`，而元组并不存在 `substring()` 方法，所以报错了。

如果要避免报错，要么精确给出变量 `palette` 每个属性的类型，要么对 `palette.green` 的值进行类型缩小。两种做法都比较麻烦，也不是很有必要。

这时就可以使用 `satisfies` 运算符，对 `palette` 进行类型检测，但是不改变 TypeScript 对 `palette` 的类型推断。

```ts
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255] // 报错
} satisfies Record<Colors, string|RGB>;

const greenComponent = palette.green.substring(1); // 不报错
```

上面示例中，变量 `palette` 的值后面增加了 `satisfies Record<Colors, string|RGB>`，表示该值必须满足 `Record<Colors, string|RGB>` 这个条件，所以能够检测出属性名 `bleu` 的拼写错误。同时，它不会改变 `palette` 的类型推断，所以，TypeScript 知道 `palette.green` 是一个字符串，对其调用`substring()`方法就不会报错。

`satisfies` 也可以检测属性值。

```ts
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0] // 报错
} satisfies Record<Colors, string | RGB>;
```

上面示例中，属性 `blue` 的值只有两个成员，不符合元组 `RGB` 必须有三个成员的条件，从而报错了。