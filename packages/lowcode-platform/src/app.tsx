import React, { useLayoutEffect } from 'react';
import { App, ConfigProvider } from 'antd';
// import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormulaEditor, ItemDetail } from '@brick/biz-component';
import { GlobalProvider } from './global-processor';
import { history } from 'umi';
import { setUmiHistory } from '@brick/utils';

// dayjs.locale('en');
dayjs.locale('zh-cn');
// 创建query客户端
const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function GlobalContent() {
  return (
    <>
      <ItemDetail />
      <FormulaEditor />
    </>
  );
}

function QCProvider({ children }: any) {
  useLayoutEffect(() => {
    setUmiHistory(history);
  }, []);
  return (
    <QueryClientProvider client={query}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          cssVar: true,
          components: {
            Tree: {
              directoryNodeSelectedBg: 'rgba(0, 0, 0, 0.04)',
              directoryNodeSelectedColor: 'rgba(0, 0, 0, 0.95)',
            },
          },
        }}
        // button={{ style: { padding: '4px 10px' } }}
      >
        <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
          <GlobalProvider>
            <App>
              {children}
              <GlobalContent />
            </App>
          </GlobalProvider>
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export function rootContainer(container: any) {
  return React.createElement(QCProvider, null, container);
}
