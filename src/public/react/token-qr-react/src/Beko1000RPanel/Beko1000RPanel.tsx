import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
import logo from './../logo.png';
import Collapse from 'react-bootstrap/Collapse'
import QRCode from 'qrcode.react';
import './Beko1000RPanel.css';
import { connect } from 'react-redux'
import { AppState } from "../store";
import { updateQrData } from "../store/qr/actions";

interface AppProps {
  updateQrData: typeof updateQrData;
  qrData: string;
}

class Beko1000RPanel extends Component<AppProps> {
  state: any = {
    amount: 0,
    isLoading: false,
    isLoaded: false
  }

  public handleAmountInput(event: any) {
    const value = event.target.value;
    this.setState({...this.state,amount: value});
  }
  public async handleClick(event: any) {
    this.setState({...this.state, isLoading: true, isLoaded: false});
    let response = await axios.get('/api/qr-payment/' + (this.state.amount*100));
    this.setState({isLoading: false, isLoaded: true});
    this.props.updateQrData({
      qrData: response.data['QRdata']
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Container fluid={true}>
          <Row>
            <Col xs={{span: 6, offset: 3}}>
              <Row>
                <Alert variant="info" >
                  <Alert.Heading>Welcome to Demo for Qr Payment</Alert.Heading>
                    This demo made by Meliksah Simsek in very short time.
                </Alert>
              </Row>
              <Row>
                Please enter amount for the generating qr code which should be read from Altay Tank
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>₺</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Amount" type="number" value={this.state.amount} onChange={(event: any) => {this.handleAmountInput(event)}}/>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Row>
              <Row>
                <Button
                  variant="primary"
                  disabled={this.state.isLoading}
                  aria-controls="qr-field"
                  aria-expanded={this.state.isLoaded}
                  onClick={(event: any) => {!this.state.isLoading ? this.handleClick(event) : () => {}}}
                  block
                >
                  {this.state.isLoading ? 'Loading…' : 'Generate QR Code'}
                </Button>

              </Row>
              <Row className="justify-content-md-center">
                <Collapse in={this.state.isLoaded}>
                  <Col id="qr-field">
                    <Row>
                      <QRCode includeMargin={true} size={256} value={this.props.qrData}></QRCode>
                    </Row>
                    <Row>
                      <p>
                        Now we have generated the qr code. It should be read by client. We can use wireless device for showing generated qr since some cars will have disability to read qr that is fixed to somewhere. Or we should send this qrdata to client and 
                      </p>
                      </Row>
                      <Row>
                      <Link to='/altay'>                      
                        <Button
                          variant="primary"
                          block
                        >Read this qr from Altay
                        </Button>
                      </Link>
                    </Row>
                  </Col>
                </Collapse>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }

  
}
const mapStateToProps = (state: AppState) => ({
  qrData: state.qr.qrData,
});

export default connect(
  mapStateToProps,
  { updateQrData }
)(Beko1000RPanel);
