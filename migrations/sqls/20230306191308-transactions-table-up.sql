/* Replace with your SQL commands */
CREATE TABLE  transactions (
    transaction_id SERIAL PRIMARY KEY,
vehicle VARCHAR(255) REFERENCES vehicles(vehicle_id),
vehicle_image VARCHAR(255) NOT NULL,
    fine integer NOT NULL,
    payment_date VARCHAR(255) NOT NULL,
    payment_status VARCHAR(15) CHECK(payment_status='paid' OR payment_status='notpaid' OR payment_status='exempt'),
    place VARCHAR(255) NOT NULL, 
    adjustment_date VARCHAR(255) NOT NULL,
    adjustment_time VARCHAR(255) NOT NULL,
    is_reported VARCHAR(15) CHECK(is_reported='unsubmited' OR is_reported='approved' OR is_reported='declined' OR is_reported='waiting')
);