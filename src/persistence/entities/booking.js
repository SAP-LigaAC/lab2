import Passenger from "./passenger";

export class Booking {
    constructor(id) {
        this.id = id;
        this.bookingStatus = 'active';
        this.bookingDate = new Date().toISOString();
    }

    setPassenger(firstName, lastName, emailAddress, phoneNumber, flightDate, flightDestination) {
        this.passenger = new Passenger(firstName, lastName, emailAddress, phoneNumber);
        this.bookFlight(flightDate, flightDestination);
    }

    getPassenger() {
        return this.passenger ;
    }

    bookFlight(flightDate, flightDestination) {
        this.flightDate = flightDate;
        this.flightDestination = flightDestination;
    }

    cancelBooking() {
        this.bookingStatus = 'cancel';
        this.cancellationDate = new Date().toISOString();
    }

    display() {
        log.info(`booking with status: ${this.bookingStatus} and passenger: ${this.passenger.display()}`);
    }

}