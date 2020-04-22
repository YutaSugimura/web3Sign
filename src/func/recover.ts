import Web3 from 'web3';

export const recover = async (
  web3: Web3,
  params: string,
  sign: string,
): Promise<string> => {
  return await web3.eth.personal.ecRecover(params, sign);
};
