import pkg from '@sap/hana-client';
const {
    createConnection
} = pkg;

import getCredentialsForHanaService from './envUtil';

import {log} from '../../utils/logging';
import {SCHEMA_TEXT_TO_REPLACE} from '../../utils/constants';

 const credentials = await getCredentialsForHanaService();

export default async function processSQL(sqlStatement) {
    try {
        const regex = new RegExp(SCHEMA_TEXT_TO_REPLACE, "g");
        let sqlStatementToExecute = sqlStatement.replace(regex, credentials.schema);
        log.info(`processing SQL: ${sqlStatementToExecute}`);
        let connection = await _createDBConnection(credentials);

        const executionResponse = await _executeSQL(connection, sqlStatementToExecute);

        await releaseDBConnection(connection);

        return executionResponse;

    } catch (err) {
        log.error(`ERROR processing SQL: ${err}`);
        throw err;
    }
}


async function _createDBConnection(credentials) {

    const connOptions = {
        serverNode: `${credentials.host}:${credentials.port}`,
        encrypt: true,
        schema: credentials.schema,
        uid: credentials.user,
        pwd: credentials.password
    };
    var connection = createConnection();
    await connection.connect(connOptions);
    return connection;
}

function _disconnect(connection, successCallback, errorCallback) {
    connection.disconnect((err) => {
        if (err)
            errorCallback(err);
        successCallback();

    });
}

function releaseDBConnection(connection) {
    return new Promise((resolve, reject) => {
        _disconnect(connection, () => {
            log.info(`DB connection closed`);
            resolve();
        }, (err) => {
            log.info(`failed to close DB connection due to error: ${err}`);
            reject(err);
        })
    })

}

function _executeSQLStatement(sqlStatement, connection, successCallback, errorCallback) {
    connection.exec(sqlStatement, (err, queryResult) => {
        if (err) {
            errorCallback(err, sqlStatement);
            return;
        }
        successCallback(`SQL statement: '${sqlStatement}' successfully executed with result: ${JSON.stringify(queryResult)}`,queryResult);
    });
}

function _executeSQL(connection, sqlStatement) {
        return new Promise((resolve, reject) => {
            _executeSQLStatement(sqlStatement, connection, (successResponse,queryResult) => {
                const successMsg = `${successResponse}`;
                log.info(successMsg);
                resolve(queryResult);
            }, (error, sqlStatement) => {
                const failedMsg = `${error} executing: '${sqlStatement}'`;
                log.error(failedMsg);
                reject(failedMsg);
            });
        });
}