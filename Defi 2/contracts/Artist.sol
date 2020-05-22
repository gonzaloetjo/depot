pragma solidity >=0.4.21 <0.7.0;
import "./SafeMath.sol";

contract Rating {
    using SafeMath for uint256;

    //VARIABLES
    address payable public wallet;
    mapping (address => bool) public allArtist;
    mapping (address => bool) public blackList;
    mapping(string => bool) artist_name;
    address[] private admins;
    address public owner;
    

    //STRUCTURES  

    struct Ratings{
        uint data_rating;
        mapping (address => bool) rater;
    }

    struct Art_piece {
        string art_piece_url;
        //int data_rating;
        mapping(address => Ratings) ratings;
    }
    struct Artist {
        string name;
        mapping(address => bool) artist_present;
        mapping(string => Art_piece) art_pieces;
        mapping(string => bool) art_piece_names;
        uint userReputation;
        uint userFnishedWorks;
        uint numberRatings;
        uint[] allRatings;
    }
    mapping(address => Artist) public artists;
    
    constructor() public payable{
        owner = msg.sender;
        wallet = msg.sender;
        registerAdmin();
    }

    //MODIFIERS

        
    modifier notBanned(address _artist){
        require(!blackList[_artist] == true, "This artist address is banned!");
        _;
    }
    
    
    modifier onlyAdmin(address _address){
        require(adminExists(msg.sender) == true, "You are not the admin");
        _;
    }
    
    modifier isAnArtist(address _artist) {
        require(allArtist[_artist] == true, "Not registered as an Artist");
        _;
    }
    
    modifier NotAnArtist(address _artist) {
        require(allArtist[_artist] == false, "Already an Artist");
        _;
    }
    
    modifier nameArtist(string memory _name) {
        require(artist_name[_name] == false, "Name is already in use");
        _;
    }
    
    modifier nameArtPiece(address _artist, string memory _art_piece) {
        require(artists[_artist].art_piece_names[_art_piece] == false, "Name is already in use");
        _;
    }
    
    modifier limitRatings(uint _rating) {
        require(5 >= _rating && _rating >= 1, "rating should be betwee 1 and 5");
        _;
    }

    //FUNCTIONS
    
    function register(string memory _name) public NotAnArtist(msg.sender) nameArtist (_name) {
        artists[msg.sender].userReputation = 5;
        artists[msg.sender].name = _name;
        artists[msg.sender].artist_present[msg.sender] = true;
        allArtist[msg.sender] = true;
        artists[msg.sender].numberRatings = artists[msg.sender].numberRatings.add(1);
        updateReputation(msg.sender);
        artist_name[_name] == true;
    }
    
    function existReview(address _artist, string memory _art_piece, address _rater) public view returns(uint){
        if(artists[_artist].art_pieces[_art_piece].ratings[_rater].data_rating==0) return 0;
        else return 1;
    }
    
    function setReview(address _artist, string memory _art_piece, uint _rating) isAnArtist(_artist) limitRatings(_rating) public  {
        address reviewer = msg.sender;
        //artists[reviewer].art_pieces[_artist].data_content = _contents;
        artists[_artist].art_pieces[_art_piece].ratings[reviewer].data_rating = _rating;
        artists[_artist].allRatings.push(_rating);
        artists[_artist].numberRatings = artists[_artist].numberRatings.add(1);
        updateReputation(_artist);

    }
    //function getReview(address _reviewer, address _artist, string memory _art_piece) public view returns (string memory) {
    //    return (artists[_reviewer].art_pieces[_artist].piece_reviews[_art_piece].data_content);
    //}
    function getRating(address _artist, string memory _art_piece, address _reviewer) public view returns (uint) {
        return (artists[_artist].art_pieces[_art_piece].ratings[_reviewer].data_rating);
    }
    
    function ban(address _artist) onlyAdmin(msg.sender) notBanned(_artist) isAnArtist(_artist) public {
        blackList[_artist] = true;
        artists[_artist].userReputation = 0;
    }
    
    function updateReputation(address _artist) internal  returns (uint){
        uint sumRatings = 0;
        for (uint i = 0; i <artists[_artist].allRatings.length; i++) sumRatings = sumRatings.add(artists[_artist].allRatings[i]);
        artists[_artist].userReputation = (sumRatings.div(artists[_artist].numberRatings)).add(5);
    }
    
    function registerAdmin() private {
        admins.push(msg.sender);
    }
    
    function adminExists(address _address) public view returns (bool) {
        for (uint i = 0; i < admins.length; i++) {
            if (_address == admins[i]) { return true;
            }
        }
        return false;
    }
    function isArtist(address _artist) public view returns (bool) {
        return allArtist[_artist];
    }
    function getArtist(address _artist) public view returns (string memory){
        return artists[_artist].name;
    }
}