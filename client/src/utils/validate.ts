export interface Rule {
  validator: Function;
  errorMsg: string;
  params?: Array<any>;
}

export class Validator {
  // 缓存校验函数
  private _validators = [];
  // 缓存错误信息
  public _errorMsg = [];

  public add(val: any, rules: Array<Rule>) {
    this._errorMsg.length = 0;
    for (let rule of rules) {
      let { validator, errorMsg = "", params = [] } = rule;
      this._validators.push(() => {
        params.unshift(val);
        console.log(val);
        return validator.apply(null, params);
      });
      this._errorMsg.push(errorMsg);
    }
    return this;
  }

  public validate() {
    for (let validate_index in this._validators) {
      let result = this._validators[validate_index]();
      if (result) {
        return this._errorMsg[validate_index];
      }
    }
    return true;
  }
}

export class ValidatorUtils {
  public static isNotEmpty = (val: any) => val !== "";
  public static isNumber = (val: any) => /^[0-9]$/.test(val);
  public static isBetween = (val: number, min: number, max: number) => {
    if (max === undefined) {
      max = Number.MAX_VALUE;
    }
    if (min === undefined) {
      min = Number.MIN_VALUE;
    }
    return val > min && val < max;
  };
  public static isEmail = (val: string) => {
    console.log(val);
    return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
  };
}
