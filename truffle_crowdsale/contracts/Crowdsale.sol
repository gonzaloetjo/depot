pragma solidity ^0.6.0;

import "/SafeMath.sol";
import "./Erc20.sol";
import "./whitelist_dev.sol";

contract Crowdsale is Whitelist {
    using SafeMath for uint256;
    //address public owner; // the owner of the contract 
    //address payable public wallet; // wallet to collect raised ETH 
    uint256 public savedBalance = 0; // Total amount raised in ETH
    ERC20 public token; // token to sale 
    uint256 public rate; // to initilize 
    mapping (address => uint256) investisments; // Balances in incoming Ether
    uint256 _tokenAmount;
    uint end;
    uint minInvest;
    uint maxInvest;
    uint numberTeams;
    uint team_balances;
    uint[] balances;
    //mapping (Whitelists[] => uint) balanxes;
    //mapping (adress => mapping (adress => ))
    // Events to record new contributions
    event Contribution(address indexed _contributor, uint256 indexed _value, uint256 indexed _tokens);
    // Event to record each time Ether is paid out
    event PayEther(
    address indexed _receiver,
    uint256 indexed _value,
    uint256 indexed _timestamp
    );
    modifier checkBalances() {
        require(balances[indices[msg.sender]] > msg.value);
        _;
    }
    modifier _preValidatePurchase(address _beneficiary, uint256 _amount) {
        require(_beneficiary != address(0));
        require(_amount != 0);
        _;
    }
    
    // Initialization
    constructor (uint _period, uint _min, uint _max) public{
        owner = msg.sender;
        // deploy new instance of ERC20
        token = new ERC20();
        // add address of the specific contract
        //wallet = _wallet;
        end =  now + _period;
        minInvest = _min;
        maxInvest = _max;
        numberTeams = whitelists.length;
    }
    
    function buyTokens(address _beneficiary) public payable checkBalances _preValidatePurchase(_beneficiary, msg.value) {
        require(whitelists[indices[msg.sender]]._whitelist_team[msg.sender]);
        require(now >= whitelists[indices[msg.sender]].dateFin );
        //require(msg.value == _amount_tokens*rate);
        updateTeamsBalances();
        updateRate();
        investisments[_beneficiary] = investisments[_beneficiary].add(msg.value);
        uint256 amount = msg.value;
        balancesUpdate(_beneficiary, amount);
        token.transfer(_beneficiary, msg.value*rate);
        //savedBalance = savedBalance.add(amount);
        emit Contribution(_beneficiary, msg.value, msg.value*rate);
    }
    // fallback function to receive ETH
    fallback() external payable {
        buyTokens(msg.sender);
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
    function updateTeamsBalances() internal {
        team_balances = team_portions[indices[msg.sender]] * token.totalSupply();
    }
    function updateRate() internal {
        rate = team_portions[indices[msg.sender]] * whitelists[indices[msg.sender]].rate_team;
    }
    function balancesUpdate(address _beneficiary, uint _amount) internal {
        require(balances[indices[_beneficiary]] > _amount);
        balances[indices[_beneficiary]] = balances[indices[msg.sender]].sub(_amount);
    }
    
}