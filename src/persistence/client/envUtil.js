
import xsenv from '@sap/xsenv';
import fs from "fs";

xsenv.loadEnv('default-env.json');

const defaultEnvFile = "./config/default-env.json";
if (fs.existsSync(defaultEnvFile)) {
    xsenv.loadEnv(defaultEnvFile);
} else {
    xsenv.loadEnv();
}

const services = xsenv.getServices({
    hanaService: {
        label: 'hana'
    }
}, 'default-env.json');

async function getCredentialsForHanaService() {
    const hanaServiceCredentials = services.hanaService;

    return {
        host: hanaServiceCredentials.host,
        port: hanaServiceCredentials.port,
        user: hanaServiceCredentials.user,
        password: hanaServiceCredentials.password,
        schema: hanaServiceCredentials.schema
    }
}

export default getCredentialsForHanaService;
