class Person {
    constructor(firstName, lastName, emailAddress, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
    }

    display() {
        log.info(this.firstName + ' ' + this.lastName);
    }

}

export default class Passenger extends Person {
    constructor(firstName, lastName, emailAddress, phoneNumber) {
        super(firstName, lastName, emailAddress, phoneNumber);
    }

    display() {
        log.info(super.display());
    }

}