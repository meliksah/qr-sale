import axios from "axios";
import constants from "../Constants";
import { QrGeneratorBody, QrPaymentBody } from "../models/"
export default class QrPaymentService {
  public async generateQrCode(body?: QrGeneratorBody): Promise<any> {
    let response = await axios.post(constants.baseOsyApiUrl + '/get_qr_sale', body, {
      httpsAgent: constants.httpsAgent,
      headers: constants.osyApiHeaders,
    });
    return response;
  }

  public async payQrCode(body?: QrPaymentBody): Promise<any> {
    let response = await axios.post(constants.baseOsyApiUrl + '/payment', body, {
      httpsAgent: constants.httpsAgent,
      headers: constants.osyApiHeaders,
    });
    return response;
  }
}
