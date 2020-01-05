import * as https from "https";

export default class Constants {
    static readonly osyApiHeaders = {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-ibm-client-id': 'd56a0277-2ee3-4ae5-97c8-467abeda984d',
        'x-ibm-client-secret': 'bF1rB2nC1jY2tM4dL2bU1yO8sB1kX7cP3nK3pU0bV3gH1cN3uT'
    }
    static readonly baseOsyApiUrl = 'https://sandbox-api.payosy.com/api';
    static readonly httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
}

