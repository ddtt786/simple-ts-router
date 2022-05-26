## simple ts router

~1.5kb gzipped

### npm

```ts
import { Router } from "simple-ts-router";

const router = new Router();
const title = <HTMLHeadingElement>document.querySelector("#title");

router
  .add("/blog/:id/post/:postid", ({ id, postid }) => {
    title.innerText = `blog ${id} : ${postid}`;
  })
  .add("/", () => {
    title.innerText = "home";
  })
  .add("_404", () => {
    title.innerHTML = "404";
  })
  .check();
```

### web

```ts
import { Router } from "https://cdn.skypack.dev/simple-ts-router?min";

const router = new Router();
const title = <HTMLHeadingElement>document.querySelector("#title");

router
  .add("/blog/:id/post/:postid", ({ id, postid }) => {
    title.innerText = `blog ${id} : ${postid}`;
  })
  .add("/", () => {
    title.innerText = "home";
  })
  .add("_404", () => {
    title.innerHTML = "404";
  })
  .check();
```
