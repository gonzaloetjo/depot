const { BN, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const ERC20 = artifacts.require('ERC20');

contract('ERC20', function (accounts) {
  const _name = 'COV Token';
  const _symbol = 'COV';
  const _decimals = new BN(18);
  const owner = accounts[0];
  const recipient = accounts[1];
  const spender = accounts[2];

  // Avant chaque test unitaire
  beforeEach(async function () {
    this.ERC20Instance = await ERC20.new({ from: owner });
  });

  // Premier test unitaire
  it('a un nom', async function () {
    expect(await this.ERC20Instance.name()).to.equal(_name);
  });

  // Deuxième test unitaire
  it('a un symbole', async function () {
    expect(await this.ERC20Instance.symbol()).to.equal(_symbol);
  });

  // Test balance
  it('a une balance', async function () {
    let balanceOwner = await this.ERC20Instance.balanceOf(owner);
    let totalSupply = await this.ERC20Instance.totalSupply();
    expect(balanceOwner).to.be.bignumber.equal(totalSupply);
  });

  // Test transfert
  it('vérifie si un transfer est bien effectué', async function () {
    let balanceOwnerBeforeTransfer = await this.ERC20Instance.balanceOf(owner);
    let balanceRecipientBeforeTransfer = await this.ERC20Instance.balanceOf(
      recipient
    );
    let amount = ether('10');

    await this.ERC20Instance.transfer(recipient, amount, { from: owner });

    let balanceOwnerAfterTransfer = await this.ERC20Instance.balanceOf(owner);
    let balanceRecipientAfterTransfer = await this.ERC20Instance.balanceOf(
      recipient
    );

    expect(balanceOwnerAfterTransfer).to.be.bignumber.equal(
      balanceOwnerBeforeTransfer.sub(amount)
    );
    expect(balanceRecipientAfterTransfer).to.be.bignumber.equal(
      balanceRecipientBeforeTransfer.add(amount)
    );
  });

  // Approve
  it('Test it was amount was approved', async function () {
    let beforeApproved = await this.ERC20Instance.allowance(
      owner, spender
    );
    let amount = ether('10');

    await this.ERC20Instance.approve(spender, amount, { from: owner });
    
    let afterApproved = await this.ERC20Instance.allowance(
      owner, spender
    );

    expect(afterApproved).to.be.bignumber.equal(
        beforeApproved.add(amount)
    );
  });
});