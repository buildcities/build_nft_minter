// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DynamintBeaconProxy is AccessControl, UpgradeableBeacon {
    //UpgradeableBeacon immutable beacon;

    address public bluePrint;
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address _implementation) UpgradeableBeacon(_implementation) {
        //beacon = new UpgradeableBeacon(_implementation);
        bluePrint = _implementation;
        _grantRole(DEFAULT_ADMIN_ROLE, tx.origin);
        _grantRole(PAUSER_ROLE, tx.origin);
        _grantRole(MINTER_ROLE, tx.origin);
    }

    function update(address _newImpl) public {
        upgradeTo(_newImpl);
        bluePrint = _newImpl;
    }
}
