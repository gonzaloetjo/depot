import React, { Component } from 'react';
import getWeb3 from './getWeb3';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './components/Navbar';
import Blacklist from './components/Blacklist';
import Register from './components/Register';
import AddDemands from './components/AddDemands';
import Demands from './components/Demands';
//import Artwork from './images/artwork.jpg';
import NewCompany from './components/NewCompany';

import MarketPlaceContract from './contracts/marketPlace.json';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      isAdmin: true,
    };
  }
  componentDidMount = async () => {
    await this.loadWeb3();
    this.isAdmin();
    };
  loadWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MarketPlaceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MarketPlaceContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  isAdmin = async() => {
    const { accounts, contract } = this.state;

    try {
      const admin = await contract.methods.owner().call();

      if (admin === accounts[0]) {
        this.setState({ isAdmin: true});
      }
    } catch (err) {
      console.log(err);
    }
  }
;
  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    const { accounts, contract, web3, isAdmin } = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Header title='Illustrator MarketPlace' />
          <Container>
            <Row>
              <Col sm={6}>
                <Register contract={contract} accounts={accounts} />
              </Col>
              <Col sm={6}>
                <NewCompany contract={contract} accounts={accounts} />
              </Col>
            </Row>
            <Row className='mt-3'>
            <Col>
              {isAdmin ? (
                <Blacklist contract={contract} accounts={accounts} />
              ) : null}
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col>
              <AddDemands contract={contract} accounts={accounts} />
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col>
              <Demands contract={contract} accounts={accounts} />
            </Col>
          </Row>


          <Row className='mt-3'>
            <Col>
              <Applications contract={contract} accounts={accounts} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
