DROP DATABASE IF EXISTS hms;
CREATE DATABASE hms;
USE hms;

CREATE TABLE test(
   test_id             INT NOT NULL AUTO_INCREMENT,
   test_name           VARCHAR(30) NOT NULL,
   description         VARCHAR(200),
   price               DECIMAL(7, 2) NOT NULL,
   last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP,
   PRIMARY KEY (test_id)
);

CREATE TABLE test_lab(
    test_id             INT NOT NULL,
    test_name           VARCHAR(30) NOT NULL,
    lab_id              INT NOT NULL,
    lab_name            VARCHAR(30) NOT NULL,
    last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP
);

CREATE TABLE test_appointment (
    appointment_id      INT NOT NULL AUTO_INCREMENT,
    patient_no          INT NOT NULL,
    lab_id              INT NOT NULL,
    test_id             INT NOT NULL,
    invoice_id          INT,
    appointment_time    DATETIME NOT NULL default CURRENT_TIMESTAMP,
    last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP,
    valid               CHAR(1) NOT NULL,
    result              CHAR(1),            
    PRIMARY KEY (appointment_id)
);

CREATE TABLE doctor_appointment (
    appointment_id      INT NOT NULL AUTO_INCREMENT,
    patient_no          INT NOT NULL,
    staff_no            INT NOT NULL,
    appointment_time    DATETIME NOT NULL default CURRENT_TIMESTAMP,
    last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP,
    valid               CHAR(1) NOT NULL,                                     
    PRIMARY KEY (appointment_id)
);

CREATE TABLE hospital (
    hospital_id       INT NOT NULL AUTO_INCREMENT,
    hospital_name     VARCHAR(30) NOT NULL,
    st_address        VARCHAR(30) NOT NULL,
    city              VARCHAR(30) NOT NULL,
    state             VARCHAR(2) NOT NULL,
    zipcode           VARCHAR(5) NOT NULL,
    phone             VARCHAR(14) NOT NULL,
    maximun_patients  INT NOT NULL,
    last_update       DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (hospital_id)
);



CREATE TABLE icd (
    icd_id        INT NOT NULL AUTO_INCREMENT,
    disease_name  VARCHAR(30) NOT NULL,
    description    VARCHAR(200),
    last_update   DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (icd_id)
);


CREATE TABLE in_patient (
    patient_id                  INT NOT NULL,
    last_update                 DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (patient_id)
);


CREATE TABLE insurance_company (
    provider_id   INT NOT NULL,
    company_name  VARCHAR(30) NOT NULL,
    discount      INT NOT NULL,
    last_update   DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (provider_id)
);

CREATE TABLE invoice (
    invoice_id                  INT NOT NULL AUTO_INCREMENT,
    patient_no                  INT NOT NULL,
    price                       DECIMAL(8, 2) NOT NULL default 0,
    price_paid                  INT NOT NULL default 0,
    appointment_id              INT,
    type                        CHAR(1),
    due_date                    DATETIME NOT NULL default CURRENT_TIMESTAMP,
    last_update                 DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id)
);

CREATE TABLE patient_icd(
   invoice_id          INT NOT NULL,
   patient_no          INT NOT NULL,
   icd_id              INT NOT NULL,
   last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP
);
 

CREATE TABLE lab (
    lab_id                      INT NOT NULL AUTO_INCREMENT,
    lab_name                    VARCHAR(30) NOT NULL,
    description                 VARCHAR(200),
    st_address                  VARCHAR(30),
    city                        VARCHAR(30),
    state                       VARCHAR(2),
    zipcode                     VARCHAR(5),
    last_update                 DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (lab_id)
);

CREATE TABLE out_patient (
    patient_id                  INT NOT NULL,
    last_update                 DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (patient_id)
);



CREATE TABLE patient (
    patient_id                     VARCHAR(30) NOT NULL,
    patient_no                     INT NOT NULL AUTO_INCREMENT,
    first_name                     VARCHAR(30) NOT NULL,
    last_name                      VARCHAR(30) NOT NULL,
    password                       VARCHAR(200) NOT NULL,
    st_address                     VARCHAR(30) NOT NULL,
    city                           VARCHAR(30) NOT NULL,
    state                          VARCHAR(20) NOT NULL,
    zipcode                        VARCHAR(5) NOT NULL,
    phone                          VARCHAR(14) NOT NULL,
    birthdate                      DATETIME NOT NULL default CURRENT_TIMESTAMP,
    gender                         VARCHAR(1) NOT NULL,
    patient_class                  CHAR(1) NOT NULL default '0',
    last_update                    DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (patient_no)
);


CREATE TABLE receipt (
    receipt_id          INT NOT NULL AUTO_INCREMENT,
    invoice_id          INT NOT NULL,
    patient_id          VARCHAR(30) NOT NULL,
    amount              DECIMAL(7, 2) NOT NULL,
    payment_method      VARCHAR(30) NOT NULL,
    last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (receipt_id)
);


