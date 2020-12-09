exports.correctPatientInfo = correctPatientInfo;
exports.correctAppointmentInfo = correctAppointmentInfo;
exports.correctStaffInfo = correctStaffInfo;

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
    for(var i = 0; i < appointmentInfo.length; ++i) {
        switch (appointmentInfo[i].valid){
            case '0': 
                appointmentInfo[i].valid = 'Waiting';
                break;
            case '1':
                appointmentInfo[i].valid = 'Accept';
                break;
            case '2':
                appointmentInfo[i].valid = 'Complete';
                break;
            case '3':
                appointmentInfo[i].valid = 'Abort';
                break;
        }
    }
}

function correctStaffInfo(staffInfo) {
    switch (staffInfo.gender) {
        case 'M':
            staffInfo.gender = 'Male';
            break;
        case 'F':
            staffInfo.gender = 'Female';
            break;
        default:
            break;
    }
    switch (staffInfo.staff_class) {
        case 'D':
            staffInfo.staff_class = 'Doctor';
            break;
        case 'N':
            staffInfo.staff_class = 'Nurse';

    }
}