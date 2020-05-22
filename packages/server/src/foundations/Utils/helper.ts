/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 拓展 helper
|
*/

import { createHash } from 'crypto';
import * as path from 'path';
import { isObject } from 'util';

import * as dayjs from 'dayjs';
import * as bcryptjs from 'bcryptjs';

export default {
  /**
   * bcryptjs 加密
   *
   * @param {string} value 需要加密的值
   * @param {number} salt 加密的强度 0 - 12
   *
   * @returns string
   */
  createBcrypt(value: string, salt = 10): string {
    return bcryptjs.hashSync(value, bcryptjs.genSaltSync(salt));
  },
};
