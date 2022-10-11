import React, { useState } from 'react';
// import yayJpg from '../assets/yay.jpg';
import LowcodeEditor from '../components/lowcode-editor';
import { useModel } from 'umi';
import LE from "@/components/lowcode-editor";
import FlooksComponent from './flooks';
import HState from './hState';



const Child = () => {

  const { counterChild, incrementChild, child, change } = useModel('child');
  return <div>
    counterChild:{counterChild}
    child: {child}
    <button onClick={incrementChild}>incrementChild</button>
    <button onClick={change}>change</button>
  </div>
}


const Child2 = () => {

  console.log('child2render')
  const { child, change } = useModel('child', (model) => {
    return {
      child: model.child,
      change: model.change
    }
  });

  return <div>
    child: {child}
    {/* <button onClick={incrementChild}>incrementChild</button> */}
    <button onClick={change}>change</button>
  </div>
}


const Parent = () => {
  const { counter, increment, decrement } = useModel('count');

  return <div>
    {counter}
    <button onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>
  </div>
}

function HomePage() {

  const [destory, setDestory] = useState(false);

  return (
    <div>

      {
        !destory && <>
          <Parent />
          <Child />
          <Child2 />
        </>
      }

      <button onClick={() => setDestory(!destory)}>destory</button>
      {/* <LowcodeEditor /> */}

      <h1>flooks11</h1>

      <FlooksComponent />

      <HState />
    </div>
  );
}


export default () => {
  return <LowcodeEditor />
}
