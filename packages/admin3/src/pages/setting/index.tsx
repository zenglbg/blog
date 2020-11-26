import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { StepsForm, ProFormText, ProFormSwitch } from '@ant-design/pro-form';
import { SelectOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import ModalFileSelect from '@/components/ModalFileSelect';
import { useGetdata } from './hooks';

interface ISettingProps {}
const Setting: React.FunctionComponent<ISettingProps> = (props) => {
  const { files, userSetting, changefn, finish, setChangefn, selectFile } = useGetdata();
  const [fileVisible, setFileVisible] = useState(false);
  const selectBtn = (key: 'systemLogo' | 'systemFavico' | 'wechat' | 'alipay') => {
    setChangefn(key);
    setFileVisible(true);
  };

  return (
    <div>
      <PageHeaderWrapper>
        {userSetting && userSetting.id ? (
          <ProCard>
            <StepsForm onFinish={finish}>
              <StepsForm.StepForm title="系统设置">
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.systemUrl}
                    name="systemUrl"
                    label="systemUrl"
                    placeholder="请输入域名设置"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.systemTitle}
                    name="systemTitle"
                    label="systemTitle"
                    placeholder="请输入系统title"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <Button
                    icon={<SelectOutlined />}
                    onClick={() => {
                      selectBtn('systemLogo');
                    }}
                  >
                    选择系统Logo
                  </Button>
                  <Button
                    icon={<SelectOutlined />}
                    onClick={() => {
                      selectBtn('systemFavico');
                    }}
                  >
                    选择系统favico
                  </Button>
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.systemFooterInfo}
                    name="systemFooterInfo"
                    label="systemFooterInfo"
                    placeholder="请输入系统客户端footer简介"
                  />
                </ProForm.Group>
              </StepsForm.StepForm>
              <StepsForm.StepForm title="常规设置">
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.github}
                    name="github"
                    label="github"
                    placeholder="请输入github账号名"
                  />
                  <ProFormText
                    initialValue={userSetting.paypal}
                    name="paypal"
                    label="paypal"
                    placeholder="请输入paypal付款链接"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <Button
                    icon={<SelectOutlined />}
                    onClick={() => {
                      selectBtn('wechat');
                    }}
                  >
                    选择微信二维码
                  </Button>
                  <Button
                    icon={<SelectOutlined />}
                    onClick={() => {
                      selectBtn('alipay');
                    }}
                  >
                    选择支付宝二维码
                  </Button>
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.instagram}
                    name="instagram"
                    label="instagram"
                    placeholder="请输入instagram"
                  />
                  <ProFormText
                    initialValue={userSetting.youtube}
                    name="youtube"
                    label="youtube"
                    placeholder="请输入youtube"
                  />
                  <ProFormText
                    initialValue={userSetting.soundcloud}
                    name="soundcloud"
                    label="soundcloud"
                    placeholder="请输入soundcloud"
                  />
                  <ProFormText
                    initialValue={userSetting.telegram}
                    name="telegram"
                    label="telegram"
                    placeholder="请输入telegram"
                  />
                </ProForm.Group>
              </StepsForm.StepForm>
              <StepsForm.StepForm title="seo设置">
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.seoKeyword}
                    name="seoKeyword"
                    label="seoKeyword"
                    placeholder="请输入seo关键词"
                  />

                  <ProFormText
                    initialValue={userSetting.seoDesc}
                    name="seoDesc"
                    label="seoDesc"
                    placeholder="请输入seo描述"
                  />
                </ProForm.Group>
              </StepsForm.StepForm>
              <StepsForm.StepForm title="smtp设置">
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.smtpHost}
                    name="smtpHost"
                    label="smtpHost"
                    placeholder="请输入smtpHost"
                  />
                  <ProFormText
                    initialValue={userSetting.smtpPort}
                    name="smtpPort"
                    label="smtpPort"
                    placeholder="请输入smtpPort"
                  />
                  <ProFormText
                    initialValue={userSetting.smtpUser}
                    name="smtpUser"
                    label="smtpUser"
                    placeholder="请输入smtpUser"
                  />
                  <ProFormText
                    initialValue={userSetting.smtpPass}
                    name="smtpPass"
                    label="smtpPass"
                    placeholder="请输入smtpPass"
                  />
                  <ProFormText
                    initialValue={userSetting.smtpAdress}
                    name="smtpAdress"
                    label="smtpAdress"
                    placeholder="请输入smtpAdress"
                  />
                </ProForm.Group>
              </StepsForm.StepForm>
              <StepsForm.StepForm title="阿里云oss设置">
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.ossRegion}
                    name="ossRegion"
                    label="ossRegion"
                    placeholder="请输入阿里云ossRegion"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.ossAccessKeyId}
                    name="ossAccessKeyId"
                    label="ossAccessKeyId"
                    placeholder="请输入阿里云ossAccessKeyId"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.ossAccessKeySecret}
                    name="ossAccessKeySecret"
                    label="ossAccessKeySecret"
                    placeholder="请输入阿里云ossAccessKeySecret"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormSwitch
                    initialValue={!!userSetting.ossHttps}
                    name="ossHttps"
                    label="ossHttps"
                    placeholder="阿里云 oss 是否开启 https"
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    initialValue={userSetting.ossBucket}
                    name="ossBucket"
                    label="ossBucket"
                    placeholder="请输入阿里云bucket"
                  />
                </ProForm.Group>
              </StepsForm.StepForm>
            </StepsForm>
          </ProCard>
        ) : null}
      </PageHeaderWrapper>
      <ModalFileSelect
        changefn={changefn}
        selectFile={selectFile}
        fileVisible={fileVisible}
        files={files}
        setFileVisible={setFileVisible}
      />
    </div>
  );
};

export default Setting;