CREATE TABLE staff (
    staff_id              VARCHAR(30) NOT NULL,
    staff_no              INT NOT NULL AUTO_INCREMENT,
    hospital_id           INT,
    first_name            VARCHAR(30) NOT NULL,
    password              VARCHAR(200) NOT NULL,
    description           VARCHAR(200),
    last_name             VARCHAR(30) NOT NULL,
    st_address            VARCHAR(30) NOT NULL,
    city                  VARCHAR(30) NOT NULL,
    state                 VARCHAR(30) NOT NULL,
    zipcode               VARCHAR(5) NOT NULL,
    phone                 VARCHAR(14) NOT NULL,
    birthdate             DATETIME NOT NULL default CURRENT_TIMESTAMP,
    gender                VARCHAR(1) NOT NULL,
    staff_class           CHAR(1) NOT NULL,
    last_update           DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (staff_no)
);




CREATE TABLE medicine (
    medicine_id   INT NOT NULL AUTO_INCREMENT,
    description    VARCHAR(200),
    medicine_name  VARCHAR(30) NOT NULL,
    dose           VARCHAR(30) NOT NULL,
    price          DECIMAL(7, 2) NOT NULL,
    last_update    DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (medicine_id)
);

CREATE TABLE patient_medicine(
   invoice_id          INT NOT NULL,
   patient_no          INT NOT NULL,
   medicine_id              INT NOT NULL,
   amount           INT NOT NULL,
   last_update   DATETIME NOT NULL default CURRENT_TIMESTAMP
);

CREATE TABLE treatment (
    treatment_id   INT NOT NULL AUTO_INCREMENT,
    description    VARCHAR(200),
    treatment_name  VARCHAR(30) NOT NULL,
    
    price          DECIMAL(7, 2) NOT NULL,
    last_update    DATETIME NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (treatment_id)
);

CREATE TABLE patient_treatment(
   invoice_id          INT NOT NULL,
   patient_no          INT NOT NULL,
   treatment_id              INT NOT NULL,
   times           INT NOT NULL,
   last_update   DATETIME NOT NULL default CURRENT_TIMESTAMP
);

CREATE TABLE ward (
    ward_id                INT NOT NULL AUTO_INCREMENT,
    status                 CHAR(1) NOT NULL,
    last_update            DATETIME NOT NULL default CURRENT_TIMESTAMP,
    hospital_id            INT NOT NULL,
    PRIMARY KEY (ward_id)
);

CREATE TABLE patient_ward(
   invoice_id          INT NOT NULL,
   patient_no          INT NOT NULL,
   ward_id             INT NOT NULL,
   hospital_id         INT NOT NULL,
   last_update         DATETIME NOT NULL default CURRENT_TIMESTAMP
);


 delimiter $$
CREATE TRIGGER invoice_up_dt_trg BEFORE
    UPDATE ON invoice
    FOR EACH ROW
BEGIN
   SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$
CREATE TRIGGER receipt_up_dt_trg BEFORE
    UPDATE ON receipt
    FOR EACH ROW
BEGIN
   SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

  delimiter $$
CREATE TRIGGER test_appointment_up_dt_trg BEFORE
    UPDATE ON test_appointment
    FOR EACH ROW
BEGIN
   SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

  delimiter $$
CREATE TRIGGER doctor_appointment_up_dt_trg BEFORE
    UPDATE ON doctor_appointment
    FOR EACH ROW
BEGIN
   SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;
 
  delimiter $$

CREATE TRIGGER hospital_up_dt_trg BEFORE
    UPDATE ON hospital
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$

CREATE TRIGGER patient_icd_up_dt_trg BEFORE
    UPDATE ON patient_icd
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$

CREATE TRIGGER patient_medicine_up_dt_trg BEFORE
    UPDATE ON patient_medicine
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$

CREATE TRIGGER patient_treatment_up_dt_trg BEFORE
    UPDATE ON patient_treatment
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$

CREATE TRIGGER icd_up_dt_trg BEFORE
    UPDATE ON icd
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$

CREATE TRIGGER insurance_company_up_dt_trg BEFORE
    UPDATE ON insurance_company
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$

CREATE  TRIGGER lab_up_dt_trg BEFORE
    UPDATE ON lab
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;
 
 
 delimiter $$
CREATE TRIGGER staff_up_dt_trg BEFORE
    UPDATE ON staff
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

  delimiter $$
CREATE TRIGGER patient_up_dt_trg BEFORE
    UPDATE ON patient
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;
 
 delimiter $$
CREATE TRIGGER treatment_dt_trg BEFORE
    UPDATE ON treatment
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;
 
  delimiter $$
CREATE TRIGGER medicine_dt_trg BEFORE
    UPDATE ON medicine
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$
CREATE TRIGGER ward_dt_trg BEFORE
    UPDATE ON ward
    FOR EACH ROW
BEGIN
     SET NEW.last_update = CURRENT_TIMESTAMP;
END$$

 delimiter ;

 delimiter $$
CREATE TRIGGER test_appointment_invoice_trg AFTER
    INSERT ON test_appointment
    FOR EACH ROW
BEGIN
    insert into invoice (appointment_id,patient_no) values (NEW.appointment_id, NEW.patient_no);
    
END$$

 delimiter ;

