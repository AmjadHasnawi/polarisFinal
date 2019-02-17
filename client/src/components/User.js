import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications : null
        }
    }

    componentDidMount() {
        // axios.get('/auth/checkLogging').
        //     then((response) => {
        //         console.log('hello world', response.data.acceptedRequests)
        //         this.setState({
        //             requests: response.data.acceptedRequests,
        //             teacherid: response.data._id,
        //             image: response.data.image
        //         })
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        axios.post('/auth/notifications', {email: this.props.location.state.referrer})
        .then((response) => {
            console.log('come on!!!', response)
            this.setState({
                notifications: response.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    Delete = (email, id) => {
        axios.post('/auth/delete', {email: this.props.location.state.referrer})
        .then((res) => {
            console.log(res);
            $(`#${id}`).hide();
        })
        .catch((err) => {
            console.log(err)
        })
       
    }


    render() {
        if (this.state.notifications !== null) {
            return (
                <div>
                   
                    <div className='container'>
                        <div className="panel requestTable">
                            <div className="panel-heading ">
                            <br/>
                                <h3 className="panel-title">Notifications</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                </div>
                                <br />
                                <table className="table table-striped">
                                    
                                    <tr id={this.state.notifications._id}>
                                        <td>
                                            {this.state.notifications.notifications}
                                            <a style={{marginLeft:'20px'}} className="btn btn-danger" onClick={() => { this.Delete(this.state.notifications.email, this.state.notifications._id) }} >Delete</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <br />

                    </div>
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className="panel">
                        <div className="panel-heading ">
                            <h3 className="panel-title">Notifications</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                            </div>
                            <br />
                            <table className="table table-striped">
                                <tr>
                                    <th></th>
                                </tr>
                            </table>
                        </div>
                    </div>           
            </div>
            )
        }
    }
}

export default User;
