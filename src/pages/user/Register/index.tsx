import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('register');

  const handleSubmit = async (values: API.RegisterParams) => {
    const { password, checkedPassword } = values;
    if (password !== checkedPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const userId = await register({
        ...values,
      });
      if (userId) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }

    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/icons/logo.png" />}
          title="Mine App"
          subTitle={'你的专属数字空间'}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          submitter={{ searchConfig: { submitText: '注册'}}}
        >
          <Tabs activeKey={type} onChange={setType}
          items={[
            {
              label: '账户注册',
              key: 'register',
            },
          ]}
          />

          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'帐户名'}
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                  {
                    min: 4,
                    message: '账户名长度不小于4位'
                  }
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                  {
                    min: 8,
                    message: '密码长度不小于8位'
                  }
                ]}
              />
              <ProFormText.Password
                name="checkedPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
