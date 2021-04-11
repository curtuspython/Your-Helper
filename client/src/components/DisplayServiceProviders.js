import React, {useEffect} from "react";
import 'react-bootstrap';
import {useState} from 'react';
import DisplayComponent from "./DisplayComoponent";


class DisplayServiceProviders extends React.Component{

    constructor(props) {
        super(props);
        this.state ={service_providers:null,
        type_of_sp:1,
        isSubmitted:false,
        list_of_selected_sp: []};

    }

    onChange = async(e) =>{
        let x = null;
        this.setState({type_of_sp:e.target.value});
        x = await this.props.Contract.methods.getAllServiceProviders().call();
        this.setState({service_providers : x});
        console.log(this.state.service_providers);

    }

    onSubmit = async (e) => {
        e.preventDefault()
        let i =0;
        let x = null;
        let z = [];
        for(;i<this.state.service_providers.length; ++i){
            let x = await this.props.Contract.methods.ServiceProviders(this.state.service_providers[i]).call()
            if(x.service_type === this.state.type_of_sp)
                z.push(x)
        }
        this.setState({list_of_selected_sp:z })
        console.log(z);

    }
render() {


    return(
         <div>
             <form onSubmit={this.onSubmit}>
            <label id={"service_type"}>Choose the service category :</label>
             <select id="service_type" className="form-control"  onChange={this.onChange} required>
             <option value = {1}>Carpentry</option>
             <option value = {2}>Plumbing</option>
             <option value={3}>Painting</option>
             <option value ={4}>Electrical</option>
         </select>
                 <button>Find</button>
             </form>
              <div className="users">
                 {this.state.list_of_selected_sp.map((user, index) => (<div className='item-container' key={index}>

                         <div className='users'>
                                <DisplayComponent user ={user} contract ={this.props.contract} account = {this.props.Account}/>
                         </div>
                     </div>
                 ))}
         </div>
         </div>
        )}

}

export default DisplayServiceProviders;