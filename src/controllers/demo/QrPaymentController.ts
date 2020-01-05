import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import QrPaymentService from '../../services/QrPaymentService'

@Controller('api/qr-payment')
class DemoController {
    public service = new QrPaymentService();

    @Get(':amount')
    private async generateQrCode(req: Request, res: Response) {
        try {
            const amount = Number(req.params.amount);
            let response = await this.service.generateQrCode({
                totalReceiptAmount: amount
            });
            Logger.Info(response.data);
            return res.status(OK).json(response.data);
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    @Post()
    private async payQrCode(req: Request, res: Response) {
        try {
            const qrData = req.body['qrData'];
            const amount = Number(qrData.split(/[-#\s]+/)[5]);
            let response = await this.service.payQrCode({
                QRdata: qrData,
                returnCode: 1000,
                returnDesc: "success",
                receiptMsgCustomer: "beko Campaign",
                receiptMsgMerchant: "beko Campaign Merchant",
                paymentInfoList: [{
                    paymentProcessorID: 67,
                    paymentActionList: [{
                        amount: amount,
                        currencyID: 949,
                        vatRate: 800,
                        paymentType: 3
                    }]
                }],
            });
            Logger.Info(response.data);
            return res.status(OK).json(response.data);
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
}

export default DemoController;
