import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader'
import axios from 'axios';

let PaypalButton = null;
class Paypal extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          showButtons: false,
          loading: true,
          paid: false,
          total: props.total,
          addressId: props.addressId,
          history: props.history,
        };
    
        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    
        if (isScriptLoaded && isScriptLoadSucceed) {
          PaypalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
          this.setState({ loading: false, showButtons: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    
        const scriptJustLoaded =
          !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;
    
        if (scriptJustLoaded) {
          if (isScriptLoadSucceed) {
            PaypalButton = window.paypal.Buttons.driver("react", {
              React,
              ReactDOM
            });
            this.setState({ loading: false, showButtons: true });
          }
        }
    }

    createOrder = async(data, actions) => {
      try{
      const {data} = await axios.get('/api/currency');
      const total = (this.state.total / data.egp).toFixed(2);
        return actions.order.create({
          purchase_units: [
            {
              description: "online store Purchase",
              amount: {
                currency_code: "EUR",
                value: total, 
              }
            }
          ]
        });
      }catch(err){
        alert('could not process purchase, try again later');
      }
    };

    onApprove = (data, actions) => {
        actions.order.capture().then(async(details) => {
          const paymentData = {
            payerID: data.payerID,
            orderID: data.orderID
          };
          await axios.post('/api/purchase',{
            addressId: this.state.addressId,
            paymentType: 'paypal',
            isPaid: true
          });
          this.state.history.replace('/purchases');
        });
    };

    render() {
        const { showButtons, loading, paid } = this.state;
        return (
            <div className="row">
                <p className="col-12">pay online.</p>
                <h6 className="col-12">total: {this.state.total} EGP</h6>
                {loading && <span className="text-success">Loading...</span>}
                {showButtons && (
                    <div>
                        <PaypalButton
                            createOrder={(data, actions) => this.createOrder(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=ASgi4H9ZLYf37FDnMQQIu8YN2_miiVDUBEES4AirKyAt2gGzgf3HNEmos9lCCA6KT3v9JMmiQOSBKLBf&disable-funding=credit,card&currency=EUR`
)(Paypal)