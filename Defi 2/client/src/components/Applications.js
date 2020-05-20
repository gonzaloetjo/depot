import React, { Component } from 'react';
import { Container, Row, Col, Table, Button }  from 'react-bootstrap';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
    }
  }

  componentDidMount = () => {
    this.getApplications();
  }

  getApplications = async () => {
    const { contract } = this.props;

    try {
      const applications = await contract.methods.getApplications().call();

      this.setState({ applications });
    } catch (err) {
      console.log(err);
    }
  }

  applyRequest = async id => {
    const { contract, accounts } = this.props;

    try {
      await contract.methods.applyToRequest(id).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { Applications } = this.state;
    const stateRequest = ['OPEN', 'INPROGRESS', 'CLOSED'];

    return (
      <Container>
        <Row>
          <Col>
            <h5 className='text-white'>List of Request</h5>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>State</th>
                  <th>Deadline</th>
                  <th>Payment (wei)</th>
                  <th>Description</th>
                  <th>Apply</th>
                </tr>
              </thead>
              <tbody>
                {Applications.map((el, idx) => (
                  <tr key={idx}>
                    <td>{el.id}</td>
                    <td>{stateRequest[el.state]}</td>
                    <td>{el.deadline}</td>
                    <td>{el.payment}</td>
                    <td>{el.description}</td>
                    <th>
                      <Button
                        variant={
                          !stateRequest[el.state] === 'INPROGRESS' ? 'outline-dark' : 'outline-success'
                        }
                        size='sm'
                        onClick={() => this.applyRequest(el.id)}
                        disabled={
                          stateRequest[el.state] === 'INPROGRESS' ? true : false
                        }
                      >
                        Send
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Applications;
