// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;
// //import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/beacon/IBeaconUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

// abstract contract DynamintBeaconProxyUpgradeable is
//     Initializable,
//     UUPSUpgradeable,
//     AccessControlUpgradeable,
//     IBeaconUpgradeable
// {
//     bytes32 public constant SUPER_UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
//     address public bluePrint;

//     function __DynamintBeaconProxy_initialize(address _implementation)
//         public
//         initializer
//     {
//         //beacon = new UpgradeableBeacon(_implementation);
//         bluePrint = _implementation;
//         __UUPSUpgradeable_init();
//         __AccessControl_init();
//         _grantRole(DEFAULT_ADMIN_ROLE, tx.origin);
//         _grantRole(SUPER_UPGRADER_ROLE, tx.origin);
//     }

//     function implementation() external view override returns (address) {
//         return bluePrint;
//     }

//     function update(address _newImpl) public  {
//         bluePrint = _newImpl;
//     }

//     function _getDynamintBeacon()
//         external
//         view
//         returns (DynamintBeaconProxyUpgradeable)
//     {
//         return this;
//     }
// }
