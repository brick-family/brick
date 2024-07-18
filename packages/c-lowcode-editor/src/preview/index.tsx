import React, { useImperativeHandle, useLayoutEffect, useState } from 'react';
import { buildComponents } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { getPackages, getSchemaObject } from '../utils';
import { ITableEntity } from '@brick/types';
import { BLoading } from '@brick/component';
import { FormInstance } from 'antd';
import { useCreation } from 'ahooks';
import { createPromiseWrapper } from '@brick/core';

export interface IPreviewProps {
  table: ITableEntity;
}

export interface IPreviewRef {
  getFormInstance: () => Promise<FormInstance>;
  changeReadonly: (readonly: boolean) => Promise<void>;
}

export const SamplePreview = React.memo(
  React.forwardRef<IPreviewRef, IPreviewProps>((props, ref) => {
    const { table } = props;
    const [data, setData] = useState<any>({});
    const formInstanceRef = React.useRef();
    const formOtherRef = React.useRef<Omit<IPreviewRef, 'getFormInstance'>>();
    const { schema, components } = data;

    // 此处异步是因为不能立马获取到form的实例
    const promiseRef = useCreation(() => {
      return createPromiseWrapper();
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          getFormInstance: async () => {
            await promiseRef.promise;
            return formInstanceRef.current! as FormInstance;
          },
          changeReadonly: async (disabled: boolean) => {
            await promiseRef.promise;
            formOtherRef.current?.changeReadonly?.(disabled);
          },
        };
      },
      []
    );

    async function init() {
      const packages = getPackages(); // getPackagesFromLocalStorage(scenarioName);
      // TODO 这块需要从接口后去
      const projectSchema = getSchemaObject(table.schema!);
      const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
      const componentsMap: any = {};
      componentsMapArray.forEach((component: any) => {
        componentsMap[component.componentName] = component;
      });
      const schema = componentsTree[0];

      const libraryMap = {} as any;
      const libraryAsset: any = [];
      // @ts-ignore
      packages.forEach(({ package: _package, library, urls, renderUrls }) => {
        libraryMap[_package] = library;
        // if (renderUrls) {
        //   libraryAsset.push(renderUrls);
        // } else if (urls) {
        //   libraryAsset.push(urls);
        // }
      });

      // const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

      // console.log('q=>libraryAsset', libraryAsset);

      // const assetLoader = new AssetLoader();
      // await assetLoader.load(libraryAsset);
      // @ts-ignore
      const components = await injectComponents(buildComponents(libraryMap, componentsMap));

      setData({
        schema,
        components,
      });
    }

    useLayoutEffect(() => {
      if (table?.schema) {
        init();
      }
    }, [table?.schema]);

    if (!schema || !components) {
      return <BLoading />;
    }

    const onCompGetRef = (schema: any, ref: any) => {
      if ('FormContainer' === schema.componentName) {
        const { formRef, ...otherRef } = ref;
        formInstanceRef.current = ref.formRef;
        formOtherRef.current = otherRef;
        promiseRef?.resolve(true);
      }
    };

    return (
      <div className="lowcode-plugin-sample-preview">
        <ReactRenderer
          className="lowcode-plugin-sample-preview-content"
          schema={schema}
          designMode="dialog"
          rendererName="LowCodeRenderer"
          components={components}
          onCompGetRef={onCompGetRef}
          appHelper={{
            requestHandlersMap: {
              fetch: createFetchHandler(),
            },
          }}
        />
      </div>
    );
  })
);

export default SamplePreview;
