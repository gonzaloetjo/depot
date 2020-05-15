import React, { Component } from "react";
import SceneOuverteContract from "./contracts/SceneOuverte.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { tour: 0, artist: null, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SceneOuverteContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SceneOuverteContract.abi,
        deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      this.loadData();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  loadData = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const tour = await contract.methods.getTour().call();
    const artist = await contract.methods.artisteEncours().call();

    console.log(artist);
    console.log(tour);
    // Update state with the result.
    this.setState({ tour,  artist});
  };
  
  addArtist = async (nomArtiste) => {
    const { contract, accounts } = this.state;
    await contract.methods.sInscrire(nomArtiste).send({from: accounts[0]});
    //await this.loadData();
  }
  addTour = async () => {
    const { contract, accounts } = this.state;
    await contract.methods.passerArtisteSuivant().send({from: accounts[0]})
    this.loadData();
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <div>The tour is: {this.state.tour}</div>
        <div>The actual artist is: {this.state.artist}</div>
        <div className="row">
              <h3>Add artist</h3>
              <form onSubmit={(event) => {
                event.preventDefault()
                const name = this.name.value
                this.addArtist(name)
              }}>
              <input
                  id="name"
                  type="text"
                  ref={(input) => { this.name = input }}
                  className="form-control"
                  placeholder="artist name"
                required />
              <button type="submit" className="btn btn-primary">add artist</button>
              </form>
            <button className="btn btn-primary" onClick={this.addTour}>add artist</button>  
            </div>  
      </div>
    );
  }
}

export default App;