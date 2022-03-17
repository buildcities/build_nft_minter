// /* eslint-disable no-undef */
// import { expect } from "chai";
// import { Contract } from "ethers";
// import { ethers, upgrades } from "hardhat";
// import { type } from "os";
// import {
//   DynaMintFactoryUpgradeable__factory as DyFacFac,
//   Dynamint__factory as DyFac,
// } from "../typechain";

// describe("Dynamint test", function () {
//   let dynaMintNft: Contract;
//   let dynaMintNftFactory: Contract;
//   let deployer: any;
//   let account1: any;
//   let DynaMintNFT: DyFac;
//   let DynaMintNFTFactory: DyFacFac;

//   before(async function () {
//     [deployer, account1] = await ethers.getSigners();
//     DynaMintNFT = await ethers.getContractFactory("Dynamint");
//     DynaMintNFTFactory = await ethers.getContractFactory(
//       "DynaMintFactoryUpgradeable"
//     );
//   });
//   beforeEach(async function () {
//     dynaMintNft = await DynaMintNFT.deploy();
//     await dynaMintNft.deployed();
//     dynaMintNftFactory = await upgrades.deployProxy(
//       DynaMintNFTFactory,
//       [dynaMintNft.address],
//       {
//         kind: "uups",
//         initializer: "__DynamintFactory_initialize",
//         deployer,
//       } as { kind: any; initializer: any; deployer: any }
//     );
//     await dynaMintNftFactory.deployed();
//   });

//   describe("Create a proxy contract", function () {
//     it("should create a proxy contract ", async function () {
//       await dynaMintNftFactory.createToken("CoinFx", "CFX", 0);
//       const collections = await dynaMintNftFactory.allCollections();
//       console.log(collections);
//       const contract = await ethers.getContractAt(
//         "Dynamint",
//         collections[0][2]
//       );
//       await contract.safeMint(deployer.address, "ipfs://fake-url", []);
//       const ownerNfts = await contract.balanceOf(deployer.address);
//       const tokeURI = await contract.tokenURI(1);
//       expect(ownerNfts).to.equal(1);
//       expect(tokeURI).to.equal("ipfs://fake-url");
//     });
//   });
// });
