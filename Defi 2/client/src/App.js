import React, { Component } from 'react';
import getWeb3 from './getWeb3';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './components/Navbar';
import Blacklist from './components/Blacklist';
import Register from './components/Register';
import AddDemands from './components/AddDemands';
import Demands from './components/Demands';
import DemandsC from './components/DemandsC';
//import Artwork from './images/artwork.jpg';
import NewCompany from './components/NewCompany';
import Applications from './components/Applications';


import MarketPlaceContract from './contracts/marketPlace.json';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      isAdmin: false,
      isCompany: false,
      isNew: false,
      hasDemand: false,
      isArtist: false,
    };
  }
  componentDidMount = async () => {
    await this.loadWeb3();
    await this.isAdmin();
    await this.isCompany();
    await this.hasDemad();
    await this.isNew()
    await this.isArtist()
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

  isCompany = async() => {
    const { accounts, contract } = this.state;

    try {
      if ( await contract.methods.isCompany((accounts[0])).call()) {
        this.setState({ isCompany: true});
      } 
    } catch (err) {
      console.log(err);
    }
  }

  hasDemad = async() => {
    const { accounts, contract } = this.state;

    try {
      if (await contract.methods.hasDemand((accounts[0])).call()) {
        this.setState({ hasDemand: true});
      } 
    } catch (err) {
      console.log(err);
    }
  }

  isNew = async() => {
    const { accounts, contract } = this.state;

    try {
      console.log(await contract.methods.isCompany((accounts[0])).call())
      if (await contract.methods.isCompany((accounts[0])).call() === false &&
      await contract.methods.isArtist((accounts[0])).call() === false ) {
        this.setState({ isNew: true});
      }
    } catch (err) {
      console.log(err)
    }
  }

  isArtist = async() => {
    const { accounts, contract } = this.state;

    try {
      console.log(await contract.methods.isCompany((accounts[0])).call())
      if (await contract.methods.isArtist((accounts[0])).call() === true ) {
        this.setState({ isArtist: true});
      }
    } catch (err) {
      console.log(err)
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
    const { accounts, contract, web3, isAdmin, isCompany, isNew, hasDemand, isArtist } = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    window.ethereum.on('chainChanged', () => {
      document.location.reload()
    })
  
    return (
      
      <div className="App">
        <Header title='Illustrator MarketPlace' />
          <Container>
            {isNew ? (
              <Row>
                <Col sm={6}>
                  <Register contract={contract} accounts={accounts} />
                </Col>
                <Col sm={6}>
                  <NewCompany contract={contract} accounts={accounts} />
                </Col>
              </Row>
            ) : null}
            {(isNew === false) ? (
            <Row>
              <Row className='mt-3'>
                <Col>
                  {isAdmin ? (
                    <Blacklist contract={contract} accounts={accounts} />
                    ) : null}
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                  {isCompany ? (
                    <AddDemands contract={contract} accounts={accounts} />
                  ) : null}
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                {isArtist ? (
                  <Demands contract={contract} accounts={accounts} />
                ) : null}
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                {isCompany ? (
                  <DemandsC contract={contract} accounts={accounts} />
                ) : null}
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                  {isCompany && hasDemand ? (
                    <Applications contract={contract} accounts={accounts} />
                  ) : null}
                </Col>
              </Row>
            </Row>
            ) : null}
        </Container>
      </div>
    )
  }
}

export default App;
