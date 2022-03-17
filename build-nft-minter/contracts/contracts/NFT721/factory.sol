// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;
// //pragma abicoder v2;

// import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// //import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

// import "./beacon.sol";
// import "./base.sol";

// /**
//  * @dev This contract is for creating proxy to access ERC721Rarible token.
//  *
//  * The beacon should be initialized before call ERC721RaribleFactoryC2 constructor.
//  *
//  */

// contract DynaMintFactoryUpgradeable is
//     Initializable,
   
//     AccessControlUpgradeable,
//     DynamintBeaconProxyUpgradeable
// {
//     DynamintBeaconProxyUpgradeable public beacon;

//     event CreateDynaMintProxy(address proxy);
//     event CreateDynaMintUserProxy(address proxy);
//     bytes32 public   constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

//     struct Collection {
//         string _name;
//         string _symbol;
//         address _contractAddress;
//     }

//     Collection[] internal collections;

//     mapping(address => Collection[]) internal ownedCollections;

//     function __DynamintFactory_initialize(address _beacon) public initializer {
//         __UUPSUpgradeable_init();
//         __AccessControl_init();
//         __DynamintBeaconProxy_initialize(_beacon);
//         _grantRole(DEFAULT_ADMIN_ROLE, tx.origin);
//         _grantRole(UPGRADER_ROLE, tx.origin);
//         beacon = this._getDynamintBeacon();
//     }

//     function createToken(
//         string memory _name,
//         string memory _symbol,
//         uint256 _maxSupply
//     ) external returns (address) {
//         BeaconProxy proxy = new BeaconProxy(
//             address(beacon),
//             getData(_name, _symbol, _maxSupply)
//         );

//         address _contractAddress = address(proxy);
//         ownedCollections[msg.sender].push(
//             Collection(_name, _symbol, _contractAddress)
//         );

//         collections.push(Collection(_name, _symbol, _contractAddress));

//         emit CreateDynaMintProxy(_contractAddress);
//         emit CreateDynaMintUserProxy(_contractAddress);
//         return _contractAddress;
//     }

//     //deploying BeaconProxy contract with create2

//     function _authorizeUpgrade(address newImplementation)
//         internal
//         override
//         onlyRole(UPGRADER_ROLE)
//     {}

//     function allCollections() public view returns (Collection[] memory) {
//         return collections;
//     }

//     function ownerCollections(address owner)
//         public
//         view
//         returns (Collection[] memory)
//     {
//         return ownedCollections[owner];
//     }

//     //adding constructor arguments to BeaconProxy bytecode

//     function getData(
//         string memory _name,
//         string memory _symbol,
//         uint256 _maxSupply
//     ) internal pure returns (bytes memory) {
//         return
//             abi.encodeWithSelector(
//                 Dynamint(address(0)).initialize.selector,
//                 _name,
//                 _symbol,
//                 _maxSupply
//             );
//     }

//     function supportsInterface(bytes4 interfaceId)
//         public
//         view
//         override(AccessControlUpgradeable)
//         returns (bool)
//     {
//         return super.supportsInterface(interfaceId);
//     }
// }
