import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';

class AddDemands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: '',
      description: '',
      minReputation: '',
      demand_name: '',
      payment: '',
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  addDemands = async (deadline, description, minReputation, demand_name, payment) => {
    const { contract, accounts } = this.props;

    try {
      await contract.methods.addDemands(deadline, description, minReputation, demand_name, payment).send({ from: accounts[0] });

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { deadline, description, minReputation, demand_name, payment} = this.state;

    return (
      <Card>
        <Card.Header as='h5'>Add Demands</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label as='h5'>Request Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter a name for the demand'
                name='demand_name'
                value={demand_name}
                onChange={this.handleChange}
              />
            </Form.Group>
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
                this.addDemands(deadline, description, minReputation, demand_name, payment)
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

export default AddDemands;
