const { from } = require('rxjs');
const { first, last } = require('rxjs/operators');

const source = from(['Corinthians', 'Palmeiras', 'São Paulo', 'Santos']);
const firstValue = source.pipe(first());
const lastValue = source.pipe(last());
firstValue.subscribe(val => console.log(`Primeiro Valor: ${val}`));
lastValue.subscribe(val => console.log(`Último Valor: ${val}`));
