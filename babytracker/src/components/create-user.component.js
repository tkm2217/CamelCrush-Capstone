import React, { Component } from 'react';

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
        
        this.setSate ({
            username: ''
        })
    }

    render()    {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                    <label> Baby Name: </label>
                    <input type="text"
                        required
                        className="form-contorl"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />     
                </div>   
                </form>
            </div>
        )
    }
}