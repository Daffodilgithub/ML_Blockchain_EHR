// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


import "hardhat/console.sol";

     contract Healthcare {

     uint256 public patientCount = 0;
     uint256 public doctorCount =  0;
    
     //  patient details
     struct PatientInfo {
        uint256 patientId; 
        string patientName;
        uint256 age;
        string email;
        uint256 patientPhone;
        string gender;
        string bloodGroup;
        string patientAddress;
        string medicalCondition; 
        string[] medicalReport;  
        string authenticateHash; 
     }

     struct Prediction {
        string prediction;
        uint256 timestamp; 
     }

     struct DoctorInfo {
        string doctorLicenseid;
        string doctorName;
        uint256 age;
        string email;
        uint256 doctorPhone;
        string gender;
        string doctorAddress;
        string specialization;
        string hospitalName;
        string doctorAuthenticateHash;
        bool isVerified;
     }
     
     // Mapping from patient ID to patient details
      mapping(uint256 => PatientInfo) private patientsById;
    
     // Mapping from patient's account address to patient ID
     mapping(address => uint256) private addressToPatientId;

      // Mapping from patient ID to predictions 
     mapping(uint256 => Prediction[]) private patientPrediction;

      // Mapping from doctor ID to details
      mapping(string => DoctorInfo) private doctorsByLicenseid;

      // Mapping from doctor's account address to details
      mapping(address => string) private addressToLicenseid;

      event DoctorRegistered(string doctorLicenseid);
      event DoctorDetailsUpdated(string doctorLicenseid);
      event PatientRegistered(uint256 patientId);
      event PatientDetailsUpdated(uint256 patientId);
      event MedicalReportAdded(uint256 patientId, string report);
      event PredictionAdded(uint256 patientId, string prediction);
      
     function regPatient(
     string memory _patientName,  uint256 _age,  string memory _email, uint256 _patientPhone, string memory _gender, string memory _bloodGroup, 
     string memory _patientAddress, string memory _medicalCondition, string[] memory _medicalReport, string memory _authenticateHash 
     ) public returns (uint256) {

        require(addressToPatientId[msg.sender] == 0, "Patient already registered!");
        uint256 randomPart = uint256(keccak256(abi.encodePacked(_patientPhone,_bloodGroup, msg.sender))) % 10000;
        uint256 patientId = patientCount + 1 + randomPart;
       
        PatientInfo memory newPatient = PatientInfo({
            patientId: patientId,
            patientName: _patientName,
            age: _age,
            email: _email,
            patientPhone: _patientPhone,
            gender: _gender,
            bloodGroup: _bloodGroup,
            patientAddress: _patientAddress,
            medicalCondition: _medicalCondition,
            medicalReport: _medicalReport,
            authenticateHash: _authenticateHash
            
         });
        patientsById[patientId] = newPatient;
        addressToPatientId[msg.sender] = patientId;
        patientCount++;
        emit PatientRegistered(patientId);
        return patientId; 
     }

     function addPrediction(
     uint256 _patientId,  string memory _prediction
      ) public returns (uint256) {
     require(patientsById[_patientId].patientId != 0, "Patient does not exist");

     Prediction[] storage predictions = patientPrediction[_patientId];
     if (predictions.length == 5) {
        for (uint256 i = 1; i < predictions.length; i++) {
            predictions[i - 1] = predictions[i];
        }
        predictions.pop();
     }
     predictions.push(Prediction({
        prediction: _prediction,
        timestamp: block.timestamp
     }));

     emit PredictionAdded(_patientId, _prediction);

     return 1; 
       }

     function getPredictions(uint256 _patientId) public view returns (Prediction[] memory) {
        require(patientsById[_patientId].patientId != 0, "Patient does not exist");

        
        return patientPrediction[_patientId];
     }

     // Function to update patient details
     function updatePatientDetails(
        uint256 _patientId, string memory _newPatientName, uint256 _newAge, string memory _newEmail,
        uint256 _newPatientPhone, string memory _newGender, string memory _newPatientAddress, string memory _newMedicalCondition
        
     ) public returns (uint256) {
        PatientInfo storage patient = patientsById[_patientId];
        require(patient.patientId != 0, "Patient does not exist");
        patient.patientName = _newPatientName;
        patient.age = _newAge;
        patient.email = _newEmail;
        patient.patientPhone = _newPatientPhone;
        patient.gender = _newGender;
        patient.patientAddress = _newPatientAddress;
        patient.medicalCondition = _newMedicalCondition;
        emit PatientDetailsUpdated(_patientId);
        return 1;
     }

     // update doctor details
     function updateDoctorDetails(
        string memory _doctorLicenseid, string memory _newDoctorName, uint256 _newAge, string memory _newEmail, uint256 _newDoctorPhone,
        string memory _newGender, string memory _newDoctorAddress, string memory _newSpecialization,string memory _newHospitalName
     ) public returns (uint256) {
        DoctorInfo storage doctor = doctorsByLicenseid[_doctorLicenseid];
        require(bytes(doctor.doctorLicenseid).length != 0, "Doctor does not exist");

        doctor.doctorName = _newDoctorName;
        doctor.age = _newAge;
        doctor.email = _newEmail;
        doctor.doctorPhone = _newDoctorPhone;
        doctor.gender = _newGender;
        doctor.doctorAddress = _newDoctorAddress;
        doctor.specialization = _newSpecialization;
        doctor.hospitalName = _newHospitalName;

        emit DoctorDetailsUpdated(_doctorLicenseid);
        return 1;
     }

     function addMedicalReport(
        uint256 _patientId,
        string memory _medicalReport
     ) public returns (uint256) {
        require(patientsById[_patientId].patientId != 0, "Patient does not exist");
        patientsById[_patientId].medicalReport.push(_medicalReport);
        emit MedicalReportAdded(_patientId, _medicalReport);
        return 1;
     }

     function retrievePatientDetails(
        uint256 _patientId
     )
        public
        view
        returns (
            uint256 patientId, string memory patientName, uint256 age, string memory email, uint256 patientPhone, string memory gender,
            string memory bloodGroup,  string memory patientAddress, string memory medicalCondition, string[] memory medicalReport
        )
     {
        PatientInfo memory p = patientsById[_patientId];
        return (
            p.patientId,
            p.patientName,
            p.age,
            p.email,
            p.patientPhone,
            p.gender,
            p.bloodGroup,
            p.patientAddress,
            p.medicalCondition,
            p.medicalReport
            
        );
     }

     //retrieve doctor details
     function retrieveDoctorDetails(
        string memory _doctorLicenseid
     )
        public
        view
        returns (
            string memory doctorLicenseid, string memory doctorName, uint256 age, string memory email, uint256 doctorPhone,
            string memory gender, string memory doctorAddress, string memory specialization, string memory hospitalName
        )
     {
        DoctorInfo memory d = doctorsByLicenseid[_doctorLicenseid];
        require(bytes(d.doctorLicenseid).length != 0, "Doctor does not exist");

        return (
            d.doctorLicenseid,
            d.doctorName,
            d.age,
            d.email,
            d.doctorPhone,
            d.gender,
            d.doctorAddress,
            d.specialization,
            d.hospitalName
        );
     }

     // Function to get final hash for login validation login 
     function getSignatureHash(uint256 _patientId) public view returns (string memory) {
        PatientInfo memory patient = patientsById[_patientId];
        require(patient.patientId != 0, "Patient does not exist");
        return patient.authenticateHash;
     }

     // doctor authentication hash

     function getDoctorSignatureHash(string memory _doctorLicenseid) public view returns (string memory) {
     DoctorInfo memory doctor = doctorsByLicenseid[_doctorLicenseid];
    
     require(bytes(doctor.doctorLicenseid).length != 0, "Doctor does not exist");

     return doctor.doctorAuthenticateHash;
     }

     function isPatientExistsByPatientId(
        uint256 _patientId
     ) public view returns (bool) {
        return patientsById[_patientId].patientId != 0;
     }

    
     function getPatientIdByAddress(address _patientAddress) public view returns (uint256) {
        return addressToPatientId[_patientAddress];
     }
    
     function isDoctorExistsByLicenseid(string memory _doctorLicenseid) public view returns (bool) {
     return bytes(doctorsByLicenseid[_doctorLicenseid].doctorLicenseid).length != 0;
     }


      function getDoctorLicenseidByAddress(address _doctorAddress) public view returns (string memory) {
      return addressToLicenseid[_doctorAddress];
     }

      // Doctor registration function
     function regDoctor(
     string memory _doctorName, uint256 _age, string memory _email, uint256 _doctorPhone, string memory _gender, string memory _doctorAddress,
     string memory _specialization, string memory _hospitalName, string memory _licenseid, string memory _doctorAuthenticateHash
     ) public returns (string memory) {
        require(bytes(addressToLicenseid[msg.sender]).length == 0, "Doctor already registered!");
        //license verification off chain
        DoctorInfo memory newDoctor = DoctorInfo({
            doctorLicenseid: _licenseid,
            doctorName: _doctorName,
            age: _age,
            email: _email,
            doctorPhone: _doctorPhone,
            gender: _gender,
            doctorAddress: _doctorAddress,
            specialization: _specialization,
            hospitalName: _hospitalName,
            doctorAuthenticateHash: _doctorAuthenticateHash,
            isVerified: true  // Doctor is assumed to be verified off-chain
        });

        doctorsByLicenseid[_licenseid] = newDoctor;
        addressToLicenseid[msg.sender] = _licenseid;
        emit DoctorRegistered(_licenseid);
        return _licenseid;
     }


     event DoctorRequestedAccess(uint256 patientId, string patientName, address doctorAddress, string doctorName, string hospitalName, string specialization);
     event AccessGranted(uint256 patientId, string doctorLicenseid);

      // Mapping from doctor license ID to patient ID
      mapping(string => uint256) private doctorAccess;
      event AccessDenied(uint256 patientId, string doctorLicenseid);

        function requestAccess(uint256 _patientId, string memory _patientName) public  returns (bool) {
        string memory doctorLicenseid = addressToLicenseid[msg.sender];
        require(bytes(doctorLicenseid).length != 0, "Doctor not registered");

        DoctorInfo memory doctor = doctorsByLicenseid[doctorLicenseid];
        require(patientsById[_patientId].patientId != 0, "Patient does not exist");
        emit DoctorRequestedAccess(_patientId, _patientName, msg.sender, doctor.doctorName, doctor.hospitalName, doctor.specialization);
        return true;
        }
     
     

     function grantAccess(uint256 _patientId, string memory _doctorLicenseid) public returns (bool) {
      
      require(patientsById[_patientId].patientId != 0, "Patient does not exist");
      require(bytes(doctorsByLicenseid[_doctorLicenseid].doctorLicenseid).length != 0, "Doctor does not exist");
      require(doctorAccess[_doctorLicenseid] == 0, "Doctor already has access");

      doctorAccess[_doctorLicenseid] = _patientId;
      emit AccessGranted(_patientId, _doctorLicenseid);

      return true;
     }


    
     function denyAccess(uint256 _patientId, string memory _doctorLicenseid) public returns (bool) {

      require(patientsById[_patientId].patientId != 0, "Patient does not exist");
      require(bytes(doctorsByLicenseid[_doctorLicenseid].doctorLicenseid).length != 0, "Doctor does not exist");
      emit AccessDenied(_patientId, _doctorLicenseid);
      return true;
      }

     event AccessRevoked(uint256 patientId, string doctorLicenseid);

     function revokeAccess(string memory _doctorLicenseid) public returns (bool) {
     uint256 patientId = addressToPatientId[msg.sender];
     require(patientsById[patientId].patientId != 0, "Patient does not exist");
     require(bytes(doctorsByLicenseid[_doctorLicenseid].doctorLicenseid).length != 0, "Doctor does not exist");
     require(doctorAccess[_doctorLicenseid] == patientId, "Access not granted to this doctor");
     delete doctorAccess[_doctorLicenseid];
     emit AccessRevoked(patientId, _doctorLicenseid);
     return true;
     }

    }



