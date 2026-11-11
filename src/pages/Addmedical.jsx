import { useState,useEffect } from "react";
const Addmedical=({state})=>{
  const {account,contract,web3}=state;
  console.log(account,contract);
  //const [patientId, setPatientId] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler=(e) => {
    setSelectedFile(e.target.files[0]);
  };




  const handleSubmit = async (event) => {

    event.preventDefault();
    
    try{

      console.log(account)
      console.log(contract.methods)

      

        const formData=new FormData();
        formData.append("file",selectedFile);
        const metadata=JSON.stringify({name:selectedFile.name});
        formData.append("pinataMetadata",metadata);

        const options=JSON.stringify({
            cidVersion: 0
        });

        formData.append("pinataOptions",options);

        const res=await fetch(

            "https://api.pinata.cloud/pinning/pinFileToIPFS",

            {
                method:"POST",
                headers:{

                    Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NDMxMmE2Yy00YjIzLTQxYWMtYTE5Yy02YmM5Yjg0YTZkNTQiLCJlbWFpbCI6InNhZ2FyaWthMDEwMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJmZGM4NWQzMDAwZGZiMTBhYTNkIiwic2NvcGVkS2V5U2VjcmV0IjoiOWViMTM0MWRjNzBkNjBlZWFjODYxNDkwNGE5ZDVhYmRjMzgwYTg4ZDliOGQ4MTMwMGMyOGIzNmY5YzhjOWI4YyIsImV4cCI6MTc1NDgzODAwMX0.FJpwCIdY6YSt2Ia6J46vx-E8CiHcyflv4WA-AXSrjYQ`

                } ,
                body: formData
            }


        );

        const resData=await res.json();
        console.log(resData) 

        const medicalreportHash=resData.IpfsHash

        

        if (medicalreportHash && contract && contract.methods) {
            const id = await contract.methods.getPatientIdByAddress(account).call();
            console.log(id);
            if (id) {
                const result = await contract.methods.addMedicalReport(id, medicalreportHash).send({ from: account });
                alert("report stored in the contract successfully:");
              } else {

                console.log("could not store medical report");
                
              }
           
                
             
            



    }
   }catch(error)
    {
        console.error(error);
       
    }



};





    return<>
    <div>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
          <label>Medical Report </label>
          <input
            type="file"
            onChange={changeHandler}
            required
          />
        </div>

        <button type="submit">Submit
        </button>


        </form>
    </div>
   
    </>
}
export default Addmedical;