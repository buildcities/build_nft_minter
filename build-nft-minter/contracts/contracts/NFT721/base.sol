// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "../@rarible/impl/RoyaltiesV2Impl.sol";
import "../@rarible/royalties/contracts/LibPart.sol";
import "../@rarible/royalties/contracts/LibRoyaltiesV2.sol";
import "../@rarible/upgradeable/RoyaltiesV2Upgradeable.sol";

contract Dynamint is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    ERC721BurnableUpgradeable,
    RoyaltiesV2Impl,
    RoyaltiesV2Upgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    CountersUpgradeable.Counter private _tokenIdCounter;

    struct Mint721Data {
        string tokenURI;
        LibPart.Part[][] royalties;
        uint256 mintAmount;
    }

    uint256 maxSupply;

    /// @custom:oz-upgrades-unsafe-allow constructor
    // constructor() initializer {}

    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __ERC721URIStorage_init();
        __Pausable_init();
        __AccessControl_init();
        __ERC721Burnable_init();
        __RoyaltiesV2Upgradeable_init_unchained();

        if (_maxSupply > 0) {
            maxSupply = _maxSupply;
        } else {
            maxSupply = 0;
        }

        _grantRole(DEFAULT_ADMIN_ROLE, tx.origin);
        _grantRole(PAUSER_ROLE, tx.origin);
        _grantRole(MINTER_ROLE, tx.origin);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(
        address to,
        string memory uri,
        LibPart.Part[] memory royalties
    ) public onlyRole(MINTER_ROLE) {
        _tokenIdCounter.increment();
        _safeMint(to, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), uri);
        if (royalties.length > 0) {
            _saveRoyalties(_tokenIdCounter.current(), royalties);
        }
    }

    function mintBatch(Mint721Data memory _data)
        public
        onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        uint256 supply = _tokenIdCounter.current();
        require(_data.mintAmount > 0);
        if (maxSupply > 0) {
            require(supply + _data.mintAmount <= maxSupply);
        }

        for (uint256 i = 1; i <= _data.mintAmount; i++) {
            _tokenIdCounter.increment();
            _safeMint(msg.sender, _tokenIdCounter.current());
            _setTokenURI(_tokenIdCounter.current(), _data.tokenURI);

            if (_data.royalties.length > 0) {
                _saveRoyalties(_tokenIdCounter.current(), _data.royalties[i-1]);
            }
        }
        return _tokenIdCounter.current();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC165Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
