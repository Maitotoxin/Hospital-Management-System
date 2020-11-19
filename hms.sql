DROP DATABASE IF EXISTS hms;
CREATE DATABASE hms;
USE hms;

CREATE TABLE appointment (
    appointment_id      INT NOT NULL AUTO_INCREMENT,
    estimated_duration  INT NOT NULL,
    appointment_time    DATETIME NOT NULL default current_timestamp,
    last_update         DATETIME NOT NULL default current_timestamp,
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
    last_update       DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (hospital_id)
);



CREATE TABLE icd (
    icd_id        INT NOT NULL AUTO_INCREMENT,
    disease_name  VARCHAR(30) NOT NULL,
    last_update   DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (icd_id)
);


CREATE TABLE in_patient (
    patient_id INT NOT NULL,
    PRIMARY KEY (patient_id)
);




CREATE TABLE insurance_company (
    provider_id   INT NOT NULL,
    company_name  VARCHAR(30) NOT NULL,
    discount      INT NOT NULL,
    last_update   DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (provider_id)
);

CREATE TABLE invoice (
    invoice_id                  INT NOT NULL AUTO_INCREMENT,
    price                       DECIMAL(8, 2) NOT NULL,
    due_date                    DATETIME NOT NULL default current_timestamp,
    last_update                 DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (invoice_id)
);


CREATE TABLE lab (
    lab_id                      INT NOT NULL AUTO_INCREMENT,
    lab_name                    VARCHAR(30) NOT NULL,
    description                 VARCHAR(200),
    last_update                 DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (lab_id)
);

CREATE TABLE out_patient (
    patient_id INT NOT NULL,
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
    birthdate                      DATETIME NOT NULL default current_timestamp,
    gender                         VARCHAR(1) NOT NULL,
    patient_class                  CHAR(1) NOT NULL default '0',
    last_update                    DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (patient_id)
);


CREATE TABLE receipt (
    receipt_id          INT NOT NULL AUTO_INCREMENT,
    amount              DECIMAL(7, 2) NOT NULL,
    payment_method      VARCHAR(30) NOT NULL,
    last_update         DATETIME NOT NULL default current_timestamp,
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
    state                 VARCHAR(2) NOT NULL,
    zipcode               VARCHAR(5) NOT NULL,
    phone                 VARCHAR(14) NOT NULL,
    birthdate             DATETIME NOT NULL default current_timestamp,
    gender                VARCHAR(1) NOT NULL,
    staff_class           TINYINT NOT NULL,
    last_update           DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (staff_id)
);




CREATE TABLE treatment (
    treatment_id   INT NOT NULL AUTO_INCREMENT,
    type           VARCHAR(30) NOT NULL,
    description    VARCHAR(200),
    medicine_name  VARCHAR(30) NOT NULL,
    dose           VARCHAR(30) NOT NULL,
    price          DECIMAL(7, 2) NOT NULL,
    last_update    DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (treatment_id)
);


CREATE TABLE ward (
    ward_id                INT NOT NULL AUTO_INCREMENT,
    status                 TINYINT NOT NULL,
    last_update            DATETIME NOT NULL default current_timestamp,
    PRIMARY KEY (ward_id)
);


 delimiter //
CREATE TRIGGER appointment_up_dt_trg BEFORE
    UPDATE ON appointment
    FOR EACH ROW
BEGIN
   SET: new.last_update = current_timestamp;
END;
/
 delimiter ;
  delimiter //

CREATE TRIGGER hospital_up_dt_trg BEFORE
    UPDATE ON hospital
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 delimiter //

CREATE TRIGGER icd_up_dt_trg BEFORE
    UPDATE ON icd
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 delimiter //

CREATE TRIGGER insurance_company_up_dt_trg BEFORE
    UPDATE ON insurance_company
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 delimiter //

CREATE  TRIGGER lab_up_dt_trg BEFORE
    UPDATE ON lab
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER patient_lab_up_dt_trg BEFORE
    UPDATE ON patient_lab
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER staff_up_dt_trg BEFORE
    UPDATE ON staff
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;

  delimiter //
CREATE TRIGGER patient_up_dt_trg BEFORE
    UPDATE ON patient
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER treatment_dt_trg BEFORE
    UPDATE ON treatment
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;
 
 delimiter //
CREATE TRIGGER ward_dt_trg BEFORE
    UPDATE ON ward
    FOR EACH ROW
BEGIN
     Set new.last_update = current_timestamp;
END;
/
 delimiter ;