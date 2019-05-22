import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import React from 'react';
import {View,Alert} from 'react-native';
import { connect } from 'react-redux';
import{Button } from 'react-native-elements';
import * as actions from '../actions';
import {makeDropDown ,applyCoupon, get_bookings, make_payment} from '../services/Auth';



class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            card_num:"",
            cvc:"",
            exp_month:"",
            exp_year:"",
            cvc:"",
            enableButton:false
        }
    }
    makePayment = ()=>{
        var formData = new FormData();  
        formData.append('name', this.props.auth.user.user.name);
        formData.append('id', this.props.navigation.state.params.id);
        formData.append('price', this.props.navigation.state.params.price);
        formData.append('email', this.props.auth.user.user.email);
        formData.append('card_num',this.state.card_num);
        formData.append('cvc', this.state.cvc);
        formData.append('exp_month', this.state.exp_month);
        formData.append('exp_year', this.state.exp_year);
        make_payment(formData).then((res)=>{
            if(res.data.status == 1){
                this.props.navigation.navigate('Order');
                Alert.alert("Message",res.data.message);
            }
            else{
                Alert.alert("Message",res.data.message);
            }
        }).catch(err => console.log(err));
    }
    _onChange = form => {
        console.log(form);
        if(form.valid){
            let array = form.values.expiry.split('/');
            let month = array[0];
            let year = array[1];
            this.setState({card_num:form.values.number,exp_month:month,exp_year:year,cvc:form.values.cvc, enableButton : true})
        }
    }
    render(){
        return(
            <View>
                <CreditCardInput onChange={this._onChange} />
                <Button title="Make Payment" onPress={()=>this.makePayment()} disabled={!this.state.enableButton}/>
            </View>
        )
    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps,actions)(Checkout);

