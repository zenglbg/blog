import { Service } from "typedi";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Service()
export class Utils {
  salt = "nkdlaf2jop#K$!%$@!%OJDlajfkl-`=40913";

  // public crypto(str: string) {
  //   const hash = crypto.createHash("md5");
  //   hash.update(str);
  //   hash.update(this.salt);
  //   return hash.digest("hex");
  // }
  public token(key: string, user_name: string) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000 + 60 * 60),
        data: {
          user_name,
        },
      },
      key
    );
  }
  public isSame(user_password: string, save_password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        user_password,
        save_password,
        (err: Error, result: boolean) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }
  public crypto(saltRounds: number, user_password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err: Error, salt: string) =>
        !err
          ? bcrypt.hash(user_password, salt, (err: Error, hash: string) => {
              if (err) {
                reject(err);
              } else {
                resolve(hash);
              }
            })
          : reject(err)
      );
    });
  }
}
