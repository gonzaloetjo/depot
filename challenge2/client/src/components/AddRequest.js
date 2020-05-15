import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';

class AddRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      payment: '',
      deadline: '',
      minReputation: ''
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  addRequest = async (description, payment, deadline, minReputation) => {
    const { contract, accounts } = this.props;

    try {
      await contract.methods.addRequest(description, payment, deadline, minReputation).send({ from: accounts[0] });

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { description, payment, deadline, minReputation } = this.state;

    return (
      <Card>
        <Card.Header as='h5'>Add Request</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label as='h5'>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter a description'
                name='description'
                value={description}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Payment</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your payment'
                  name='payment'
                  value={payment}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your deadline'
                  name='deadline'
                  value={deadline}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Reputation</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the minimum reputation'
                  name='minReputation'
                  value={minReputation}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Button
              variant='dark'
              type='button'
              block
              className='mt-3'
              onClick={() =>
                this.addRequest(description, payment, deadline, minReputation)
              }
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default AddRequest;
