import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Did25 from './did25';
import './RecoverCredentials.css';

const did25 = new Did25();

class RecoverCredentials extends Component {
    constructor(props){
        super(props);
        this.recoverCode = React.createRef();
        this.state = {
            signup: true
        }
    }

    handleChange(){}
    handleSubmit(e){
        e.preventDefault();
        let username = this.username.current.value;
        let password = this.password.current.value;
        if(this.state.signup){
            let result = did25.signup(username, password);
            alert(JSON.stringify(result));
            this.setState({
                signup: !this.state.signup
            });
        }
        else {
            let result = did25.login(username, password);
            alert(JSON.stringify(result));
        }
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Web 2.5</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            className="form-item"
                            placeholder="Enter your recover code..."
                            name="username"
                            type="text"
                            ref={this.recoverCode}
                            onChange={this.handleChange.bind(this)}
                        />
                        <input
                            className="form-submit"
                            value="RECOVER CREDENTIALS"
                            type="submit"
                        />
                        <div className='links-container'>
                            <Link className='links' to="/signup">Register</Link>
                            <Link className='links' to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default RecoverCredentials;