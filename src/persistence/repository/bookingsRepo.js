import { log } from "../../utils/logging";
import processSQL from "../client/hanaClient";
import { MAX_ID, MIN_ID } from "../../utils/constants";
import { StatusCodes } from 'http-status-codes';

export const addBooking = async (booking) => {
  const passenger = booking.getPassenger();
  const randomID = Math.floor(Math.random() * (MAX_ID - MIN_ID + 1)) + MIN_ID;
  try {

  await processSQL(`INSERT INTO REPLACE_SCHEMA."Passenger" VALUES('${randomID}','${passenger.lastName}','${passenger.firstName}','${passenger.emailAddress}','${passenger.phoneNumber}')`);
  await processSQL(`INSERT INTO REPLACE_SCHEMA."Booking" VALUES('${booking.id}', '${booking.bookingStatus}', '${booking.bookingDate}','${booking.flightDate}','${booking.flightDestination}','${randomID}')`);

  } catch (error) {
    const uniqueConstraintViolatedMessage = 'unique constraint violated';
    if (error.message && error.message.includes(uniqueConstraintViolatedMessage) || error.includes(uniqueConstraintViolatedMessage)){
      const newErr = new Error();
      newErr.code = StatusCodes.CONFLICT;
      newErr.message = 'A booking with the same ID already exists';
      throw newErr;
    }
    throw error;
  }
  };

export const getBooking = async (id) => {
  log.info(`looking for booking with id= ${id}`);
  const booking = await processSQL(`SELECT
	A1."ID",
	A1."BookingStatus",
	A1."BookingDate",
	A1."FlightDate",
	A1."FlightDestination",
	A2."FirstName",
	A2."LastName",
	A2."EmailAddress",
	A2."PhoneNumber"
  FROM "REPLACE_SCHEMA"."Booking" A1
  INNER JOIN "REPLACE_SCHEMA"."Passenger" A2 ON A1."Passenger_ID" = A2."ID"
  WHERE A1."ID" = ${id}`);

  return booking[0];
};

export const getBookings = async () => {
  log.info("get all bookings");

  return await processSQL(`SELECT
	A1."ID",
	A1."BookingStatus",
	A1."BookingDate",
	A1."FlightDate",
	A1."FlightDestination",
	A2."FirstName",
	A2."LastName",
	A2."EmailAddress",
	A2."PhoneNumber"
  FROM "REPLACE_SCHEMA"."Booking" A1 INNER JOIN
  "REPLACE_SCHEMA"."Passenger" A2 ON A1."Passenger_ID" = A2."ID"`);
};
