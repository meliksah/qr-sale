import PaymenyInfo from "./PaymentInfo"
export interface QrPaymentBody {
    readonly returnCode: number;
    readonly returnDesc: string;
    readonly receiptMsgCustomer: string;
    readonly receiptMsgMerchant: string;
    readonly QRdata: string;
    readonly paymentInfoList: Array<PaymenyInfo>;
}

export default QrPaymentBody;