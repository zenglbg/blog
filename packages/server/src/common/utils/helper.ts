import * as bcrypt from 'bcrypt';

/**
 * bcrypt 加密
 *
 * @param {string} value 需要加密的值
 * @param {number} salt 加密的强度 0 - 12
 *
 * @returns string
 */
export function createBcrypt(value: string, salt = 10): string {
  return bcrypt.hashSync(value, bcrypt.genSaltSync(salt));
}

/**
 * 比对输入值与已加密值是否一致
 *
 * @param {string} value 输入值
 * @param {string} hash 已加密的 hash 值
 *
 * @returns boolean
 */
export function verifyBcrypt(value: string, hash: string): boolean {
  return bcrypt.compareSync(value, hash);
}
