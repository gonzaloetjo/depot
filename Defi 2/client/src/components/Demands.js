import React, { Component } from 'react';
import { Container, Row, Col, Table, Button }  from 'react-bootstrap';

class Demands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //array: [],
      //list: [],
      requests: [],
    }
  }

  componentDidMount = () => {
    //this.allDemands();
    //this.list(this.state.array);
    this.getDemands();
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

  // allDemands = async () => {
  //   const { contract } = this.props;

  //   try {
  //     const demands = await contract.methods.getDemands().call();
  //     const companies = await contract.methods.getCompanies().call();
  //     const array = []
  //     for (let index = 0; index < companies.length; index++) {
  //       let company = companies[index];
  //       for (let ind = 0; ind < demands.length; ind++) {
  //         let demand = demands[ind];
  //         if (await contract.methods.isDemandofCompany(company, demand).call()) {
  //           array.push([company, demand])
  //         }          
  //       } 
  //     }
  //     this.list(array)
  //     this.setState({ array });
  //     console.log(array)
  //   } catch (err) {
  //   console.log(err);
  //   }
  // }

  // list = async (array) => {
  //   const { contract } = this.props;

  //   try {
  //     const list = []
  //     console.log(array)
  //     for (let index = 0; index < array.length; index++) {
  //       let element = array[index];
  //       let a = await contract.companies[element[0]];
  //       list.push(a)
  //     }
  //     this.setState({ list });
  //     console.log(list)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  application = async (company, demand) => {
    const { contract, accounts } = this.props;

    try {
      await contract.methods.application(company, demand).send({ from: accounts[0] });
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
            <h5 className='text-white'>Art Requests</h5>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>company</th>
                  <th>Demand</th>
                  <th>Deadline</th>
                  <th>Payment (wei)</th>
                  <th>Description</th>
                  <th>Apply</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((el, idx) => (
                  <tr key={idx}>
                    <td>{el.company}</td>
                    <td>{el.demand}</td>
                    {console.log(el[0])}
                    <td>{el.delay}</td>
                    <td>{el.remuneration}</td>
                    <td>{el.description}</td>
                    <th>
                    {console.log(el.company_address, el.demand)}
                      <Button
                        variant={
                          !stateRequest[el.state] === 'INPROGRESS' ? 'outline-dark' : 'outline-success'
                        }
                        size='sm'
                        onClick={() => this.application(el.company_address, el.demand )}
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

export default Demands;
