import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright={false}
      links={[
        {
          key: 'bilibili',
          title: <><img
            src={'https://www.bilibili.com/favicon.ico'}
            style={{
                width: '16px',
                height: '16px'
            }}
            alt='bilibili'/> bilibili
          </>,
          href: 'https://space.bilibili.com/434850860',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> GitHub</>,
          href: 'https://github.com/220809',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
