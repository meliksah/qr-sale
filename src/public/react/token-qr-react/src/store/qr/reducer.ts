import { UPDATE_QR_DATA, QrData, UpdateQrDataAction } from "./types";

const initialState: QrData = {
  qrData: ""
};

export function qrReducer(
  state = initialState,
  action: UpdateQrDataAction
): QrData {
  switch (action.type) {
    case UPDATE_QR_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
