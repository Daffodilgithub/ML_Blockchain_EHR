import SignData from './SignData'; 

const Authvalidation = async (username, accountAddress, password, digicode, web3, storedFinalHash) => {

    const signedData = await SignData(username, accountAddress, web3);  
    const hash2 = await web3.eth.accounts.hashMessage(password + digicode);  
    const generatedHash = await web3.eth.accounts.hashMessage(signedData + hash2);
    console.log(generatedHash)

    if (generatedHash === storedFinalHash) {    
        return true;
    } else {
        
        return false;
    }
};

export default Authvalidation;
