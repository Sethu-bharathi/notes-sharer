import React,{useState} from 'react';
import { Button, ColorPicker } from 'tcomponents/atoms';
import Timer from 'tcomponents/atoms/timer/Timer';
import styles from './sethudemo.module.scss';
import SampleForm from './SampleForm/SampleForm';
import ButtonComponent from 'twidgets/organisms/templateBuilder/catalog/calloutComponents/buttonComponent/ButtonComponent';

function Demo() {
  const [counter,setCounter]=useState(0)
  return (
    <div className={styles.hello}>
      <Button>Hello</Button>
      <ColorPicker />
      <Timer />
      <SampleForm />
      <p>{counter}</p>
      <button onClick={e=>setCounter(prev=>prev+1)}>+</button>
    </div>
  );
}

export default Demo;
