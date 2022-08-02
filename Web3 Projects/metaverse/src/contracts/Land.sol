//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721.sol";

contract Land is ERC721 {

    unit256 public cost = 1 ether;
    unit256 public maxSupply = 5;
    unit256 public totalSupply = 0;

    struct Building {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        unint256 sizeX;
        unint256 sizeY;
        unint256 sizeZ;
    }

    Building [] public buildings;

    constructor(string memory _name, string memory _symbol, unint256 _cost) ERC721(_name, _symbol) {
        cost = _cost;
        buildings.push(
            Building("City Hall", address(0x0), 0, 0, 0, 10, 10, 10)
        );
        buildings.push(Building("Stadium", address(0x0), 0, 10, 0, 10, 5, 3));
        buildings.push(
            Building("University", address(0x0), 0, -10, 0, 10, 5, 3)
        );
        buildings.push(
            Building("Shopping Plaza 1", address(0x0), 10, 0, 0, 5, 25, 5)
        );
        buildings.push(
            Building("Shopping Plaza 2", address(0x0), -10, 0, 0, 5, 25, 5)
        );
        )
        )
function mint(unint256 _id) public payable {
    unint256 supply = totalSupply;
    require(supply <= maxSupply);
    require(buildings[_id -1].owner == address(0x0));
    require(msg.value >= 1 ether);

    buildings[_id - 1].owner = msg.sender;
    totalSupply = totalSupply + 1;
    _safeMint(msg.sender, _id);

}

    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId

    ) public override {
        _isApprovedOrOwner(_msgSender, tokenId),
        "ERC721: transfer caller is not owner nor approved"
    );
    
    buildings[tokenId - 1].owner = to;
    _safetransfer(from, to, tokenId, _data);

    }

    function getBuildings() public view returns(Buildings[] memory) {
        return buildings;
    }

    function getBuilding(unint256 _id) public view returns (Building memory) {
        return buildings[_id - 1};]
    }
}