import React, { Component } from 'react';
import { Container, Row, Col, Table, Button }  from 'react-bootstrap';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_demand_apps: [],
    }
  }

  componentDidMount = () => {
    this.getApplications();
  }

  getApplications = async () => {
    const { contract, accounts } = this.props;

    try {
      const all_demands = await contract.methods.getDemands().call();
      const all_applications = await contract.methods.getApps().call();
      let company_demand_apps = [];
      for (let index = 0; index < all_demands.length; index++) {
        if (await contract.methods.companyDemands(accounts[0], all_demands[index]).call()) {
          let thisKey = await contract.methods.demandKey(accounts[0], all_demands[index]).call() - 1
          var thisDemand = await contract.methods.dems(thisKey).call();
          //thisDemand.applications = [];
          thisDemand.applications = "";
          thisDemand.addressApplications = 0;
          for (let ind = 0; ind < all_applications.length; ind++) {
            if (await contract.methods.getAplication(accounts[0], all_demands[index], all_applications[ind]).call()){
              //thisDemand.applications.push(all_applications[ind])
              let artist = await contract.methods.getArtist(all_applications[ind]).call()
              thisDemand.applications = artist;
              thisDemand.addressApplications = all_applications[ind]
              console.log(thisDemand)
              company_demand_apps.push(thisDemand)
            }
          }
          //company_demand_apps.push(thisDemand)
          console.log(company_demand_apps)
        }
      }
      this.setState({ company_demand_apps });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { company_demand_apps } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h5 className='text-white'>List of Open-Demand Applications</h5>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Demand</th>
                  <th>Artist</th>
                  <th>Select Artist</th>
                </tr>
              </thead>
              <tbody>
                {company_demand_apps.map((el, idx) => (
                  <tr key={idx}>
                        <td>{el.company}</td>
                        <td>{el.demand}</td>
                        <td>{el.applications}</td>
                        <th>
                        {console.log(el.demand, el.applications)}
                          <Button
                            size='sm'
                            onClick={() => this.winningOffer(el.demand, el.applications)}
                          >
                            Select
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
