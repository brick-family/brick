import { IFormContainerProps, IMobileFormRef } from '../../types';
import React, { forwardRef } from 'react';
import { useFormContainerSelector } from '../../components/form-container/processor/FormContainerProvider';
import { Form } from 'antd-mobile';
import classNames from 'classnames';
import { groupArray, generatorClass, isMobile } from '../../components/utils';

/**
 * Form容器包装器。lowcode-engine不支持直接使用hooks组件，需要包裹一层，要不内容元素没办法直接嵌入
 */
export const FormContainerWrapper = forwardRef<IMobileFormRef | undefined, IFormContainerProps>(
  ({ cols, children }, ref) => {
    // const [disabled, setDisabled] = useState<boolean>(false);

    const [form] = Form.useForm();

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
      return React.Children.toArray(children).map((child) => {
        // @ts-ignore
        const { props } = child;
        const name = props.componentId || props.__id;
        return (
          <Form.Item
            label=""
            name={name}
            rules={[{ required: props.isRequired, message: `${props.title}不能为空！` }]}
          >
            {child}
          </Form.Item>
        );
      });
    };

    const rootClassNames = classNames(generatorClass('form-container-h5'));
    return (
      <Form form={form} className={rootClassNames} requiredMarkStyle="asterisk">
        {getChildren()}
      </Form>
    );
  }
);
