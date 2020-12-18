const guard = (req, res, next) => {
    // if(req.url != '/login' && req.url != '/register' && !req.session.userid) {
    //     res.redirect('/login');
    // } else {
    //     next();
    // }
    const url = req.url;
    const didPatientLogin = req.session.patient_id;
    const didStaffLogin = req.session.staff_id;
    const didAdminLogin = req.session.adminid;
    if(url == '/error') {
        next();
        return;
    }
    if(!didPatientLogin && !didStaffLogin) {
        if(url != 'patient/login' && url != 'patient/register' ) {
            res.redirect('/error');
        } else{
            next();
        }
    } else if(didUserLogin && !didAdminLogin) {
        if(url == '/staff/dashboard' || url == '/staff/logout' ||url == '/admin/adminUserDisplay' ||url == '/admin/adminPolicyDisplay' ||url == '/admin/adminPolicyRegister' ||url == '/admin/adminHomeDisplay' ||url == '/admin/adminAutoDisplay' ||url == '/admin/adminHomeInvoiceDisplay' ||url == '/admin/adminAutoInvoiceDisplay' ||url == '/admin/adminHomePayDisplay' ||url == '/admin/adminAutoPayDisplay' ||url == '/admin/adminDriverDisplay') {
            res.redirect('/staff/login');
        } else if (url == 'patient/login' || url == 'patient/register'){
            res.redirect('patient/dashboard');
        } else {
            next();
        }
    } else {
        next();
    }
}
module.exports = guard;