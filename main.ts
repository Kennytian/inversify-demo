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





