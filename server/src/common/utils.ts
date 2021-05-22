import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
  console.log('🚀 ~ file: utils.ts ~ line 1 ~ password', password);
  return bcrypt.hashSync(password, 10);
};

export const compareSync = (passwd, samePasswd) =>
  bcrypt.compareSync(passwd, samePasswd);
