import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/cobalt.css';
import s from './Formula.module.less';
import { Collapse } from 'antd';
import { ITableEntity } from '@brick/types';
import { getLabelType } from './utils';
import { data } from './common';

const { Panel } = Collapse;

export interface IFormulaProps {
  // 标签名
  label: string;
}

const currentData: any = null;
// {
//   "id": "SUM",
//   "name": "SUM",
//   "type": "数学函数",
//   "info": "这是一个数学函数",
//   "enableCache": true,
//   "reqCont": 0,
//   "jvsParamType": "number",
//   "param": false
// };

interface IFunction {
  id: string;
  name: string;
  info: string;
}

interface IFormulaTables {
  title: string;
  data: ITableEntity[];
}

interface IFormulaFunction {
  title: string;
}

export const BaseFormula: FC<IFormulaProps> = ({ label = '标签名称' }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const keyCodeRef = useRef<number>(-1);
  const coderRef = useRef<any>();

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }
    const defaultOptions = {
      mode: 'javasctipt', // 语言
      // 缩进格式
      tabSize: 2,
      // 主题，对应主题库 JS 需要提前引入
      theme: 'cobalt',
      // 显示行号
      lineNumbers: true,
      line: true,
    };

    coderRef.current = CodeMirror.fromTextArea(textareaRef.current, defaultOptions);
    // coder.setValue('${SUM}(${id})')
    const coder = coderRef.current;
    coder.on('change', (coder: any) => {
      // this.code = coder.getValue()
    });

    // 输入或粘贴时编辑触发
    coder.on('cursorActivity', (coder: any) => {
      console.log('q=>121');
      let pos = coder.getCursor();
      let lineCon = coder.getLine(pos.line);
      let reg =
        /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2022\u2028\u2029\ufeff\ufff9-\ufffc]/g;
      let charStr = lineCon.charAt(pos.ch);
      console.log(lineCon.length, '-------', pos.ch, charStr);
      if (pos.ch < lineCon.length) {
        // 获取光标位置处的内容，判断是否为变量函数，找到起始位置，移动光标至起点前一位
        // 特殊字符  /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2022\u2028\u2029\ufeff\ufff9-\ufffc]/g.test()
        if (reg.test(charStr) || /[\0]/g.test(charStr)) {
          let lastOne = lineCon.charAt(pos.ch - 1);
          console.log(lastOne);
          // 前一位不是空格
          if (lastOne && !reg.test(lastOne) && /[\0]/g.test(lastOne) == false) {
            // 前一位是 }
            if (lastOne == '}') {
              // }\0\0
              if (
                reg.test(lineCon.charAt(pos.ch + 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch + 1))
              ) {
                if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                  coder.moveH(1, 'char');
                }
                if (keyCodeRef.current == 37) {
                  let opEnd = pos.ch - 1;
                  for (let whCount = opEnd; whCount >= 0; whCount--) {
                    if (lineCon[whCount] == '$') {
                      coder.moveH(-1, 'char');
                      break;
                    }
                    coder.moveH(-1, 'char');
                  }
                  coder.moveH(-1, 'char'); // 左侧\0
                }
              }
              // }\0(
              else if (lineCon.charAt(pos.ch + 1) == '(') {
                if (keyCodeRef.current !== 37) {
                  coder.moveH(1, 'char');
                  coder.moveH(1, 'char');
                }
              } else {
                if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                  coder.moveH(1, 'char');
                }
                if (keyCodeRef.current == 37) {
                  let opEnd = pos.ch - 1;
                  for (let whCount = opEnd; whCount >= 0; whCount--) {
                    if (lineCon[whCount] == '$') {
                      coder.moveH(-1, 'char');
                      break;
                    }
                    coder.moveH(-1, 'char');
                  }
                  coder.moveH(-1, 'char'); // 左侧\0
                }
              }
            }
            // ${}\0(\0\0)
            if (lastOne == '(') {
              if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                coder.moveH(1, 'char');
              }
              if (keyCodeRef.current == 37) {
                coder.moveH(-1, 'char');
                let opEnd = pos.ch - 1;
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    coder.moveH(-1, 'char');
                    break;
                  }
                  coder.moveH(-1, 'char');
                }
              }
            }
            // )\0
            if (lastOne == ')') {
              if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
                if (
                  (reg.test(lineCon[pos.ch - 2]) || /\0/g.test(lineCon[pos.ch - 2])) &&
                  lineCon[pos.ch - 3] == ')'
                ) {
                  coder.moveH(-1, 'char');
                } else if (
                  (reg.test(lineCon[pos.ch + 1]) || /\0/g.test(lineCon[pos.ch + 1])) &&
                  lineCon[pos.ch + 2] == ')'
                ) {
                  coder.moveH(1, 'char');
                } else {
                  coder.moveH(1, 'char');
                }
                if (keyCodeRef.current == 39) {
                  coder.moveH(1, 'char');
                }
              }
              if (keyCodeRef.current == 37) {
                let opEnd = pos.ch - 1;
                if (reg.test(lineCon[opEnd - 1]) || /[\0]/g.test(lineCon[opEnd - 1])) {
                  if (
                    (reg.test(lineCon[opEnd - 2]) || /[\0]/g.test(lineCon[opEnd - 2])) &&
                    lineCon[opEnd - 3] == ')'
                  ) {
                    coder.moveH(-1, 'char');
                    coder.moveH(-1, 'char');
                  }
                } else {
                  let hasLeft = false;
                  let moveCount = -1;
                  for (let whCount = opEnd; whCount >= 0; whCount--) {
                    if (lineCon[whCount] == '(') {
                      hasLeft = true;
                    }
                    if (lineCon[whCount] == '$') {
                      moveCount += 1;
                      break;
                    }
                    moveCount += 1;
                  }
                  if (hasLeft) {
                    if (moveCount > -1) {
                      for (let mc = 0; mc < moveCount; mc++) {
                        coder.moveH(-1, 'char');
                      }
                    }
                  } else {
                    coder.moveH(-1, 'char');
                    coder.moveH(-1, 'char');
                  }
                }
              }
            }
          }
        } else {
          // 函数名  或  变量名
          if (charStr && ['$', '{', '}', '(', ')'].indexOf(charStr) == -1) {
            let left = -1;
            let right = -1;
            let alexLeft = pos.ch - 1; // 左边计数起点
            let alexRight = pos.ch + 1; // 右边计数终点
            if (alexLeft > -1) {
              for (let whCount = alexLeft; whCount >= 0; whCount--) {
                // 排除手写字符
                if (lineCon[whCount] == '}') {
                  left = -1;
                  break;
                }
                if (lineCon[whCount] == '$' && lineCon[whCount + 1] == '{') {
                  left = whCount;
                  break;
                }
              }
            }
            if (alexRight > -1) {
              for (let rCount = alexRight; rCount < lineCon.length; rCount++) {
                // 排除手写字符
                if (lineCon[rCount] == '$') {
                  right = -1;
                  break;
                }
                if (lineCon[rCount] == '}') {
                  // 函数
                  if (
                    (reg.test(lineCon[rCount + 1]) || /[\0]/g.test(lineCon[rCount + 1])) &&
                    lineCon[rCount + 2] == '('
                  ) {
                    right = rCount + 4;
                    break;
                  } else {
                    right = rCount + 2;
                    break;
                  }
                }
              }
            }
            if (left > -1 && right > -1 && right > left) {
              console.log(left);
              console.log(right);
              let mcount = 0;
              // 右移
              if (keyCodeRef.current == 39) {
                mcount = right - pos.ch;
              } else {
                mcount = pos.ch - left;
              }
              for (let mc = 0; mc < mcount; mc++) {
                coder.moveH(keyCodeRef.current == 39 ? 1 : -1, 'char');
              }
            }
          }
          // \0${}\0 或者 \0${}\0(\0\0)\0
          if (charStr == '$' || charStr == '{') {
            if (keyCodeRef.current == -1 || keyCodeRef.current == 37) {
              coder.moveH(-1, 'char');
              if (charStr == '{') {
                coder.moveH(-1, 'char');
              }
            }
            // 键盘右移动
            if (keyCodeRef.current == 39) {
              for (let whCount = pos.ch; whCount < lineCon.length; whCount++) {
                if (lineCon[whCount] == '}') {
                  coder.moveH(1, 'char');
                  coder.moveH(1, 'char'); // 右侧空格\0
                  // ${}\0(\0\0)\0
                  if (lineCon[whCount + 2] == '(') {
                    coder.moveH(1, 'char');
                    coder.moveH(1, 'char'); // (空格\0
                  }
                  break;
                }
                coder.moveH(1, 'char');
              }
            }
          }
          // \0${}\0(\0\0)\0
          if (charStr == '(') {
            // 右移
            if (keyCodeRef.current == 39) {
              if (
                reg.test(lineCon.charAt(pos.ch + 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch + 1))
              ) {
                coder.moveH(1, 'char');
                coder.moveH(1, 'char');
              }
            }
            if (keyCodeRef.current == -1 || keyCodeRef.current == 37) {
              if (
                reg.test(lineCon.charAt(pos.ch - 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch - 1))
              ) {
                coder.moveH(-1, 'char');
                let opEnd = pos.ch - 2;
                if (charStr.charAt[opEnd] == '}') {
                  for (let cs = opEnd; cs >= 0; cs--) {
                    if (lineCon.charAt(cs) == '$') {
                      coder.moveH(-1, 'char');
                      coder.moveH(-1, 'char');
                      break;
                    }
                    coder.moveH(-1, 'char');
                  }
                }
              }
            }
          }
          // \0${}\0(\0\0)\0
          if (charStr == ')') {
            if (keyCodeRef.current == -1 || keyCodeRef.current == 39) {
              coder.moveH(1, 'char');
              coder.moveH(1, 'char');
            }
            if (keyCodeRef.current == 37) {
              if (
                reg.test(lineCon.charAt(pos.ch - 1)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch - 1))
              ) {
                coder.moveH(-1, 'char');
              }
            }
          }
        }
      }
      coder.refresh();
    });
    // 键盘按键，主要监听删除键
    coder.on('keyup', (coder: any, event: any) => {
      console.log('q=>123');
      keyCodeRef.current = event.keyCode;
      // 删除
      if (event.keyCode == 8) {
        let from = null;
        let to = null;
        let pos = coder.getCursor();
        let lineCon = coder.getLine(pos.line);
        console.log(lineCon.length, '-------', pos.ch);
        let reg =
          /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2022\u2028\u2029\ufeff\ufff9-\ufffc]/g;
        let charStr = lineCon.charAt(pos.ch);
        console.log('删除。。。。。', reg.test(charStr), /[\0]/g.test(charStr), !charStr, charStr);
        let needDel = true;
        if (!charStr) {
          let lastOne = lineCon.charAt(pos.ch - 1);
          console.log(lastOne);
          if (reg.test(lastOne) || /[\0]/g.test(lastOne)) {
            // ${}\0
            if (lineCon.charAt(pos.ch - 2) == '}') {
              let opEnd = pos.ch - 2;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                if (
                  reg.test(lineCon.charAt(opStart - 1)) ||
                  /[\0]/g.test(lineCon.charAt(opStart - 1))
                ) {
                  console.log('变量位置：', opStart - 1, '--->', pos.ch);
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                  to = CodeMirror.Pos(pos.line, pos.ch - 1);
                }
              }
            }
            // )\0
            if (lineCon.charAt(pos.ch - 2) == ')') {
              console.log(lineCon.charAt(pos.ch - 2));
              // 无变量
              from = CodeMirror.Pos(pos.line, pos.ch - 3);
              // 有变量 (\0     \0\0变量名\0\0      \0)
              if (
                (reg.test(lineCon[pos.ch - 4]) || /[\0]/g.test(lineCon[pos.ch - 4])) &&
                (reg.test(lineCon[pos.ch - 5]) || /[\0]/g.test(lineCon[pos.ch - 5]))
              ) {
                from = CodeMirror.Pos(pos.line, pos.ch - 4);
              }
              to = CodeMirror.Pos(pos.line, pos.ch - 1);
            }
            // 匹配左括号，一起删除函数名
            if (
              lineCon.charAt(pos.ch - 2) == '(' &&
              (reg.test(lineCon.charAt(pos.ch - 3)) || /[\0]/g.test(lineCon.charAt(pos.ch - 3)))
            ) {
              let opEnd = pos.ch - 4;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
              }
              to = CodeMirror.Pos(pos.line, pos.ch - 1);
            }
            // 匹配 ( 含手动空格
            if (lineCon.charAt(pos.ch - 2) == ' ') {
              if (
                lineCon.charAt(pos.ch - 3) == '(' &&
                (reg.test(lineCon.charAt(pos.ch - 4)) || /[\0]/g.test(lineCon.charAt(pos.ch - 4)))
              ) {
                let opEnd = pos.ch - 5;
                let opStart = -1;
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    opStart = whCount;
                    break;
                  }
                }
                if (opStart > -1) {
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                }
              }
              to = CodeMirror.Pos(pos.line, pos.ch - 1);
            }
          } else {
            // }
            if (['}', '('].indexOf(lastOne) > -1) {
              let opEnd = pos.ch - 1;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
              }
              to = CodeMirror.Pos(pos.line, pos.ch);
            }
            // )
            if (lastOne == ')') {
              // 空白函数，括号内没有参数
              if (
                reg.test(lineCon.charAt(pos.ch - 2)) ||
                /[\0]/g.test(lineCon.charAt(pos.ch - 2))
              ) {
                if (
                  reg.test(lineCon.charAt(pos.ch - 3)) ||
                  /[\0]/g.test(lineCon.charAt(pos.ch - 3))
                ) {
                  if (lineCon.charAt(pos.ch - 4) == '(') {
                    let opEnd = pos.ch - 6;
                    let opStart = -1;
                    for (let whCount = opEnd; whCount >= 0; whCount--) {
                      if (lineCon[whCount] == '$') {
                        opStart = whCount;
                        break;
                      }
                    }
                    if (opStart > -1) {
                      from = CodeMirror.Pos(pos.line, opStart);
                    }
                    to = CodeMirror.Pos(pos.line, pos.ch);
                  } else {
                    from = CodeMirror.Pos(pos.line, pos.ch - 2);
                    to = CodeMirror.Pos(pos.line, pos.ch);
                    coder.setSelection(from, to);
                    coder.deleteH();
                    needDel = false;
                    keyCodeRef.current = -1;
                  }
                }
              }
            }
          }
        } else {
          if (reg.test(charStr) || /[\0]/g.test(charStr)) {
            // (\0
            if (lineCon[pos.ch - 1] == '(') {
              if (reg.test(lineCon[pos.ch - 2]) || /[\u0]/g.test(lineCon[pos.ch - 2])) {
                let opEnd = pos.ch - 3;
                let opStart = -1;
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    opStart = whCount;
                    break;
                  }
                }
                if (opStart > -1) {
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                }
              }
              to = CodeMirror.Pos(pos.line, pos.ch);
            }
            // }\0
            if (lineCon.charAt(pos.ch - 1) == '}') {
              let opEnd = pos.ch - 1;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                if (
                  reg.test(lineCon.charAt(opStart - 1)) ||
                  /[\0]/g.test(lineCon.charAt(opStart - 1))
                ) {
                  from = CodeMirror.Pos(pos.line, opStart - 1);
                  to = CodeMirror.Pos(pos.line, pos.ch);
                }
              }
            }
          } else {
            if (['(', ')', '$', '{', '}'].indexOf(charStr) == -1) {
              let lastOne = lineCon.charAt(pos.ch - 1);
              console.log(lastOne);
              let opEnd = -1;
              let opStart = -1;
              if (['{', '}', '('].indexOf(lastOne) > -1) {
                opEnd = pos.ch - 1;
              }
              if (lastOne == ')') {
                // 空白函数
                if (reg.test(lineCon[pos.ch - 2]) || /[\0]/g.test(lineCon[pos.ch - 2])) {
                  if (reg.test(lineCon[pos.ch - 3]) || /[\0]/g.test(lineCon[pos.ch - 3])) {
                    console.log(lineCon[pos.ch - 4]);
                    if (lineCon[pos.ch - 4] == '(') {
                      opEnd = pos.ch - 1;
                    } else {
                      from = CodeMirror.Pos(pos.line, pos.ch - 2);
                      to = CodeMirror.Pos(pos.line, pos.ch);
                      coder.setSelection(from, to);
                      coder.deleteH();
                      needDel = false;
                      keyCodeRef.current = -1;
                    }
                  }
                }
              }
              if (opEnd > -1) {
                for (let whCount = opEnd; whCount >= 0; whCount--) {
                  if (lineCon[whCount] == '$') {
                    opStart = whCount;
                    break;
                  }
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
                to = CodeMirror.Pos(pos.line, pos.ch);
              }
            }
            // 删除括号中的变量
            if (charStr == ')') {
              let lastOne = lineCon.charAt(pos.ch - 1);
              console.log(reg.test(lastOne), /[\0]/g.test(lastOne));
              if (reg.test(lastOne) || /[\0]/g.test(lastOne)) {
                let ep = pos.ch - 2;
                // 括号里面清空了不做操作    (空格空格)
                if (
                  reg.test(lineCon.charAt(pos.ch - 2)) ||
                  /[\0]/g.test(lineCon.charAt(pos.ch - 2))
                ) {
                  ep = -1; // pos.ch - 3
                }
                if (ep > -1) {
                  // 变量
                  if (lineCon.charAt(ep) == '}') {
                    let opEnd = ep;
                    let opStart = -1;
                    for (let whCount = opEnd; whCount >= 0; whCount--) {
                      if (lineCon[whCount] == '$') {
                        opStart = whCount;
                        break;
                      }
                    }
                    if (opStart > -1) {
                      if (
                        reg.test(lineCon.charAt(opStart - 1)) ||
                        /[\0]/g.test(lineCon.charAt(opStart - 1))
                      ) {
                        from = CodeMirror.Pos(pos.line, opStart - 1);
                        to = CodeMirror.Pos(pos.line, pos.ch - 1);
                      }
                    }
                  }
                  // 函数左括号(
                  if (lineCon.charAt(ep) == '(') {
                    if (reg.test(lineCon.charAt(ep - 1)) || /[\0]/g.test(lineCon.charAt(ep - 1))) {
                      let opEnd = ep - 1;
                      let opStart = -1;
                      for (let whCount = opEnd; whCount >= 0; whCount--) {
                        if (lineCon[whCount] == '$') {
                          opStart = whCount;
                          break;
                        }
                      }
                      if (opStart > -1) {
                        from = CodeMirror.Pos(pos.line, opStart - 1);
                        to = CodeMirror.Pos(pos.line, pos.ch - 1);
                      }
                    }
                  }
                  // 函数名
                  if (charStr && ['$', '{', '}', '(', ')'].indexOf(lineCon.charAt(ep)) == -1) {
                    let opEnd = ep;
                    let opStart = -1;
                    for (let whCount = opEnd; whCount >= 0; whCount--) {
                      if (lineCon[whCount] == '$') {
                        opStart = whCount;
                        break;
                      }
                    }
                    if (opStart > -1) {
                      from = CodeMirror.Pos(pos.line, opStart - 1);
                      to = CodeMirror.Pos(pos.line, pos.ch - 1);
                    }
                  }
                }
              }
            }
            // 删除函数名
            if (charStr == '(') {
              let opEnd = pos.ch - 1;
              let opStart = -1;
              for (let whCount = opEnd; whCount >= 0; whCount--) {
                if (lineCon[whCount] == '$') {
                  opStart = whCount;
                  break;
                }
              }
              if (opStart > -1) {
                from = CodeMirror.Pos(pos.line, opStart - 1);
                to = CodeMirror.Pos(pos.line, pos.ch - 1);
              }
            }
          }
        }
        if (from && to && needDel) {
          coder.setSelection(from, to);
          coder.deleteH();
          keyCodeRef.current = -1;
          console.log('00000000000000000000', from, to);
        }
      } else {
        keyCodeRef.current = -1;
      }
    });
    // 键盘按下，更新keycode，主要记录左右移动
    coder.on('keydown', (coder: any, event: any) => {
      if ([8, 37, 39].indexOf(event.keyCode) > -1) {
        keyCodeRef.current = event.keyCode;
      } else {
        keyCodeRef.current = -1;
      }
    });
    // 鼠标按下， 重置keycode
    coder.on('mousedown', (coder: any, event: any) => {
      keyCodeRef.current = -1;
    });
  }, []);

  const addVariable = (item: any, index: any) => {
    console.log(item);
    let con = '\0' + ('${' + item.id + '}') + '\0';
    if (!item.param) {
      con += '(' + '\0\0' + ')' + '\0';
    }
    coderRef.current.replaceSelection(con, undefined, undefined, { ...item, parent: index + 1 });
  };

  const className = classNames(s.formula);
  return (
    <div className={className}>
      <div className="formula-panel-top">
        <div className="formula-panel formula-panel-editor">
          <p className="formula-panel-title">
            {label}
            <span className="formula-panel-subtitle">=</span>
          </p>
          <div className="formula-panel-content">
            <div className="formula-editor">
              <textarea ref={textareaRef} id="textarea"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="formula-panel-bottom">
        {data.map((item) => {
          return (
            <div className="formula-panel">
              <p className="formula-panel-title">
                <span className="formula-panel-title-text">{item.title}</span>
              </p>
              {item.type == 'tree' && (
                <div className="formula-panel-content">
                  <div className="formula-panel-item-filed">
                    <Collapse>
                      {item.data.map((currItem) => {
                        return (
                          <Panel key={`tree-data-item-${item.title}`} header={currItem.title}>
                            <ul className="function-panel-filed-list">
                              {currItem.data.map((relItem, index) => {
                                const realClassName = classNames('formula-filed-capsule', {
                                  blue: relItem.jvsParamType == 'text',
                                  yellow: relItem.jvsParamType == 'number',
                                  green: relItem.jvsParamType == 'date',
                                  purple: relItem.jvsParamType == 'array',
                                  red: relItem.jvsParamType == 'object',
                                  cyan: relItem.jvsParamType == 'unknown',
                                });
                                return (
                                  <li
                                    className="function-panel-filed-li"
                                    onClick={() => addVariable(relItem, index)}
                                  >
                                    <span className="formula-func-title show-type">
                                      {relItem.name}
                                    </span>
                                    <div className={realClassName}>
                                      {getLabelType(relItem.jvsParamType)}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </Panel>
                        );
                      })}
                    </Collapse>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="formula-panel formula-panel-func-desc">
          <p className="formula-panel-title">
            <span className="formula-panel-title-text">
              {currentData ? currentData.name : '说明'}
            </span>
          </p>
          {currentData ? (
            <div className="formula-panel-content info-section">
              <div>
                <p>{currentData.type}</p>
                <div
                  className="info-text"
                  dangerouslySetInnerHTML={{ __html: currentData.info }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="formula-panel-content info-section">
              <div>
                <p>请从左侧面板选择字段名和函数，或输入函数</p>
                <p>
                  公式编辑举例：<span className="fun">SUM</span>(
                  <span className="param">参数1</span>,<span className="param">参数2</span>)
                </p>
                <p>
                  <a>查看基本公式的帮助文档</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
