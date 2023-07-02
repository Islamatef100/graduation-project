/* Replace with your SQL commands */
CREATE TABLE  users (
    user_ssn BIGINT PRIMARY KEY UNIQUE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    manufacturer_number VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    user_job VARCHAR(255) NOT NULL,
    user_nationality VARCHAR(255) NOT NULL,
    user_phone VARCHAR(255) NOT NULL,
    user_bd VARCHAR(255) NOT NULL,
    user_governorate VARCHAR(255) NOT NULL,
    is_admin VARCHAR(10) CHECK(is_admin='admin' OR is_admin='user' OR is_admin='officer') NOT NULL
);