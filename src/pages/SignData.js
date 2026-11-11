
const SignData = async (username, accountAddress, web3) => {
    try {
      // Validate the Ethereum address
      if (!web3.utils.isAddress(accountAddress)) {
        throw new Error("Invalid Ethereum address");
      }
  
      
      if (accountAddress === undefined || accountAddress === null) {
        throw new Error("No account address provided or MetaMask is not connected.");
      }
  
      
      const signature = await web3.eth.personal.sign(username, accountAddress,'');
  
      
      const hashedSignature = web3.eth.accounts.hashMessage(signature);
  
      return hashedSignature; // Return the hashed signature
    } catch (error) {
      console.error("Error signing data:", error);
      throw new Error("Failed to sign the data.");
    }
  };
  
  export default SignData;
  