/**
 * HAL JSON property 'page'
 */
export default class Page {
  constructor(
    readonly size: number,
    readonly number: number,
    readonly totalElements: number,
    readonly totalPages: number) {}
}
