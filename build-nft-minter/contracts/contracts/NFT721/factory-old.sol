// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;
// //pragma abicoder v2;

// import "./base.sol";
// import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

// /**
//  * @dev This contract is for creating proxy to access ERC721Rarible token.
//  *
//  * The beacon should be initialized before call ERC721RaribleFactoryC2 constructor.
//  *
//  */

// contract DynaMintFactory {
//     address public beacon;

//     bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
//     bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

//     event CreateDynaMintProxy(address proxy);
//     event CreateDynaMintUserProxy(address proxy);

//     struct Collection {
//         string _name;
//         string _symbol;
//         address _contractAddress;
//     }

//     Collection[] internal collections;

//     mapping(address => Collection[]) internal ownedCollections;

//     constructor(address _beacon) {
//         beacon = _beacon;
//     }

//     function createToken(
//         string memory _name,
//         string memory _symbol,
//         uint256 _maxSupply,
//         uint256 salt
//     ) external {
//         address beaconProxy = deployProxy(
//             getData(_name, _symbol, _maxSupply),
//             salt
//         );

//         Dynamint token = Dynamint(address(beaconProxy));
//         // token.grantRole(MINTER_ROLE, msg.sender);
//         // token.grantRole(PAUSER_ROLE, msg.sender);
//         address _contractAddress = _getAddress(
//             _name,
//             _symbol,
//             _maxSupply,
//             salt
//         );

//         ownedCollections[msg.sender].push(
//             Collection(_name, _symbol, _contractAddress)
//         );

//         collections.push(Collection(_name, _symbol, _contractAddress));

//         emit CreateDynaMintProxy(beaconProxy);
//         emit CreateDynaMintUserProxy(beaconProxy);
//     }

//     //deploying BeaconProxy contract with create2
//     function deployProxy(bytes memory data, uint256 salt)
//         internal
//         returns (address proxy)
//     {
//         bytes memory bytecode = getCreationBytecode(data);
//         assembly {
//             proxy := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
//             if iszero(extcodesize(proxy)) {
//                 revert(0, 0)
//             }
//         }
//     }

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
//     function getCreationBytecode(bytes memory _data)
//         internal
//         view
//         returns (bytes memory)
//     {
//         return
//             abi.encodePacked(
//                 type(BeaconProxy).creationCode,
//                 abi.encode(beacon, _data)
//             );
//     }

//     function getAddress(
//         string memory _name,
//         string memory _symbol,
//         uint256 _maxSupply,
//         uint256 _salt
//     ) public view returns (address) {
//         return _getAddress(_name, _symbol, _maxSupply, _salt);
//     }

//     //returns address that contract with such arguments will be deployed on
//     function _getAddress(
//         string memory _name,
//         string memory _symbol,
//         uint256 _maxSupply,
//         uint256 _salt
//     ) internal view returns (address) {
//         bytes memory bytecode = getCreationBytecode(
//             getData(_name, _symbol, _maxSupply)
//         );

//         bytes32 hash = keccak256(
//             abi.encodePacked(
//                 bytes1(0xff),
//                 address(this),
//                 _salt,
//                 keccak256(bytecode)
//             )
//         );

//         return address(uint160(uint256(hash)));
//     }

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
// }
