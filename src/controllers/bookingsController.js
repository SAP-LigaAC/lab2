import {
    createBooking,
    readBooking,
    readBookings
} from "../services/bookingsServices";

import {
    body,
    oneOf,
    validationResult
} from "express-validator";
import { StatusCodes } from 'http-status-codes';
import { log } from '../utils/logging';

/*
 * call other imported services, or same service but different functions here if you need to
 */
export const addBooking = async (req, res, next) => {
    try {
        const validationResults = await _validateRequest(req);

        if (!validationResults.isEmpty()) {
            log.info("validation failed");
            const errorMsg = validationResults.errors;
            res
                .status(StatusCodes.BAD_REQUEST)
                .send(`validation done, error(s): ${JSON.stringify(errorMsg)}`);
        } else {
            log.info("there are no validation errors");
            await createBooking(req.body);
            // other service call (or same service, different functions can go here)
            res.sendStatus(StatusCodes.CREATED);
        }
    } catch (error) {
        log.info(error.message);
        next(error);
    }
};

export const viewBooking = async (req, res, next) => {
    log.info(`received view bookings request`);
    try {
        const id = req.params.id;
        const booking = await readBooking(id);
        // other service call (or same service, different functions can go here)
        log.info("found booking....", booking);
        if (booking) {
            res.send(booking);
            log.info(`found booking with id ${id}`);
        } else {
            log.info(`no booking found with id ${id}`);
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        log.info(error.message);
        next(error);
    }
};

export const viewBookings = async (req, res, next) => {
    log.info(`received view bookings request`);
    try {
        const bookings = await readBookings();
        // other service call (or same service, different functions can go here)

        res.send(bookings);
    } catch (error) {
        log.info(error.message);
        next(error);
    }
};

const _validateRequest = async (req) => {
    await oneOf([
        [
            body("emailAddress", "Email address is mandatory").exists(),
            body("phoneNumber", "Phone number is mandatory").exists(),
        ],
    ]).run(req);
    await body("emailAddress", "Email address should be a valid email")
        .isEmail()
        .run(req);
    await body("phoneNumber", "Phone number should be a valid mobile phone")
        .isMobilePhone()
        .run(req);
    await body(
            ["firstName", "lastName"],
            "First name and last name should be characters only"
        )
        .isAlpha()
        .run(req);

    const validationResults = validationResult(req);
    log.info(`validation results: ${JSON.stringify(validationResults)}`);
    return validationResults;
};