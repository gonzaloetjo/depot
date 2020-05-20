pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Artist.sol";
import "./SafeMath.sol";
//https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#methods-mymethod-estimategas 

contract marketPlace is Rating{

    //VARIABLES  

    //string demandx;
    string[] all_demands;
    enum Status {Open, Ongoing, Closed}
    address[] public companies_addresses;
    address[] public applications;
    mapping(address => bool) companies_existance;
    mapping(string => bool) companies_name;
    mapping(address => uint) c_balances;
    uint keys = 0;
    //STRUCTURES   

    struct Dem{ 
        string company;
        string demand;
        uint delay;
        string description;
        Status status;
        uint remuneration;
    }

    struct Demand{
        uint remuneration;
        uint delay;
        uint deadline;
        string description;
        Status status;
        uint minRep;
        mapping(address => bool) candidates;
        address payable chosen;
        address addressCompany;
        uint deposit;
        string art_piece;
        bool url_exist;
        mapping(address => uint) balances;
        uint value;
    }

    struct Companies{
        string name;
        mapping(string => Demand) demands;
        mapping(string => bool) all_demands_company;
    }

    //MAPPINGS FOR STRUCTURE  

    mapping(address => Companies)  public companies;
    mapping(uint => Dem) public dems;
    mapping(address => uint) public dem_key;


    // MODIFIERS  

    modifier checkReputation(address _company, string memory _demand_name){
        require(artists[msg.sender].userReputation >= companies[_company].demands[_demand_name].minRep);
        _;
    }

    modifier statusOpen(address _company, string memory _demand_name) {
        require(companies[_company].demands[_demand_name].status == Status.Open, "This project is closed");
        _;
    }
    
    modifier statusOnGoing(address _company, string memory _demand_name) {
        require(companies[_company].demands[_demand_name].status == Status.Ongoing, "This project is not OnGoing");
        _;
    }

    modifier selectedArtist(address _company, string memory _demand_name, address _artist) {
        require(companies[_company].demands[_demand_name].chosen == _artist, "this is not the selected artist");
        _;
    }

    modifier ownerCompany(address _company) {
        require(msg.sender == _company);
        _;
    }
    
    modifier checkDeadline(address _company, string memory _demand_name){
        require(companies[_company].demands[_demand_name].deadline > now, "Still open");
        _;
    }
    
    modifier Applied(address _company, string memory _demand_name, address _artist){
        require(companies[_company].demands[_demand_name].candidates[_artist] == true, "This artist has not applied to this project !");
        _;
    }
    
    modifier notApplied(address _company, string memory _demand_name){
        require(companies[_company].demands[_demand_name].candidates[msg.sender] == false, "This artist has not applied!");
        _;
    }

    modifier companyNotSuscribed(){
        require(companies_existance[msg.sender] == false, "Your company is already subscribed");
        _;
    }

    modifier companySuscribed(address _company){
        require(companies_existance[_company] == true, "This company is not suscribed!");
        _;
    }

    modifier companyName(string memory _company_name){
        require(companies_name[_company_name] == false, "This company name is already suscribed!");
        _;
    }
    
    modifier minReputation(uint _minRep) {
        require(_minRep >= 5, "your minum reputation is too low, at least 5");
        _;
    }
    
    modifier minDelay(uint _delay) {
        require(_delay >= 7200, "your minum delay is too low, at least it has to be 7200");
        _;
    }
    
    modifier demandNotExist(string memory _demand_name) {
        require(companies[msg.sender].all_demands_company[_demand_name] == false, "Demand already exists");
        _;
    }
    
    modifier demandExist(string memory _demand_name) {
        require(companies[msg.sender].all_demands_company[_demand_name] == true, "Demand doesn't exists");
        _;
    }
    
    modifier urlExists(address _company, string memory _demand_name) {
        require(companies[_company].demands[_demand_name].url_exist == true, "Art piece wasn't uploaded");
        _;
    }
    
    // FUNCTIONS  
    
    function newCompany(string memory _company_name) companyNotSuscribed companyName(_company_name) public {
        companies[msg.sender].name = _company_name;
        companies_name[_company_name] = true;
        companies_existance[msg.sender] = true;
        companies_addresses.push(msg.sender);
    }

    function getCompanies() public view returns(address[] memory){
        return companies_addresses;
    }
    
    function addDemands(uint _delay, string memory _description, uint _minRep, string memory _demand_name, uint _value) public payable
        minReputation(_minRep) companySuscribed(msg.sender) minDelay(_delay) demandNotExist(_demand_name) {
        //Demande memory demande;
        companies[msg.sender].demands[_demand_name].addressCompany = msg.sender;
        companies[msg.sender].demands[_demand_name].deposit = msg.value;
        companies[msg.sender].demands[_demand_name].description = _description;
        companies[msg.sender].demands[_demand_name].status = Status.Open;
        companies[msg.sender].demands[_demand_name].minRep = _minRep;
        companies[msg.sender].demands[_demand_name].delay = _delay;
        companies[msg.sender].demands[_demand_name].value = _value;
        companies[msg.sender].demands[_demand_name].balances[msg.sender] = 0;
        companies[msg.sender].all_demands_company[_demand_name] = true;
        //demandx = strConcat("Company :", companies[msg.sender].name, " | ", _demand_name, " ");
        all_demands.push(_demand_name);
        addDeposit(_demand_name, _value);
        dems[keys].company = companies[msg.sender].name;
        dems[keys].delay = _delay;
        dems[keys].status = Status.Open;
        dems[keys].remuneration = _value;
        dem_key[msg.sender] = keys;
        keys = keys.add(1);
    }

    function getDemands() public view returns(string[] memory){
        return all_demands;
    }

    function isDemandofCompany(address _company, string memory _demand) public view returns(bool){
        return companies[_company].all_demands_company[_demand];
    }
    
    function addDeposit(string memory _demand_name, uint _value) payable public {
        require(companies[msg.sender].demands[_demand_name].balances[msg.sender] == 0);
        companies[msg.sender].demands[_demand_name].balances[msg.sender] = _value;
        //c_balances[msg.sender] = c_balances[msg.sender].add(msg.value);
    }
    
    
    function application(address _company, string memory _demand_name) public payable
    isAnArtist(msg.sender) statusOpen(_company, _demand_name) notApplied(_company, _demand_name) checkReputation(_company, _demand_name) {
        companies[_company].demands[_demand_name].candidates[msg.sender] = true;
    }

    function winningOffer(string memory _demand_name, address payable _artist) public
    companySuscribed(msg.sender) ownerCompany(msg.sender) demandExist(_demand_name) 
    statusOpen(msg.sender, _demand_name) Applied(msg.sender, _demand_name, _artist)  {
        companies[msg.sender].demands[_demand_name].chosen = _artist;
        companies[msg.sender].demands[_demand_name].status = Status.Ongoing;
        companies[msg.sender].demands[_demand_name].deadline = now.add(companies[msg.sender].demands[_demand_name].delay);
        dems[dem_key[msg.sender]].status = Status.Ongoing;
    }
    
    function delivery(address _company, string memory _demand_name, string memory _art_piece, string memory _url) public 
    selectedArtist(_company, _demand_name, msg.sender) statusOnGoing(_company, _demand_name) 
    checkDeadline(_company, _demand_name) /*nameArtPiece(_artist, _art_piece) */{
        companies[_company].demands[_demand_name].art_piece = _art_piece;
        companies[_company].demands[_demand_name].url_exist = true;
        artists[msg.sender].art_pieces[_art_piece].art_piece_url = _url;
    }
    
    
    function artistRating(string memory _demand_name, string memory _art_piece, uint _rating) public
    urlExists(msg.sender, _demand_name) statusOnGoing(msg.sender, _demand_name){
        address payable _artist = companies[msg.sender].demands[_demand_name].chosen;
        artists[_artist].userReputation = artists[_artist].userFnishedWorks.add(1);
        companies[msg.sender].demands[_demand_name].status = Status.Closed; 
        setReview(_artist, _art_piece, _rating);
        artistPayment(msg.sender, _demand_name, _artist);
        dems[dem_key[msg.sender]].status = Status.Closed;

    }
    
    function artistPayment(address _company, string memory _demand_name, address payable _artist) public payable {
        //msg.sender.transfer(companies[_company].demands[_demand_name].remuneration);
        _artist.transfer(companies[_company].demands[_demand_name].deposit);
        //companies[msg.sender].demands[_demand_name].balances[msg.sender] = 0;
    }
    
    
    function delay(address _artist) public{
        artists[_artist].userReputation = artists[_artist].userFnishedWorks.sub(1);
        artists[_artist].numberRatings = artists[_artist].numberRatings.sub(5);
        updateReputation(_artist);
    }

    function getKeys() public view returns (uint) {
        return keys;
    }
    
    /*function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e) internal returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (uint i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (uint i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (uint i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }*/

}

