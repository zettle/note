# match语句

和 `switch...case...case..` 类似，但是必须写下所有条件下的代码。

比如我们产生一个随机数，然后打印下和5对比的情况，如果是 `if` 代码如下：

首先我们使用 `cargo add rand@=0.8.5` 安装下依赖

```rust
use rand::Rng;

fn main() {
  let mut rng = rand::thread_rng();
  let num = rng.gen_range(0..10); // 0-10的随机石
  if num < 5 {
    println!("小于5")
  } else if num == 5 {
    println!("等于5")
  } else {
    println!("大于5")
  }
  println!("{}", num)
}
```

上面是 `if ..else..` 的写法，如果我们改为 `match` 

```rust
let mut rng = rand::thread_rng();
let num = rng.gen_range(0..10); // 0-10的随机石
match num {
  0..=4 => println!("小于5"),  // `0..=4` 的意思是 `从0到4` 
  5 => println!("等于5"),
  _ => println!("大于5") // 最后一个的是`_`，表示其他情况的意思
}
println!("{}", num)
```

在 `match` 中，可以使用 `_` 表示其他意思