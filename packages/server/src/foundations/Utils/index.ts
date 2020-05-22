import * as UUIDV4 from 'uuid/v4';

export const smallUUID = () => UUIDV4().replace(/-/gu, '');

/**
 * 判断是否是指定 js 数据类型
 *
 * @param {string} type 数据类型
 * @param {any} value 需要判断的值
 *
 * @returns {boolean}
 */
export const isType = <T>(type: string) => (value: any): value is T =>
  value !== null &&
  Object.prototype.toString.call(value) === `[object ${type}]`;

export const isObj = isType<object>('Object');
