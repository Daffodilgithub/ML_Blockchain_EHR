
import SignData from './SignData';

const AuthenticationHash = async (username, accountAddress, password, digiCode, web3) => {
  try {
    
    let signedMessage = await SignData(username, accountAddress, web3);

    let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + digiCode);

    const finalHash = await web3.eth.accounts.hashMessage(signedMessage + passwordDigiCodeHash);

    return finalHash;
    
  } catch (error) {
    console.error("Error generating authentication hash:", error);
    throw new Error("Failed to generate authentication hash.");
  }
};

export default AuthenticationHash;
