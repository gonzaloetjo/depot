import React, { Component } from 'react';
import { Container, Row, Col, Table, Button }  from 'react-bootstrap';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    }
  }

  componentDidMount = () => {
    this.getRequests();
  }

  getRequests = async () => {
    const { contract } = this.props;

    try {
      const requests = await contract.methods.getRequests().call();

      this.setState({ requests });
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
    const { requests } = this.state;
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
                {requests.map((el, idx) => (
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

export default Requests;
