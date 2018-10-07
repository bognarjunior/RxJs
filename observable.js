const { Observable } = require('rxjs');

const breadCrumb = new Array();

const observable = Observable.create(function (observer) {
  observer.next('Filmes');
  observer.next('Aventura');
  observer.next('Espacial');
  observer.next('Star Wars');
  observer.complete();
});

observable.subscribe({
  next: link => breadCrumb.push(link),
  error: err => console.error('Mostra se algo der errado: ' + err),
  complete: () => console.log(breadCrumb.join("->"))
});