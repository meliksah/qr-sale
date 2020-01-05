import { QrData, UPDATE_QR_DATA } from "./types";

export function updateQrData(qrData: QrData) {
  console.log(qrData);
  return {
    type: UPDATE_QR_DATA,
    payload: qrData
  };
}
