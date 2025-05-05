declare module "react-use-flexsearch" {
  export function useFlexSearch<T = any>(
    query: string,
    index: string,
    store: Record<string, any>
  ): T[]
}