
// declare module 'flight' {
//   export enum FlightTypes {
//     ONE_WAY,
//     TWO_WAYS,
//     COMPLEX,
//   }
// }

declare module 'path' {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
