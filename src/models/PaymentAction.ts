export interface PaymentAction {
    readonly paymentType: number;
    readonly amount: number;
    readonly currencyID: number;
    readonly vatRate: number;
}
export default PaymentAction;