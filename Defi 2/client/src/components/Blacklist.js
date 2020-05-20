import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

class Blacklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blacklist: '',
      unBlacklist: '',
    }
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    })
  }

  blacklist = async address => {
    const { accounts, contract } = this.props;

    try {
      const res = await contract.methods.blacklisted(address).send({ from: accounts[0] });
      console.log(res.status);

      this.setState({ blacklist: ''});
    } catch (err) {
      console.log(err);
      this.setState({ blacklist: '' });
    }
  }

  unBlacklist = async address => {
    const { accounts, contract } = this.props;

    try {
      const res = await contract.methods.unBlacklisted(address).send({ from: accounts[0] });
      console.log(res.status);

      this.setState({ unBlacklist: '' });
    } catch (err) {
      console.log(err);
      this.setState({ unBlacklist: '' });
    }
  }

  render() {
    const { blacklist, unBlacklist } = this.state;

    return (
      <Card>
        <Card.Header as='h5'>Administrator</Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Label as='h5'>User to blacklist</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter address'
                    name='blacklist'
                    value={blacklist}
                    onChange={this.handleChange}
                  />
                  <Button
                    variant='dark'
                    type='button'
                    block
                    className='mt-3'
                    onClick={() => this.blacklist(blacklist)}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
              <Col>
                <Form>
                  <Form.Label as='h5'>User to unblacklist</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter address'
                    name='unBlacklist'
                    value={unBlacklist}
                    onChange={this.handleChange}
                  />
                  <Button
                    variant='dark'
                    type='button'
                    block
                    className='mt-3'
                    onClick={() => this.unBlacklist(unBlacklist)}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    )
  }
}

export default Blacklist;
