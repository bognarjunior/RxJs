const { Subject } = require('rxjs');

const caminho = new Subject();
const breadCrumb = new Array();

pushBreadCrumb = link => {
  if (breadCrumb.indexOf(link) !== -1) {
    breadCrumb.splice(breadCrumb.indexOf(link), breadCrumb.length)
  }
  breadCrumb.push(link)
}

caminho
.subscribe(
  link => pushBreadCrumb(link)
);

click = (link) => {
  caminho.next(link);
  console.log(breadCrumb.join("->"));
}

click('Filmes');
click('Aventura');
click('Espacial');
click('Star Wars');
console.log(`---------------`);
click('Aventura');
click('Espacial');