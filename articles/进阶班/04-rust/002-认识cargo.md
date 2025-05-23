# 认识cargo

cargo是rust的包管理器，类似node中的npm的作用。

- `cargo new`：新建项目
- `cargo run`：运行项目
- `cargo check`：检查项目语法
- `cargo build`：构建项目

### 创建项目

在 cmd 执行 `cargo new <项目名称>` 即可创建，这条命令其实完整是 `cargo new --bin <项目名称>`，`--bin` 可以省略

```text
├───📁 src/
│   └───📄 main.rs
├───📄 .gitignore
├───📄 Cargo.lock  # 由toml生成的
└───📄 Cargo.toml  # 管理依赖的
```

如果我们想要开发的是一个库，可以执行 `cargo new --lib <文件夹名>`，这种创建出来的是一个第3方库，以后可以发布市场。







### 运行项目

执行 `cargo run` 会自动编译然后执行看到结果

![image-20250409214217245](img/002-helloworld/image-20250409214217245.png)

### 构建项目

接着执行 `cargo build` 可以看到下面结果说明构建成功

```text
E:\workspace\rust-learn\hello>cargo build
   Compiling hello v0.1.0 (E:\workspace\rust-learn\hello)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 1.53s
```

构建的结果放在 `./target/debug/hello.exe` ，在cmd执行

```shell
cd target\debug
hello.exe
```

![image-20250409211003692](img/002-helloworld/image-20250409211003692.png)

如果执行 `carge build --release` 将打包出更小体积的包（去掉了debug信息）生成在 `./target/release` 目录中。

有时候，我们希望实现这种效果，当用户执行 `cargo run` 的时候，就打印一些 `debug` 信息，而当用户执行 `cargo run --release` 就不要打印信息。

可以通过 `cfg!(debug_assertions)` 来实现，代码如下：

```rust
if cfg!(debug_assertions) {
  println!("debug: 某些信息");
}
```

### 快速检查

当项目大了后，`cargo run` 和 `cargo build` 不可避免的会变慢，这个时候就需要 `cargo check`

`cargo check` 它的作用很简单：快速的检查一下代码能否编译通过。因此该命令速度会非常快，能节省大量的编译时间

### Cargo.toml

记录了项目的meta元数据，

```toml
[package]
name = "hello"
version = "0.1.0"
edition = "2024"

[dependencies]
```

- `name`：项目名称
- `version`：定义当前版本
- `edition`：定义了我们使用的 Rust 大版本，[rust版本说明](https://course.rs/appendix/rust-version.html)

### Cargo.lock

根据 `cargo.toml` 自动生成的，一般我们不自动改这个文件。