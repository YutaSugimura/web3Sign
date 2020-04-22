import Web3 from 'web3';

export const sign = async (
  web3: Web3,
  address: string,
  params: string,
  password: string,
): Promise<string> => {
  const hex = await web3.utils.utf8ToHex(params);
  return await web3.eth.personal.sign(hex, address, password);
};
