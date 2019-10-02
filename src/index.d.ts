declare module 'linked-deps' {
  export function isLinked(dependency: string): boolean;

  export function getLinked(pkgPath?: string): string[];

  export function getLinkedPaths(pkgPath?: string): string[];
}
