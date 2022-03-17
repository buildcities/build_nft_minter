// /* eslint-disable no-undef */
// import { expect } from "chai";
// import { Contract } from "ethers";
// import { ethers } from "hardhat";

// describe("DynaMintNFT721 Test", function () {
//   let dynaMintNft: Contract;

//   // before(async function (): Promise<void> {

//   // });

//   describe("Mint token and set royalty", function () {
//     it("mint two tokens and set two different royalties", async function () {
//       const [deployer, account1] = await ethers.getSigners();
//       const DynaMintNFT = await ethers.getContractFactory("DynaMintNFT");
//       dynaMintNft = await DynaMintNFT.connect(account1).deploy(
//         "TestToken",
//         "TT",
//         0
//       );
//       await dynaMintNft.deployed();
//       const royalty10Percent = 1000;
//       const royalty20Percent = 2000;
//       await dynaMintNft.connect(account1).mint("ipfs://dummy-ipfs", 2);
//       await dynaMintNft
//         .connect(account1)
//         .setRoyalties(0, account1.address, royalty10Percent);
//       await dynaMintNft
//         .connect(account1)
//         .setRoyalties(1, account1.address, royalty20Percent);
//       const token0Royalty = await dynaMintNft.getRaribleV2Royalties(0);
//       const token1Royalty = await dynaMintNft.getRaribleV2Royalties(1);
//       expect(token0Royalty[0][1]).to.equal(royalty10Percent);
//       expect(token1Royalty[0][1]).to.equal(royalty20Percent);
//     });
//   });
//   describe("Creates collection correctly", function () {
//     it("returns proper collection name and symbol", async function () {
//       const [_, account1] = await ethers.getSigners();
//       const dynaMintNFT = await ethers.getContractFactory("DynaMintNFT");
//       dynaMintNft = await dynaMintNFT.deploy("TestToken", "TT", 0);
//       await dynaMintNft.deployed();

//       const collectionName = await dynaMintNft.connect(account1).name();
//       const symbol = await dynaMintNft.connect(account1).symbol();
//       expect(collectionName).to.equal("TestToken");
//       expect(symbol).to.equal("TT");
//     });
//   });
// });
