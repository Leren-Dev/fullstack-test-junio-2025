declare module '@ioc:Adonis/Addons/Hashids' {
  import { NumberLike } from 'hashids/cjs/util'

  export function encode(numbers: string | NumberLike[] | string[]): string
  export function encode(...numbers: NumberLike[]): string
  export function encode(...numbers: string[]): string
  export function decode(id: string): NumberLike[]
  export function encodeHex(inputHex: string | bigint): string
  export function decodeHex(id: string): string
  export function isValidId(id: string): boolean
}
