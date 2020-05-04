pragma solidity 0.6.0;

contract Bank {
    mapping (address => uint) private _balances; // association keys values
    
    function deposit (address _recipient, uint _amount) public {
        require(_recipient != address(0), "Can't transfer to adress 0");
        _balances[msg.sender] += _amount;
    }
    
    function transfer (address _reciver, uint _amount) public {
        require(_amount <= _balances[msg.sender], "you don't have cash");
        require(_reciver != address(0), "Can't transfer to adress 0");
        _balances[_reciver] += _amount;
        _balances[msg.sender] -= _amount;
    }
    
    function getBalance (address _adress) public view returns (uint) {
         _balances[_adress];
    }
}