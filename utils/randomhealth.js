// Function to generate random doctor data for transactions
function generateRandomDoctorData() {
    const doctorNames = ["Alice", "Bob", "Charlie", "David", "Eve"];
  //  const randomPhoneNumbers = [7612539756, 9876543210, 9876547510, 8796452178, 9876123473];
   // const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
   // const genders = ["Male", "Female"];
    
  //  const randomAddresses = ["123 Main St", "456 Oak Rd", "789 Pine Ln", "101 Maple Ave", "202 Birch Blvd"];
    
      
      const randomAuthHashes = [
        "0x3c4e9e87556a76f3d95bcf06772e6d4103fd33aeb764464927a43018be88d7a",
        "0x5e1f9a7b8aebd9f032b1a8bde96a6fa22e69ed9da90de9f3d1d3f11f45b50e9e",
        "0x8d23b29c2ffaffd11b3d1df4fcff1f72df727eb3ea9ad1b72b5c242bc0220ff3",
        "0xd9b60c70d7677a29b8b8813376230a51506282c3c3950b02c637fe7dbd2d3146",
        "0xadf6e8e2a0d0b6b458292adfc44be0ea2abf5e949e7e01e7de4bc118c17b451",
        "0x5f6b96a19b836a72e44149cd842e11a0c30c9bfe09d030e60b649f69a594855",
        "0x2c40299d6271e364da557b6ab670f3a82c97d07d139987c6ac3b8d8e96d12f17",
        "0x8bb0f7b74302d0fcada29e68824db6b28adad635fd869276a51e3d6c9e86f54e",
        "0x3d1e0720538c23c2d2f07907b22d77c8de35ec72a2d44d43e5323fdb387b8d39",
        "0x0564a9c983c73ac0be4ea40c06093751011fc7c8304b1e3f396b34b7d6048ab8"
      ];
      

      const licenseids=["D4B9K2H1W6",
        "M7N3F4T2V0",
        "X9Z1H5L3D7",
        "T2R8K1V5B0",
        "J5E6L9X1Q3",
        "C4A9J6P0L2",
        "N1B4M3S7F0",
        "S6H8G3Z1T5"];


        const specializations=["Cardiologist",
          "Neurologist",
          "Orthopedic Surgeon",
          "Pediatrician",
          "Dermatologist",
          "Gastroenterologist",
          "Endocrinologist",
          "Psychiatrist",
          "Oncologist"];

          const hospitalNames = [
            "St. Michael's Medical Center",
            "Hope Valley General Hospital",
            "Greenwood Health Institute",
            "Clearview Medical Clinic",
            "Silver Oaks Hospital",
            "Sunrise Wellness Center",
            "Mountain Ridge Hospital",
            "City Care Hospital",
            "Maple Leaf Health Center",
            "Lakeside Regional Hospital",
            "Riverbend Health Clinic",
            "Beacon Health Hospital",
            "Blue Sky Medical Center",
            "North Shore Community Hospital",
            "Golden Gate Medical Institute"
          ];
          


    
    // Generate random values for the patient data
    const doctorName = doctorNames[Math.floor(Math.random() * doctorNames.length)];
  //  const age = Math.floor(Math.random() * (80 - 18 + 1)) + 18;
  //  const email = `${doctorName.toLowerCase()}@gmail.com`;
    const doctorPhone = Math.floor(Math.random() * 1000000000) + 1000000000;
  //  const gender = genders[Math.floor(Math.random() * genders.length)];
    
  //  const doctorAddress = randomAddresses[Math.floor(Math.random() * randomAddresses.length)];
    const specialization=specializations[Math.floor(Math.random() * specializations.length)];
    const hospitalName=hospitalNames[Math.floor(Math.random() * hospitalNames.length)]
    const licenseid=licenseids[Math.floor(Math.random() * licenseids.length)];
    const authenticateHash = randomAuthHashes[Math.floor(Math.random() * randomAuthHashes.length)]; 
  
    
    return {
      doctorName,
      doctorPhone,
      specialization,
      hospitalName,
      licenseid,
      authenticateHash
    };
  }
  
  module.exports = { generateRandomDoctorData };
  