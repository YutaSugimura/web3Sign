import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getWeb3 from '../utils/getWeb3';

type State = {
  isLoading: boolean;
  isWeb3: boolean;
  web3: Web3 | null;
  accounts: string[];
};

const Hooks = (): State => {
  const [state, setState] = useState<State>({
    isLoading: true,
    isWeb3: false,
    web3: null,
    accounts: [],
  });

  const func = async (): Promise<void> => {
    try {
      const web3: Web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setState({
        ...state,
        isLoading: false,
        isWeb3: true,
        web3,
        accounts,
      });
    } catch {
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    func();
  }, []);

  return state;
};
export default Hooks;
