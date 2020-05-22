import React, { Component } from 'react';
import { Container, Row, Col, Table }  from 'react-bootstrap';

class DemandsC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //array: [],
      //list: [],
      requests: [],
      company_name: "",
    }
  }

  componentDidMount = () => {
    //this.allDemands();
    //this.list(this.state.array);
    this.getDemands();
    this.getName();
  }

  getDemands = async () => {
    const { contract } = this.props;

    try {
      const requests = []
      const keys = await contract.methods.getKeys().call();
      for (let index = 0; index < keys; index++) {
        let a = await contract.methods.dems(index).call(); 
        requests.push(a);
      }

      this.setState({ requests });
      console.log(requests)
    } catch (err) {
      console.log(err);
    }
  }


  // getName = async () => {
  //   const { accounts, contract } = this.props;

  //   try {
  //     const company_name = await contract.getCompanyName(accounts[0]).call()
      
  //     this.setState({ company_name });
  //     console.log(company_name)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  render() {
    const { requests, company_name } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h5 className='text-white'>Art Requests</h5>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>Demand</th>
                  <th>Deadline</th>
                  <th>Payment (wei)</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((el, idx) => (
                  <tr key={idx}>
                    {console.log(company_name)}
                    {/*{(el.company === company_name) ? (*/}
                    <td>{el.demand}</td>
                    <td>{el.delay}</td>
                    <td>{el.remuneration}</td>
                    <td>{el.description}</td>
                    {/*) : null}*/}
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

export default DemandsC;
