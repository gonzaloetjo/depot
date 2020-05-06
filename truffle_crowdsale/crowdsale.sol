pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Erc20.sol";
import "./whitelist_devs.sol";

contract Crowdsale is Whitelist {
    using SafeMath for uint256;
    //address public owner; // the owner of the contract 
    //address payable public wallet; // wallet to collect raised ETH 
    uint256 public savedBalance = 0; // Total amount raised in ETH
    ERC20 public token; // token to sale 
    uint256 public rate = 1; // to initilize 
    mapping (address => uint256) investisments; // Balances in incoming Ether
    uint256 _tokenAmount;
    //mapping (adress => mapping (adress => ))
    // Events to record new contributions
    event Contribution(address indexed _contributor, uint256 indexed _value, uint256 indexed _tokens);
    // Event to record each time Ether is paid out
    event PayEther(
    address indexed _receiver,
    uint256 indexed _value,
    uint256 indexed _timestamp
    );
    // Initialization
    constructor () public{
        owner = msg.sender;
        // deploy new instance of ERC20
        token = new ERC20();
        // add address of the specific contract
        //wallet = _wallet;
    }
    
    function buyTokens(address _beneficiary, uint indice) public payable {
        require(whitelists[indice]._whitelist_team[msg.sender]);
        //require(msg.value == _amount_tokens*rate);
        investisments[_beneficiary] = investisments[_beneficiary].add(msg.value);
        uint256 weiAmount = msg.value;
        _preValidatePurchase(_beneficiary, weiAmount);
        // calculate token amount to be created AND process purchase
        token.transfer(_beneficiary, msg.value*rate);
        //uint256 tokens = _getTokenAmount(weiAmount);
        // update state
        savedBalance = savedBalance.add(weiAmount);
        emit Contribution(_beneficiary, msg.value, msg.value*rate);
    }
    // fallback function to receive ETH
    function() external payable {
        buyTokens(msg.sender, 0);
    }
    // refund investisor 
    function withdrawPayments() public{
        address payable payee = msg.sender;
        uint256 payment = investisments[payee];

        require(payment != 0);
        require(address(this).balance >= payment);
        
        savedBalance = savedBalance.sub(payment);
        investisments[payee] = 0;
        
        payee.transfer(payment);
    }
    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        require(_beneficiary != address(0));
        require(_weiAmount != 0);
    }
}