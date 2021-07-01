import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const compareSync = (passwd, samePasswd) =>
  bcrypt.compareSync(passwd, samePasswd);

export const md5 = (str) => {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};
