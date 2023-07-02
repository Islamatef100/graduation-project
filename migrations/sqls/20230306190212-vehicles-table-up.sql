/* Replace with your SQL commands */
CREATE TABLE  vehicles (
    vehicle_id  VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
    license bigint REFERENCES users(user_ssn),
    vehicle_class VARCHAR(25) CHECK(vehicle_class='private' OR vehicle_class='transfer' OR vehicle_class='governmental') NOT NULL,
    traffic_unit VARCHAR(255) NOT NULL, 
    license_create_date VARCHAR(255) NOT NULL,
    license_expired_date VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    manufacturering_year integer NOT NULL,
    color VARCHAR(255) NOT NULL,
    is_stolen VARCHAR(10) CHECK(is_stolen='safe' OR is_stolen='stolen') NOT NULL,
    checked VARCHAR(10) CHECK(checked='declined' OR checked='approved' OR checked='waiting') NOT NULL,
    vehicle_image VARCHAR(255) NOT NULL
);