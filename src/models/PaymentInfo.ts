import PaymentAction from "./PaymentAction"
export interface PaymentInfo {
    readonly paymentProcessorID: number;
    readonly paymentActionList: Array<PaymentAction>;
}
export default PaymentInfo;