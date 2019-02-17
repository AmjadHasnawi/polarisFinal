import React, { Component } from 'react';
import {storage} from '../firebase';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';



class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image1: null,
        image2: null,
        image3: null,
        url1: '',
        url2: '',
        url3: ''
      }
    }

    handleChange = (e) => {
      if (e.target.files[0]) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
      }
    }

    handleClick = (e) => {
        if (!this.state[e.target.name]) {
          this.sweetAlert('This certification is required');
          return ;
        }
      let image = this.state[e.target.name]
      let a = [e.target.name][0];
      console.log('image',typeof [e.target.name][0]);
      const uploadImage = storage.ref(`images/${image.name}`).put(image);
      uploadImage.on('state_changed', (snapshot) => {

    }, (error) => {
        console.log(error)
    }, () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            let obj = { email: this.props.location.state.referrer, image: url }
            if (a === 'image1') {
                axios.post('/auth/image1', obj)
                    .then((res) => {
                        this.setState({
                            image: res.data.image,
                            url1: url
                        })
                        Swal.fire(
                            'Complete!',
                            'Your university certification has been uploaded succssfuly!',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else  if (a === 'image2') {
                axios.post('/auth/image2', obj)
                    .then((res) => {
                        this.setState({
                            image: res.data.image,
                            url2: url
                        })
                        Swal.fire(
                            'Complete!',
                            'Your experience certification has been uploaded succssfuly!',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else  if (a === 'image3') {
                axios.post('/auth/image3', obj)
                    .then((res) => {
                        this.setState({
                            image: res.data.image,
                            url3: url
                        })
                        Swal.fire(
                            'Complete!',
                            'Your board certification has been uploaded succssfuly!',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    });
    }

    sweetAlert = (message) => {
        Swal.fire({
          title: 'Error!',
          text: message,
          type: 'error',
          confirmButtonText: 'Close'
        })
      }

    finish = () => {
        if (this.state.url1 && this.state.url2) {
            $('a').attr('href', '/Signin');
            $('a').click();
        } else {
            this.sweetAlert('Please upload your university and experience certifications');
        }
    }

    render() {
    //   return(
    //       <div>
    //           <h1>{this.props.location.state.referrer}</h1>
    //           Please upload your uneversity certification
    //           <input type="file" name='image1' onChange={this.handleChange} />
    //           <button name='image1' onClick={this.handleClick} >upload</button>
    //           <h1>Please upload your experience certification</h1>
    //           <input type="file" name='image2' onChange={this.handleChange} />
    //           <button name='image2' onClick={this.handleClick} >upload</button>
    //           <h1>Please upload your board certification</h1>
    //           <input type="file" name='image3' onChange={this.handleChange} />
    //           <button name='image3' onClick={this.handleClick} >upload</button>
    //       </div>
    //   )
      return (
        <div>
            <div className='container'>
                <div className="panel requestTable">
                    <div className="panel-heading ">
                    <br/>
                        <h2 className="panel-title">Hello {this.props.location.state.referrer}</h2>
                        <h5>Please upload all the required certifications below</h5>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                        </div>
                        <br />
                        <table className="table table-striped">
                            {/* <tr>
                                <th>Please upload all required certification below</th>
                            </tr> */}
                            <th>
                                Please upload your uneversity certification
                                <input type="file" name='image1' onChange={this.handleChange} />
                                <button name='image1' onClick={this.handleClick} >upload</button>
                            </th>
                            <th>
                                Please upload your experience certification
                                <input type="file" name='image2' onChange={this.handleChange} />
                                <button name='image2' onClick={this.handleClick} >upload</button>
                            </th>
                            <th>
                                Please upload your board certification
                                <input type="file" name='image3' onChange={this.handleChange} />
                                <button name='image3' onClick={this.handleClick} >upload</button>
                            </th>
                        </table>
                    </div>
                </div>
                <br />
                <a className="btn btn-success" onClick={this.finish}> Continue </a>
            </div>
        </div>
    )
    }
}

export default Upload;