export declare class Router {
    routes: {
        path: string;
        cb: (params: any) => any;
    }[];
    root: string;
    constructor(root?: string);
    add(path: string, cb: (params: any) => any): this;
    getFragment(): string;
    navigate(path?: string): this;
    pathCheck(p: string, r: string): boolean;
    check(): void;
}
