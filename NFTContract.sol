// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AndromedaNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct NFTMetadata {
        string name;
        string description;
        string imageURI;
    }
    
    mapping(uint256 => NFTMetadata) private _tokenMetadata;
    
    constructor() ERC721("AndromedaNFT", "ANFT") {}
    
    function mintNFT(
        address recipient,
        string memory name,
        string memory description,
        string memory imageURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(recipient, newTokenId);
        _tokenMetadata[newTokenId] = NFTMetadata(name, description, imageURI);
        
        return newTokenId;
    }
    
    function getNFTMetadata(uint256 tokenId) 
        public 
        view 
        returns (NFTMetadata memory) 
    {
        require(_exists(tokenId), "NFT does not exist");
        return _tokenMetadata[tokenId];
    }
    
    function getTotalNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
}
