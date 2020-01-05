import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import logo from './../tsk.png';
import QRCode from 'qrcode.react';
import './AltayPanel.css';
import { connect } from 'react-redux'
import { AppState } from "../store";
import { updateQrData } from "../store/qr/actions";
import axios from "axios";

interface AppProps {
    updateQrData: typeof updateQrData;
    qrData: string;
    qrArray: Array<string>;
}

class AltayPanel extends Component<AppProps> {
    state: any = {
        isLoading: false,
        isLoaded: false,
        response: {}
    }
    
    public async handlePaymentClick(event: any) {
        this.setState({ ...this.state, isLoading: true, isLoaded: false });
        let response = await axios.post('/api/qr-payment/', {
            qrData: this.props.qrData
        });
        this.setState({ isLoading: false, isLoaded: true, response: response.data});

        console.log(response);
    }
    render() {
        let alert;
        if (this.props.qrData === "") {
            return (<Alert variant="danger">
                <Alert.Heading>There is no QR Data</Alert.Heading>
                <p>Please go to root("/") page and generate one qr. After that you should import qr to here with import button.</p>
                <hr />
                <p className="mb-0">It will be fixed whenever qr data recieved successfully.</p>
            </Alert>)
        }
        if (!this.state.isLoaded) {
            alert =<div></div>;
        }
        else if (this.state.response.returnCode === 1000) {
            alert = <Alert variant="success">
                <Alert.Heading>Payment executed successfully</Alert.Heading>
                <p>Payment gone through the osy qr api. And there is no error in the response.</p>
                <hr />
                <p className="mb-0">That means payment executed successfully!</p>
            </Alert>
        } else {
            alert = <Alert variant="danger">
                <Alert.Heading>There is payment error</Alert.Heading>
                <p>There is payment error at the api. Please check the response</p>
                <hr />
                <p className="mb-0">Return Code: {this.state.response.returnCode}</p>
                <p>Return Description: {this.state.response.returnDesc}</p>
            </Alert>
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <Container fluid={true}>
                    <Col>
                        <Row className="justify-content-md-center">
                            <QRCode includeMargin={true} size={256} value={this.props.qrData}></QRCode>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Subtitle>Pay {Number(this.props.qrArray[5]) / 100}₺ for gas</Card.Subtitle>

                                    <Card.Text>
                                        Qr code read successfully
                                    </Card.Text>
                                    <Button variant="primary"
                                        disabled={this.state.isLoading} aria-controls="alert-field"
                                        aria-expanded={this.state.isLoaded}
                                        onClick={(event: any) => { !this.state.isLoading ? this.handlePaymentClick(event) : () => { } }}>
                                        {this.state.isLoading ? 'Payment proccessing...' : 'Make Payment'}</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row id="alert-field">
                            <Collapse in={this.state.isLoaded}>
                                {alert}
                            </Collapse>
                        </Row>
                    </Col>
                </Container>
            </div>

        );
    }

}

const mapStateToProps = (state: AppState) => ({
    qrData: state.qr.qrData,
    qrArray: state.qr.qrData.split(/[-#\s]+/)
});

export default connect(
    mapStateToProps,
    { updateQrData }
)(AltayPanel);
