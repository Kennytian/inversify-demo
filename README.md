## 学习 inversify 只需要 4 步

### 一、安装依赖

`mkdir inversify-demo && cd inversify-demo && yarn init -y && yarn add reflect-metadata inversify typescript -S && yarn add ts-node-dev -D`

### 二、编写 TypeScript 代码：
main.ts
```typescript
import 'reflect-metadata';
import {Container, inject, injectable} from "inversify";

interface Animal {
  say(): string;

  eat(name: string): string;
}

@injectable()
class Dog implements Animal {
  public say(): string {
    return '我是旺财，汪汪';
  }

  eat(name: string): string {
    return `我爱吃${name}`;
  }
}

@injectable()
class Cat implements Animal {
  public say(): string {
    return `I'm kitten, Meow`;
  }

  eat(name: string): string {
    return `My favorite food is ${name}`;
  }
}

const TYPES = {
  Dog: Symbol.for('Dog'),
  Cat: Symbol.for('Cat'),
  Entry: Symbol.for('Entry')
}

@injectable()
class Entry {
  private dog: Animal;
  private cat: Animal;

  constructor(@inject(TYPES.Dog) gou: Animal, @inject(TYPES.Cat) mao: Animal) {
    this.dog = gou;
    this.cat = mao;
  }

  hello() {
    return this.dog.say();
  }

  food() {
    return this.dog.eat('甜甜的狗粮');
  }

  helloTogether() {
    return this.dog.say() + '---' + this.cat.say();
  }
}


const MyContainer = () => {
  const myContainer = new Container();
  myContainer.bind<Animal>(TYPES.Dog).to(Dog);
  myContainer.bind<Animal>(TYPES.Cat).to(Cat);
  myContainer.bind<Entry>(TYPES.Entry).to(Entry);
  return myContainer;
}

// 单独运行
// const animal1 = MyContainer().get<Animal>(TYPES.Dog);
// console.log(animal1.eat('骨头'));
// console.log(animal1.say());
// const animal2 = MyContainer().get<Animal>(TYPES.Cat);
// console.log(animal2.eat('fish'));
// console.log(animal2.say());

// 一起来
const wrap = MyContainer().get<Entry>(TYPES.Entry);
console.log(wrap.hello())
console.log(wrap.food())
console.log(wrap.helloTogether())
```

### 三、配置 TypeScript 环境
tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ES6", "dom"],
    "module": "CommonJS",
    "moduleResolution": "Node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

### 四、配置 package.json 的 scripts 命令
`"start": "ts-node-dev --respawn --transpile-only --poll main.ts"`

yarn start

源码地址： https://github.com/Kennytian/inversify-demo

