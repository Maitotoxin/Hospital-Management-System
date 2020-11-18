DROP DATABASE IF EXISTS hms;
CREATE DATABASE hms;
USE hms;

CREATE TABLE appointment (
    appointment_id      INT NOT NULL AUTO_INCREMENT,
    estimated_duration  INT NOT NULL,
    appointment_time    DATETIME NOT NULL,
    last_update         DATETIME NOT NULL,
    PRIMARY KEY (appointment_id)
);

ALTER TABLE appointment
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE hospital (
    hospital_id       INT NOT NULL AUTO_INCREMENT,
    st_address        VARCHAR(30) NOT NULL,
    city              VARCHAR(30) NOT NULL,
    state             VARCHAR(2) NOT NULL,
    zipcode           VARCHAR(5) NOT NULL,
    phone             VARCHAR(14) NOT NULL,
    maximun_patients  INT NOT NULL,
    last_update       DATETIME NOT NULL,
    PRIMARY KEY (hospital_id)
);

ALTER TABLE hospital
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE icd (
    icd_id        INT NOT NULL AUTO_INCREMENT,
    disease_name  VARCHAR(30) NOT NULL,
    last_update   DATETIME NOT NULL,
    PRIMARY KEY (icd_id)
);

ALTER TABLE icd
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE in_patient (
    patient_id INT NOT NULL,
    PRIMARY KEY (patient_id)
);




CREATE TABLE insurance_company (
    provider_id   INT NOT NULL,
    company_name  VARCHAR(30) NOT NULL,
    last_update   DATETIME NOT NULL,
    PRIMARY KEY (provider_id)
);
ALTER TABLE insurance_company
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE invoice (
    invoice_id                  INT NOT NULL AUTO_INCREMENT,
    price                       DECIMAL(8, 2) NOT NULL,
    due_date                    DATETIME NOT NULL,
    last_update                 DATETIME NOT NULL,
    PRIMARY KEY (invoice_id)
);

ALTER TABLE invoice
ALTER last_update SET DEFAULT sysdate;
CREATE TABLE lab (
    lab_id                      INT NOT NULL AUTO_INCREMENT,
    lab_name                    VARCHAR(30) NOT NULL,
    last_update                 DATETIME NOT NULL,
    PRIMARY KEY (lab_id)
);
ALTER TABLE lab
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE out_patient (
    patient_id INT NOT NULL,
    PRIMARY KEY (patient_id)
);



CREATE TABLE patient (
    patient_id                     VARCHAR(30) NOT NULL,
    first_name                     VARCHAR(30) NOT NULL,
    last_name                      VARCHAR(30) NOT NULL,
    password                       VARCHAR(200) NOT NULL,
    st_address                     VARCHAR(30) NOT NULL,
    city                           VARCHAR(30) NOT NULL,
    state                          VARCHAR(20) NOT NULL,
    zipcode                        VARCHAR(5) NOT NULL,
    phone                          VARCHAR(14) NOT NULL,
    birthdate                      DATETIME NOT NULL,
    gender                         VARCHAR(1) NOT NULL,
    patient_class                  CHAR(1) NOT NULL,
    last_update                    DATETIME NOT NULL,
    PRIMARY KEY (patient_id)
);
ALTER TABLE patient
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE receipt (
    receipt_id          INT NOT NULL AUTO_INCREMENT,
    amount              DECIMAL(7, 2) NOT NULL,
    payment_method      VARCHAR(30) NOT NULL,
    last_update         DATETIME NOT NULL,
    PRIMARY KEY (receipt_id)
);
ALTER TABLE receipt
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE staff (
    staff_id             VARCHAR(30) NOT NULL,
    first_name            VARCHAR(30) NOT NULL,
    password              VARCHAR(200) NOT NULL,
    last_name             VARCHAR(30) NOT NULL,
    st_address            VARCHAR(30) NOT NULL,
    city                  VARCHAR(30) NOT NULL,
    state                 VARCHAR(2) NOT NULL,
    zipcode               VARCHAR(5) NOT NULL,
    phone                 VARCHAR(14) NOT NULL,
    birthdate             DATETIME NOT NULL,
    gender                VARCHAR(1) NOT NULL,
    staff_class           TINYINT NOT NULL,
    last_update           DATETIME NOT NULL,
    PRIMARY KEY (staff_id)
);

ALTER TABLE staff
ALTER last_update SET DEFAULT sysdate;


CREATE TABLE treatment (
    treatment_id   INT NOT NULL AUTO_INCREMENT,
    type           VARCHAR(30) NOT NULL,
    medicine_name  VARCHAR(30) NOT NULL,
    dose           VARCHAR(30) NOT NULL,
    price          DECIMAL(7, 2) NOT NULL,
    last_update    DATETIME NOT NULL,
    PRIMARY KEY (treatment_id)
);

ALTER TABLE treatment
ALTER last_update SET DEFAULT sysdate;

CREATE TABLE ward (
    ward_id                INT NOT NULL AUTO_INCREMENT,
    status                 TINYINT NOT NULL,
    last_update            DATETIME NOT NULL,
    PRIMARY KEY (ward_id)
);
ALTER TABLE ward
ALTER last_update SET DEFAULT sysdate;

 delimiter //
CREATE TRIGGER appointment_up_dt_trg BEFORE
    UPDATE ON appointment
    FOR EACH ROW
BEGIN
   SET: new.last_update = sysdate();
END;
/
 delimiter ;
  delimiter //

CREATE TRIGGER hospital_up_dt_trg BEFORE
    UPDATE ON hospital
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 delimiter //

CREATE TRIGGER icd_up_dt_trg BEFORE
    UPDATE ON icd
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 delimiter //

CREATE TRIGGER insurance_company_up_dt_trg BEFORE
    UPDATE ON insurance_company
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 delimiter //

CREATE  TRIGGER lab_up_dt_trg BEFORE
    UPDATE ON lab
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER patient_lab_up_dt_trg BEFORE
    UPDATE ON patient_lab
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER staff_up_dt_trg BEFORE
    UPDATE ON staff
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER treatment_dt_trg BEFORE
    UPDATE ON treatment
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER ward_dt_trg BEFORE
    UPDATE ON ward
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;