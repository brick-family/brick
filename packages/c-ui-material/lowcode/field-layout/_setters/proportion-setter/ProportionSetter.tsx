import React, { FC, useEffect, useState } from 'react';
import { SetterHoc } from '../../../common';
import { Col, Input, Row } from 'antd';
import { IProportion } from '@/components';
import s from './proportionSetter.module.less';

interface IColItem {
  colNumber: number;
  proportion: string;
  spanArr: number[];
  url: string;
}
const ColItems: IColItem[] = [
  {
    colNumber: 1,
    proportion: '12',
    spanArr: [24],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAF5JREFUWAntksEJACAQw9RBXMKHu7j/IIIjFAJy5P4tNLk+91mtwI0CG94Eh/xmUiMagQj4WhDYuFYjMTooqBEIbFyrkRgdFNQIBDau1UiMDgpqBAIb12okRgcFyxi5eHABErS/7HsAAAAASUVORK5CYII=',
  },
  {
    colNumber: 2,
    proportion: '6:6',
    spanArr: [12, 12],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAGxJREFUWAntkTERgDAUxQAhmGDACwLrhQETKOFwkKWZ0vldcz9Z9/M6lonvvcfzfz+bs028Qf26Q1TdAFYRIEmdVETVDWAVAZLUSUVU3QBWESBJnVRE1Q1gFQGS1ElFVN0AVhEgSZ1URNUNYB9LtgUS+2cZkwAAAABJRU5ErkJggg==',
  },
  {
    colNumber: 2,
    proportion: '3:9',
    spanArr: [6, 18],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAHFJREFUWAnt0aERgDAUBFGgEJpA0AsF0guCJqiEwayGwazYqBPJn8t/47xuy/DyXMd+Ple/vHk5+ve16fcEyYA+IoGgRiKsQhISkUBQIxFWIQmJSCCokQirkIREJBDUSIRVSEIiEghqJMIqJCERCQQ1bhvFBRLFThJWAAAAAElFTkSuQmCC',
  },
  {
    colNumber: 2,
    proportion: '9:3',
    spanArr: [18, 6],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAG5JREFUWAntkTENgFAUxAAhmGDACwLxwoAJlBAk0KTJH/r2u9xr53U/tmmwe67z/ib92bYM9gOe0yMYnRTMiAQW12YEo5OCGZHA4tqMYHRSMCMSWFybEYxOCmZEAotrM4LRScGMSGBxbUYwOin4AnunBRKk87oLAAAAAElFTkSuQmCC',
  },
  {
    colNumber: 3,
    proportion: '4:4:4',
    spanArr: [8, 8, 8],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAYCAYAAABTPxXiAAAAAXNSR0IArs4c6QAAAGpJREFUWAntksENgCAAxJBBWMKHuzggu/BwCScxrsA1kZjy7wVatnace5k89+jXi369USfvvxTmI1bJYQlLgAb8TqDMaMoSkT4QtgQoM5qyRKQPhC0ByoymLBHpA2FLgDKjKUtE+kD4FyUe0KAJEsF/0uoAAAAASUVORK5CYII=',
  },
  {
    colNumber: 3,
    proportion: '3:6:3',
    spanArr: [6, 12, 6],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAHRJREFUWAljlDOPMmYgEjw6uewsSCkpeog0GkUZOfYwoZgwhDmjHhlskTcaI6MxQqMQGE1aNApYso0djRGyg45GGkdjhEYBS7axozFCdtDRSONojNAoYMk2djRGyA46GmkcjREaBSzZxo7GCNlBRyONwyZGAB78CRL9+D+tAAAAAElFTkSuQmCC',
  },
  {
    colNumber: 4,
    proportion: '3:3:3:3',
    spanArr: [6, 6, 6, 6],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAG1JREFUWAntksEJgEAMBO+uEJvwYS8WaC8+bMJKDjs4FgaCTN7Zhcykb8e5t8V57+v5VitmxuIN5dc8pJoijWgEIuBrQWDjWo3E6KCgRiCwca1GYnRQUCMQ2LhWIzE6KKgRCGxcq5EYHRT8jZEJ8jMNEnW0C4YAAAAASUVORK5CYII=',
  },
  {
    colNumber: 6,
    proportion: '2:2:2:2:2:2',
    spanArr: [4, 4, 4, 4, 4, 4],
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAAAAXNSR0IArs4c6QAAAHFJREFUWAljlDOPMmbAAh6dXHYWJIxLHiQ3mNQwgRw0HMCoRwZbLI7GyGiM0CgERpMWjQKWbGNHY4TsoKORxtEYoVHAkm3saIyQHXQ00jgaIzQKWLKNHY0RsoOORhpHY4RGAUu2saMxQnbQ0UjjsIkRAJi/FRJiIdKTAAAAAElFTkSuQmCC',
  },
];

// type valueType = {
//   col: 1;
//   proportion: '12';
// } | {
//   col: 2;
//   proportion: '6:6'
// } | {
//   col: 2;
//   proportion: '3:9'
// } | {
//   col: 2;
//   proportion: '9:3'
// } | {
//   col: 3;
//   proportion: '4:4:4'
// } | {
//   col: 3;
//   proportion: '3:6:3'
// } | {
//   col: 4;
//   proportion: '3:3:3:3'
// } | {
//   col: 6;
//   proportion: '2:2:2:2:2:2'
// }

export interface IProportionSetterProps {
  value: IProportion;
  onChange: (val: any) => void;
}

const ProportionSetterFun: FC<IProportionSetterProps> = (props) => {
  const { onChange, value } = props;
  console.log('props', props);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!value) {
      return;
    }
    for (let index = 0; index < ColItems.length; index++) {
      const colItem = ColItems[index];
      if (colItem.colNumber == value.colNumber && colItem.proportion == value.proportion) {
        setCurrentIndex(index);
        return;
      }
    }
  }, []);

  const onColClick = (item: IColItem, index: number) => {
    onChange({ proportion: item.proportion, colNumber: item.colNumber });
    setCurrentIndex(index);
  };

  return (
    <div className={s.proportion}>
      <Row className={s.select} style={{ height: 74, width: '100%' }} gutter={[4, 4]}>
        {ColItems.map((item, index) => {
          return (
            <Col
              onClick={() => {
                onColClick(item, index);
              }}
              span={6}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '5px',
                  justifyContent: 'center',
                  border: currentIndex == index ? '1px solid #0079f2' : '1px solid rgba(0,0,0,.2)',
                  padding: 4,
                }}
              >
                <div
                  style={{ height: '100%', width: '100%', backgroundImage: `url(${item.url})` }}
                />
              </div>
            </Col>
          );
        })}
      </Row>
      <div className={s.space}>
        <div className={s.span}>列比例</div>
        <Input
          className={s.input}
          value={ColItems[currentIndex].proportion}
          size={'small'}
          disabled
        />
      </div>
    </div>
  );
};

export const ProportionSetter = SetterHoc(ProportionSetterFun);
