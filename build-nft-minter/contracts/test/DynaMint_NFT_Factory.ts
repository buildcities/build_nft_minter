// /* eslint-disable no-undef */
// import { expect } from "chai";
// import { Contract } from "ethers";
// import { ethers } from "hardhat";

// describe("DynaMintNFTFactoryFactory721 Test", function () {
//   let dynaMintNftFactory: Contract;

//   // before(async function (): Promise<void> {

//   // });

//   describe("Create new collection contract", function () {
//     it("creates a new collection contract with name and symbol", async function () {
//       const [, account1] = await ethers.getSigners();
//       const DynaMintNFTFactory = await ethers.getContractFactory(
//         "DynaMintNFTFactory"
//       );

//       dynaMintNftFactory = await DynaMintNFTFactory.deploy();
//       await dynaMintNftFactory.deployed();

//       await dynaMintNftFactory
//         .connect(account1)
//         .createCollection("TestTokenOne", "TTO", 0);

//       const ownerCollection = await dynaMintNftFactory
//         .connect(account1)
//         .ownerCollections(account1.address);
//       expect(ownerCollection.length).to.equal(1);
//       expect(ownerCollection[0].name).to.equal("TestTokenOne");
//       expect(ownerCollection[0].symbol).to.equal("TTO");
//       expect(ownerCollection[0].owner).to.equal(account1.address);
//     });
//   });
// });
