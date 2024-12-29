// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/AccessControl.sol';
import './interfaces/IToken.sol';

/**
 * @title EcoEarn Contract
 * @dev This contract manages a reward system based on cycles. Participants can make valid submissions to earn rewards.
 */
contract  B3TRBite is AccessControl {
    IToken public token;
    
    address owner;

    uint256 rewardRate = 2000;

    struct Donation{
        string foodDescription;
        uint256 rewards;
        uint256 donationDate;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not the owner");
        _;
    }

    mapping(address => Donation[]) private userDonation;

    uint256 totalSubmissions;

    Donation[] donations;

    mapping(address => uint256) public submission;

    event Submission(address indexed participant, uint256 amount);

    constructor(address _token) {
        token = IToken(_token);
        owner = msg.sender;
    }

    function registerDonation(address participant, uint256 amount, string  memory foodDescription) public onlyOwner {
        require(amount > 0, 'Donation: Amount must be greater than 0');
        // Increment the total submissions count
        totalSubmissions++;
        uint256 reward = (amount * rewardRate) / 10000;
         Donation memory newDonation = Donation({
            foodDescription: foodDescription,
            donationDate: block.timestamp,
            rewards: reward
        });
        submission[participant]++;
        userDonation[participant].push(newDonation);
        emit Submission(participant, amount);
    }


    function rewardDonater(address donater,uint256 reward) public onlyOwner {
        require(reward <= token.balanceOf(msg.sender), 'B3TR: Insufficient balance');
        // require(token.transferFrom(msg.sender, address(this), reward));
        require(token.transfer(donater, reward * 1000000000000000000));
    }

    // Function to get the list of structs for a given address
    function getDonation(address user) public view returns (Donation[] memory) {
        return userDonation[user];
    }

    function setToken(address _token) public onlyOwner {
        token = IToken(_token);
    }


}
