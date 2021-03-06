import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTracker extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername =this.onChangeUsername.bind(this);
        this.onSubmit =this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);
        
        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));

        this.setState ({
            username: '',
        })
    }

    render()    {
        return (
            <div>
                <h3>Create New Baby Profile</h3>
                <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                    <label>Baby Name: </label>
                    <input  type="text"
                        required
                        className="form-contorl"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />     
                </div>
                <div className="form-group">
                        <input type= "submit" value="Create Baby" className="btn btn-primary" />
                    </div>   
                </form>
            </div>
        )
    }
}