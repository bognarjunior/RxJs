const { Subject } = require('rxjs');

const path = new Subject();
const breadcrumb = new Array();

pushBreadcrumb = link => {
  if (breadcrumb.indexOf(link) !== -1) {
    breadcrumb.splice(breadcrumb.indexOf(link), breadcrumb.length)
  }
  breadcrumb.push(link)
}

path
.subscribe(
  link => pushBreadcrumb(link)
);

click = (link) => {
  path.next(link);
  console.log(breadcrumb.join("->"));
}

click('Filmes');
click('Aventura');
click('Espacial');
click('Star Wars');
console.log(`---------------`);
click('Aventura');
click('Espacial');