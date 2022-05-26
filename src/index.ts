export class Router {
  routes: { path: string; cb: (params: any) => any }[] = [];

  root: string = "/";

  constructor(root?: string) {
    if (root) this.root = root;
    for (let ls = document.links, i = 0; i < ls.length; i++) {
      ls[i].addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.navigate(ls[i].pathname);
      });
    }
    window.addEventListener("popstate", () => {
      this.check();
    });
  }

  add(path: string, cb: (params: any) => any) {
    this.routes.push({ path, cb });
    return this;
  }

  getFragment(): string {
    let fragment: string;
    fragment = decodeURI(window.location.pathname + window.location.search);
    fragment = this.root !== "/" ? fragment.replace(this.root, "") : fragment;
    return fragment;
  }

  navigate(path: string = "") {
    if (this.getFragment() != path) {
      if (path[0] == ".") {
        window.history.pushState(
          null,
          "",
          this.root +
            this.getFragment() +
            "/" +
            path.replace(this.root, "").slice(1)
        );
      } else {
        window.history.pushState(
          null,
          "",
          this.root + path.replace(this.root, "")
        );
      }
      this.check();
    }
    return this;
  }

  pathCheck(p: string, r: string): boolean {
    let match: boolean = false;
    const path = p.split("/").filter((e) => e !== "");
    const route = r.split("/").filter((e) => e !== "");
    if (path.length == route.length) {
      if (path.length == 0) {
        match = true;
      } else {
        path.forEach((el, i) => {
          if (route[i][0] === ":") {
            match = true;
          } else {
            if (route[i] === el) {
              match = true;
            }
          }
        });
      }
    } else {
      match = false;
    }
    return match;
  }

  check() {
    if (
      this.root == "/" ||
      decodeURI(window.location.pathname + window.location.search)
        .split("/")
        .filter((e) => e !== "")[0] == this.root.replace("/", "")
    ) {
      const current = this.getFragment();
      this.routes.some((route, i: number) => {
        let params: any = {};
        const routePath = this.routes[i].path;
        const match = this.pathCheck(current, routePath);
        if (match) {
          const urlParams = current.split("/").filter((e) => e !== "");
          const routeParams = routePath.split("/").filter((e) => e !== "");
          routeParams.forEach((el, i) => {
            if (el[0] === ":") {
              params[el.slice(1)] = urlParams[i];
            }
          });
          route.cb(params);
          return params;
        } else {
          if (route.path == "_404") {
            route.cb({});
            return {};
          }
        }
      });
    }
  }
}
