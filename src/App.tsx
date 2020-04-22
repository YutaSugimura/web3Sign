import React, { Fragment, useEffect, useState } from 'react';
import Web3 from 'web3';
import web3Hooks from './hooks/web3';
import { sign } from './func/sign';
import { recover } from './func/recover';

const App: React.FC = () => {
  const { isLoading, isWeb3, accounts, web3 } = web3Hooks();
  const [state, setState] = useState<string>('...Waiting');

  const func = async (web3: Web3, address: string): Promise<void> => {
    try {
      const otp = await web3.utils.randomHex(16);
      const params = `sign transaction \n oneTimePassword:${otp}`;
      const password = 'pass1234';

      const signStr = await sign(web3, address, params, password);
      const recoverStr = await recover(web3, params, signStr);

      console.log('sign: ', signStr);
      console.log('recoverStr: ', recoverStr);
      setState(recoverStr);
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    if (!isLoading && isWeb3 && web3 !== null) {
      func(web3, accounts[0]);
    }
  }, [isLoading]);

  return (
    <Fragment>
      {isLoading ? (
        <p>...loading</p>
      ) : isWeb3 ? (
        <Fragment>
          <p>address: {accounts[0]}</p>
          <p>signed address: {state}</p>
        </Fragment>
      ) : (
        <p>provider error</p>
      )}
    </Fragment>
  );
};

export default App;
