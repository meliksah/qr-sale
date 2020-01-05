// Describing the shape of the system's slice of state
export interface QrData {
    qrData: string;
  }
  
  // Describing the different ACTION NAMES available
  export const UPDATE_QR_DATA = "UPDATE_QR_DATA";
  
  export interface UpdateQrDataAction {
    type: typeof UPDATE_QR_DATA;
    payload: QrData;
  }
  
  export default UpdateQrDataAction;
  