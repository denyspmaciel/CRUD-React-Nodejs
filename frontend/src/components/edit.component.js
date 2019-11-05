import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nome: '',
      email: ''
    }
  }

  componentDidMount() {
      axios.put('http://localhost:3333/contatos/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                nome: response.data.nome, 
                email: response.data.email });
          })
          .catch(function (error) {
              console.log(error);
          })
    }
  
  onChangeName(e) {
    this.setState({
      nome: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });  
  }


  onSubmit(e) {
    e.preventDefault();
    const obj = {
      nome: this.state.nome,
      email: this.state.email
    };
    axios.put('http://localhost:3333/contatos/'+this.props.match.params.id, obj)
      .then(console.log('Updated'))
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Atualizar Contato</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Nome: </label>
                    <input 
                      type="text"
                      className="form-control" 
                      value={this.state.nome}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Atualizar Contato" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}