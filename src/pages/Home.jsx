import {Web3} from "web3"
import ABI from "./ABI.json"
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import "./Home.css"
const Home=({saveState})=>{
    
  const [isLoading,setIsloading]=useState(false)
  const [errormsg,setErrormsg]=useState(null)

     const navigateTo=useNavigate()
     const connectWallet=async()=>
        {

            try {
              setIsloading(true);
                if (window.ethereum) {
                  const web3 = new Web3(window.ethereum);
                  const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                  });
                  const contractAddress = "0x679d12b269189a343bafd6b6269066f70bec676f";
                  
                  const contract = new web3.eth.Contract(ABI, contractAddress);
                  console.log(contract)
                  saveState({ web3: web3, contract: contract, account: accounts[0] });
                  navigateTo("/start")     
                  
                } else {
                  throw new Error('Metamask is not installed! Please install it') 

                }
              } catch (error) {
                setErrormsg(error.message)
                console.error(error);
              }
              finally{
                setIsloading(false);
              }
                
     }




    return(
      <div className="home-page">
      <div className="home-container">
        <h1>Welcome to the Patient  DApp</h1>
        {errormsg && <div className="error-message">{errormsg}</div>} {/* Display error message */}
      </div>
      <div className="centered-btn">
        <button 
          onClick={connectWallet} 
          disabled={isLoading} // Disable button during loading
          className="connect-btn"
        >
          {isLoading ? 'Connecting...' : 'Connect MetaMask Wallet'}
        </button>
      </div>
      
    </div>
    );
}

export default Home;

