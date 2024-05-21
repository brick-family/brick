import * as React from 'react';
import { forwardRef } from 'react';
import { App, Col, ConfigProvider, Form, Row } from 'antd';
import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import { generatorClass, groupArray, isMobile } from '../utils';
import classNames from 'classnames';
import './formContainer.less';
import { FormContainerProvider, useFormContainerSelector } from './processor';
import { IFormContainerProps, IWebFormRef } from '../../types';
import { FormContainerWrapper as MobileFormContainerWrapper } from '../../components-mobile/form-container';

import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

/**
 * Form容器包装器。lowcode-engine不支持直接使用hooks组件，需要包裹一层，要不内容元素没办法直接嵌入
 */
export const FormContainerWrapper = forwardRef<IWebFormRef | undefined, IFormContainerProps>(
  ({ cols, children }, ref) => {
    // const [disabled, setDisabled] = useState<boolean>(false);

    const [form] = Form.useForm();

    // window.cc = form;
    const [changeReadonly] = useFormContainerSelector((s) => [s.changeReadonly]);

    React.useImperativeHandle(
      ref,
      () => {
        return {
          formRef: form,
          changeReadonly,
        };
      },
      []
    );

    const getChildren = () => {
      // return children;
      // if (React.Children.count(children) <= 1) {
      //   return children;
      // }

      const newArray = groupArray(React.Children.toArray(children), cols);
      // console.log('q=>23', React.Children.toArray(children), newArray);

      return newArray.map((childs: any) => {
        return (
          <Row
            key={childs?.[0]?.key}
            gutter={[24, 24]}
            className={generatorClass('form-container-row')}
          >
            {childs.map((child: any) => {
              const { props } = child;
              const name = props?.componentId || props?.__id;
              const componentName = props?._componentName;

              console.log('q=>child-componentName', componentName);
              // 占整行内容
              if (['FieldLayout', 'FieldSubTable'].includes(componentName)) {
                console.log('q=>child', child);
                return (
                  <Col key={name} span={24}>
                    {child}
                  </Col>
                );
              }

              return (
                <Col key={name} span={24 / childs.length}>
                  {/*{props?.title === '富文本' ? child}*/}
                  {name && (
                    <Form.Item
                      label=""
                      name={name}
                      // trigger={'onBlur'}
                      rules={[{ required: props.isRequired, message: `${props.title}不能为空！` }]}
                    >
                      {child}
                    </Form.Item>
                  )}
                </Col>
              );
            })}
          </Row>
        );
      });
    };

    const rootClassNames = classNames(generatorClass('form-container'));
    return (
      <Form form={form} className={rootClassNames}>
        {getChildren()}
      </Form>
    );
  }
);

/**
 * 容器组件
 */
export class FormContainerClass extends React.PureComponent<
  IFormContainerProps & { forwardedRef: () => void },
  any
> {
  render() {
    // 向下传递ref
    const { forwardedRef, ...otherProps } = this.props;
    const mobile = isMobile();
    return (
      <ConfigProvider locale={zhCN}>
        <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
          <App style={{ height: '100%' }}>
            <FormContainerProvider isMobile={mobile}>
              {mobile ? (
                <MobileFormContainerWrapper {...otherProps} ref={forwardedRef} />
              ) : (
                <FormContainerWrapper {...otherProps} ref={forwardedRef} />
              )}
            </FormContainerProvider>
          </App>
        </StyleProvider>
      </ConfigProvider>
    );
  }
}

/**
 * 简单包装，不做任何处理
 * 部分组件ref比较特殊，包一层会解决这个问题
 */
export function withWrap(Comp: any) {
  return forwardRef((props: any, ref: any) => {
    // console.log('q=>00000000', window.AliLowCodeEngine, props,);
    // design态的时候后render泰分别对ref做特殊处理
    const isDesign = props.__designMode === 'design';
    if (isDesign) {
      return <Comp {...props} ref={ref} forwardedRef={ref} />;
    }
    return <Comp {...props} forwardedRef={ref} />;
  });
}

export const FormContainer = withWrap(FormContainerClass);
