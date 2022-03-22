// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DynamintBeaconProxy is AccessControl, UpgradeableBeacon {
    //UpgradeableBeacon immutable beacon;

    address public bluePrint;
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    constructor(address _implementation) UpgradeableBeacon(_implementation) {
        //beacon = new UpgradeableBeacon(_implementation);
        bluePrint = _implementation;
        _grantRole(DEFAULT_ADMIN_ROLE, tx.origin);
        _grantRole(OWNER_ROLE, tx.origin);
    }

    function update(address _newImpl) public onlyRole(OWNER_ROLE) {
        upgradeTo(_newImpl);
        bluePrint = _newImpl;
    }
}
