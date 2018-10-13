const { Subject, from } = require('rxjs');
const { filter, take, distinct, skipWhile, merge } = require('rxjs/operators');

class Pizza {
  constructor(name) {
    this.name = name;
  }
}

class PizzaSalagada extends Pizza {
  constructor(name) {
    super(name);
    this.type = 'Salgada'
  }
}

class PizzaDoce extends Pizza {
  constructor(name) {
    super(name);
    this.type = 'Doce'
  }
}

const pessoa2 = new Subject();
const pessoa3 = new Subject();

const pizzasPessoa1 = new Array();
const pizzasPessoa2 = new Array();
const pizzasPessoa3 = new Array();

const calabresa = new PizzaSalagada('Calabresa');
const mussarela = new PizzaSalagada('Mussarela');
const portuguesa = new PizzaSalagada('Portuguesa');
const aliche = new PizzaSalagada('Aliche');
const frango = new PizzaSalagada('Frango');
const pepperoni = new PizzaSalagada('Pepperoni');
const quatroQueijos = new PizzaSalagada('Quatro queijos');
const vegetariana = new PizzaSalagada('Vegetariana');

const prestigio = new PizzaDoce('Prestigio');
const chocolate = new PizzaDoce('Chocolate');
const romeuJulieta = new PizzaDoce('Romeu e Julieta');

const pizzas = [
  calabresa,
  mussarela,
  calabresa,
  portuguesa,
  aliche,
  frango,
  portuguesa,
  calabresa,
  portuguesa,
  pepperoni,
  quatroQueijos,
  vegetariana,
  chocolate,
  prestigio,
  romeuJulieta,
  prestigio,
  chocolate,
];

pizzasSalgadas = (pizza$) => pizza$.pipe(
  filter(pizza => (pizza.type === 'Salgada' && pizza.name !== 'Mussarela')),
  distinct(),
  take(3)
);

pizzasDoces = (pizza$) => pizza$.pipe(
  filter(pizza => pizza.type === 'Doce'),
  take(3)
);

const sourcePizzas$ = from(pizzas);
const salgadas$ = pizzasSalgadas(sourcePizzas$);
const doces$ = pizzasDoces(sourcePizzas$);

salgadas$.pipe(merge(doces$)).subscribe(
  pizza => pizzasPessoa1.push(pizza)
);

/*
pessoa1Salgada
.pipe(
  filter(pizza => pizza.type === 'Salgada' && pizza.name !== 'Mussarela'),
  take(5)
).subscribe(
  pizza => pizzasPessoa1.push(pizza),
);

pessoa1Doce
.pipe(
  filter(pizza => pizza.type === 'Doce'),
  take(3)
).subscribe(
  pizza => pizzasPessoa1.push(pizza),
); */

pessoa2
.pipe(
  skipWhile(pizza => pizza.type === 'Salgada')
)
.subscribe(
  pizza => pizzasPessoa2.push(pizza)
);

pessoa3
.pipe(
  distinct()
)
.subscribe(
  pizza => pizzasPessoa3.push(pizza)
);

setPizza = (pizza) => {
  pessoa2.next(pizza);
  pessoa3.next(pizza);
}

pizzas.forEach(pizza => setPizza(pizza));

console.log(`pizzasPessoa1: ${JSON.stringify(pizzasPessoa1, null, 2)}`);
console.log(`pizzasPessoa2: ${JSON.stringify(pizzasPessoa2, null, 2)}`);
console.log(`pizzasPessoa3: ${JSON.stringify(pizzasPessoa3, null, 2)}`);