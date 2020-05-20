import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class NewCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  NewCompany = async name => {
    const { accounts, contract } = this.props;
    console.log(name);

    await contract.methods.newCompany(name).send({ from: accounts[0] });
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    })
  }

  render() {
    const { name } = this.state;

    return (
      <Card>
        <Card.Header as='h5'>Register company</Card.Header>
        <Card.Body>
          <Form>
            <Form.Label as='h5'>Company name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter company name'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
            <Button
              variant='dark'
              type='button'
              block
              className='mt-3'
              onClick={() => this.NewCompany(name)}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default NewCompany;
