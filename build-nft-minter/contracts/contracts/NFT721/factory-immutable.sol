// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
//pragma abicoder v2;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "./beacon-immutable.sol";
import "./base.sol";

/**
 * @dev This contract is for creating proxy to access ERC721Rarible token.
 *
 * The beacon should be initialized before call ERC721RaribleFactoryC2 constructor.
 *
 */

contract DynaMintFactory {
    DynamintBeaconProxy immutable beacon;

    event CreateDynaMintProxy(address proxy);
    event CreateDynaMintUserProxy(address proxy);

    struct Collection {
        string _name;
        string _symbol;
        address _contractAddress;
    }

    Collection[] internal collections;

    mapping(address => Collection[]) internal ownedCollections;

    constructor(address _beacon) {
        beacon = new DynamintBeaconProxy(_beacon);
    }

    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply
    ) external  returns(address) {
        BeaconProxy proxy = new BeaconProxy(
            address(beacon),
            getData(_name, _symbol, _maxSupply)
        );

        address _contractAddress = address(proxy);
        ownedCollections[msg.sender].push(
            Collection(_name, _symbol, _contractAddress)
        );

        collections.push(Collection(_name, _symbol, _contractAddress));

        emit CreateDynaMintProxy(_contractAddress);
        emit CreateDynaMintUserProxy(_contractAddress);
        return _contractAddress;
    }

    //deploying BeaconProxy contract with create2

    function allCollections() public view returns (Collection[] memory) {
        return collections;
    }

    function ownerCollections(address owner)
        public
        view
        returns (Collection[] memory)
    {
        return ownedCollections[owner];
    }

    //adding constructor arguments to BeaconProxy bytecode

    function getData(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply
    ) internal pure returns (bytes memory) {
        return
            abi.encodeWithSelector(
                Dynamint(address(0)).initialize.selector,
                _name,
                _symbol,
                _maxSupply
            );
    }
}
