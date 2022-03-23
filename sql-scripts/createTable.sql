CREATE TABLE "Passenger" (
	"ID" INTEGER NOT NULL ,
	"FirstName" VARCHAR(30),
	"LastName" VARCHAR(30),
	"EmailAddress" VARCHAR(30),
    "PhoneNumber" VARCHAR(12),
PRIMARY KEY (ID)
);

CREATE TABLE "Booking" (
	"ID" INTEGER NOT NULL ,
	"BookingStatus" VARCHAR(10),
    "BookingDate" TIMESTAMP,
	"FlightDate" TIMESTAMP,
	"FlightDestination" VARCHAR(20),
    "Passenger_ID" INTEGER NOT NULL,
PRIMARY KEY (ID),
FOREIGN KEY ("Passenger_ID") REFERENCES "Passenger" ON DELETE CASCADE
);
