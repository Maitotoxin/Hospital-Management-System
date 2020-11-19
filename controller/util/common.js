exports.correctPatientInfo = correctPatientInfo;

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
