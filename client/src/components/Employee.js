import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';



class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests : null
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
        axios.get('/auth/employeeRequests')
        .then((response) => {
            this.setState({
                requests: response.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    Deny = (email, id) => {
        axios.post('/auth/deny', {email: email})
        .then((res) => {
            console.log(res);
            $(`#${id}`).hide();
        })
        .catch((err) => {
            console.log(err)
        })
       
    }

    Accept = (email, id) => {
        axios.post('/auth/employeeAccept', {email: email})
        .then((res) => {
            console.log(res);
            $(`#${id}`).hide();
        })
        .catch((err) => {
            console.log(err)
        })
       
    }

    render() {
        if (this.state.requests !== null) {
            return (
                <div>
                   
                    <div className='container'>
                        <div className="panel requestTable">
                            <div className="panel-heading ">
                            <br/>
                                <h3 className="panel-title">Requests</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                </div>
                                <br />
                                <table className="table table-striped">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>University Certification</th>
                                        <th>Experience Certification</th>
                                        <th>Board Certification</th>
                                        <th>Approve / Reject</th>
                                    </tr>
                                    {this.state.requests.map((request) => {
                                        return (
                                            <tr id={request._id}>
                                                <td>{request.firstname}</td>
                                                <td>{request.email}</td>
                                                <td><a href={request.image1} target='/blank'>University Certification</a></td>
                                                <td><a href={request.image2} target='/blank'>Experience Certification</a></td>
                                                <td><a href={request.image3} target='/blank'>Board Certification</a></td>
                                                <td>
                                                    <a style={{marginRight:'20px'}} className="btn btn-success" onClick={() => { this.Accept(request.email, request._id) }} >Approve</a>
                                                    <a className="btn btn-danger" onClick={() => { this.Deny(request.email, request._id) }} >Reject</a>
                                                </td>
                                            </tr>
                                        )
                                    })}

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
                            <h3 className="panel-title">Requests</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                            </div>
                            <br />
                            <table className="table table-striped">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </table>
                        </div>
                    </div>           
            </div>
            )
        }
    }
}

export default Employee;
