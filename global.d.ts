declare global {
    interface ResType<T, U = false> {
        data: T extends null ? never : T
        code: number
        message: string | null
        totalCount?: U extends true ? number : never
    }
}
export {}
