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



CREATE TABLE icd (
    icd_id        VARCHAR(30) NOT NULL AUTO_INCREMENT,
    disease_name  VARCHAR(30) NOT NULL,
    last_update   DATETIME NOT NULL,
    PRIMARY KEY (icd_id)
);


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


CREATE TABLE invoice (
    invoiceid                   INT NOT NULL AUTO_INCREMENT,
    price                       DECIMAL(8, 2) NOT NULL,
    due_date                    DATETIME NOT NULL,
    last_update                 DATETIME NOT NULL,
    invoice_id                  DOUBLE NOT NULL,
    PRIMARY KEY (invoice_id)
);


CREATE TABLE lab (
    lab_id                      INT NOT NULL AUTO_INCREMENT,
    lab_name                    VARCHAR(30) NOT NULL,
    last_update                 DATETIME NOT NULL,
    PRIMARY KEY (lab_id)
);


CREATE TABLE out_patient (
    patient_id INT NOT NULL,
    PRIMARY KEY (patient_id)
);



CREATE TABLE patient (
    patient_id                     INT NOT NULL AUTO_INCREMENT,
    first_name                     VARCHAR(30) NOT NULL,
    last_name                      VARCHAR(30) NOT NULL,
    password                       VARCHAR(200) NOT NULL,
    st_address                     VARCHAR(30) NOT NULL,
    city                           VARCHAR(30) NOT NULL,
    state                          VARCHAR(2) NOT NULL,
    zipcode                        VARCHAR(5) NOT NULL,
    phone                          VARCHAR(14) NOT NULL,
    birthdate                      DATETIME NOT NULL,
    gender                         VARCHAR(1) NOT NULL,
    patient_class                  CHAR(1) NOT NULL,
    last_update                    DATETIME NOT NULL,
    PRIMARY KEY (patient_id)
);



CREATE TABLE patient_icd (
    last_update                 DATETIME NOT NULL
);

CREATE UNIQUE INDEX patient_icd__idx ON
    patient_icd (
        appointment_appointment_id
    ASC );

CREATE TABLE patient_icd_treatment (
    times                   INT NOT NULL,
    last_update             DATETIME NOT NULL
);

CREATE TABLE patient_lab (
    result_id    INT NOT NULL AUTO_INCREMENT,
    lab_result   VARCHAR(30) NOT NULL,
    price        DECIMAL(8, 2) NOT NULL,
    last_update  DATETIME NOT NULL
);

ALTER TABLE patient_lab ADD CONSTRAINT patient_lab_pk PRIMARY KEY ( result_id );

CREATE TABLE receipt (
    receipt_id          INT NOT NULL AUTO_INCREMENT,
    amount              DECIMAL(7, 2) NOT NULL,
    payment_method      VARCHAR(30) NOT NULL,
    last_update         DATETIME NOT NULL
);

ALTER TABLE receipt ADD CONSTRAINT receipt_pk PRIMARY KEY ( receipt_id );

CREATE TABLE staff (
    staff_id              INT NOT NULL AUTO_INCREMENT,
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




CREATE TABLE treatment (
    treatment_id   DECIMAL(58) NOT NULL AUTO_INCREMENT,
    type           VARCHAR(30) NOT NULL,
    medicine_name  VARCHAR(30) NOT NULL,
    dose           VARCHAR(30) NOT NULL,
    price          DECIMAL(7, 2) NOT NULL,
    last_update    DATETIME NOT NULL,
    PRIMARY KEY (treatment_id)
);


CREATE TABLE ward (
    ward_id                INT NOT NULL AUTO_INCREMENT,
    status                 TINYINT NOT NULL,
    last_update            DATETIME NOT NULL,
    PRIMARY KEY (ward_id)
);

 delimiter //
CREATE OR REPLACE TRIGGER appointment_up_dt_trg AFTER
    UPDATE ON appointment
    FOR EACH ROW
BEGIN
   SET: new.last_update = sysdate();
END;
/
 delimiter ;
  delimiter //

CREATE OR REPLACE TRIGGER hospital_up_dt_trg AFTER
    UPDATE ON hospital
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 delimiter //

CREATE OR REPLACE TRIGGER icd_up_dt_trg AFTER
    UPDATE ON icd
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 delimiter //

CREATE OR REPLACE TRIGGER insurance_company_up_dt_trg AFTER
    UPDATE ON insurance_company
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 delimiter //

CREATE OR REPLACE TRIGGER lab_up_dt_trg AFTER
    UPDATE ON lab
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE OR REPLACE TRIGGER patient_lab_up_dt_trg AFTER
    UPDATE ON patient_lab
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE OR REPLACE TRIGGER staff_up_dt_trg AFTER
    UPDATE ON staff
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE OR REPLACE TRIGGER treatment_dt_trg AFTER
    UPDATE ON treatment
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;
 
 delimiter //
CREATE OR REPLACE TRIGGER ward_dt_trg AFTER
    UPDATE ON ward
    FOR EACH ROW
BEGIN
    Set :new.last_update = sysdate();
END;
/
 delimiter ;