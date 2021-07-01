import { Injectable } from '@nestjs/common';
import { ajax } from 'src/common/fetch';

@Injectable()
export class WeixinService {
  appid = 'wxc96bf44363295aad';
  appSecret = 'a343236789dd4927130607266a1c1fd6';

  getSession(body) {
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 7 ~ UserController ~ findAll ~ body',
      body,
    );
    const { code } = body;
    return Promise.all([
      ajax(`https://api.weixin.qq.com/sns/jscode2session`, {
        method: 'get',
        params: {
          appid: this.appid,
          secret: this.appSecret,
          js_code: code,
          grant_type: 'authorization_code',
        },
      }),
      ajax(`https://api.weixin.qq.com/cgi-bin/token`, {
        method: 'get',
        params: {
          grant_type: 'client_credential',
          appid: this.appid,
          secret: this.appSecret,
        },
      }),
    ]).then(([login, token]) => {
      console.log(
        '🚀 ~ file: weixin.service.ts ~ line 34 ~ WeixinService ~ ]).then ~ login, token',
        login,
        token,
      );
      this.getUserInfo({
        openid: login.openid,
        access_token: token.access_token,
      });
      return {
        code: 200,
        msg: '成功',
        data: {
          login,
          token,
        },
      };
    });
  }

  getUserInfo(params: { access_token: string; openid: string }) {
    ajax(`https://api.weixin.qq.com/wxa/getpaidunionid`, {
      method: 'GET',
      params,
    }).then((res) => {
      console.log(
        '🚀 ~ file: weixin.service.ts ~ line 40 ~ WeixinService ~ getUserInfo ~ res',
        res,
      );
    });
  }
}
