import React, { FC, useEffect, useState, useTransition } from 'react';
import './App.scss';
import { collection } from './adapters/BggApiAdapter';
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';

const App: FC = () => {
  const [data, setData] = useState<any>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // collection('phildinius').then((d) => {
    //   setData(d);
    // }).catch(e => {
    //   setData(e.message);
    // }).finally(() => {
    //   setLoading(false);
    // })
  }, [])

  return (
      <div className="App">
        {/* {loading ? <LoadingAnimation></LoadingAnimation> : data.map((g: any) => <img src={g.thumbnail} alt={g.name} title={g.name} />)} */}
        <LoadingAnimation></LoadingAnimation>
      </div>
  );
}

export default App;
