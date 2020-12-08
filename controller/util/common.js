exports.correctPatientInfo = correctPatientInfo;
exports.correctAppointmentInfo = correctAppointmentInfo;

function correctPatientInfo(patientInfo) {
    switch (patientInfo.gender) {
        case 'M':
            patientInfo.gender = 'Male';
            break;
        case 'F':
            patientInfo.gender = 'Female';
            break;
        default:
            break;
    }
    switch (patientInfo.patient_class) {
        case '1':
            patientInfo.patient_class = 'In-patient';
            break;
        case '0':
            patientInfo.patient_class = 'Out-patient';

    }
}

function correctAppointmentInfo(appointmentInfo){
    console.log("enter function for correcting valid value")
    switch (appointmentInfo.valid){
        case '0': 
            appointmentInfo.valid = 'Waiting';
            break;
        case '1':
            appointmentInfo.valid = 'Accept';
            break;
        case '2':
            appointmentInfo.valid = 'Complete';
            break;
        case '3':
            appointmentInfo.valid = 'Abort';
            break;
    }
}
