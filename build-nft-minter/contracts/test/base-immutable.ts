/* eslint-disable no-undef */
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { Dynamint__factory as DyFac } from "../typechain";

describe("Dynamint test", function () {
  let dynaMintNft: Contract;
  let deployer: any;
  let account1: any;
  let DynaMintNFT: DyFac;

  before(async function () {
    [deployer, account1] = await ethers.getSigners();
    DynaMintNFT = await ethers.getContractFactory("Dynamint");
  });
  beforeEach(async function () {
    dynaMintNft = await upgrades.deployProxy(DynaMintNFT, [
      "Dynacoin",
      "DNC",
      100,
    ]);
    await dynaMintNft.deployed();
  });

  describe("Mint tokens", function () {
    it("should mint a token and sets tokenURI", async function () {
      // await dynaMintNft.initialize("Dynacoin", "DNC", 0);
      await dynaMintNft.safeMint(deployer.address, "ipfs://fake-url", []);
      const ownerNfts = await dynaMintNft.balanceOf(deployer.address);
      const tokeURI = await dynaMintNft.tokenURI(1);
      expect(ownerNfts).to.equal(1);
      expect(tokeURI).to.equal("ipfs://fake-url");
    });

    it("should mint 2 tokens and sets royalties for users", async function () {
      // await dynaMintNft.initialize("Dynacoin", "DNC", 0);
      await dynaMintNft.mintBatch({
        tokenURI: "ipfs://fake-url",
        mintAmount: 2,
        royalties: [
          [{ value: 1000, account: account1.address }],
          [{ value: 2000, account: deployer.address }],
        ],
      });
      const ownerNfts = await dynaMintNft.balanceOf(deployer.address);
      const token0Royalty = await dynaMintNft.getRaribleV2Royalties(1);
      const token1Royalty = await dynaMintNft.getRaribleV2Royalties(2);
      expect(ownerNfts).to.equal(2);
      expect(token0Royalty[0][1]).to.equal(1000);
      expect(token1Royalty[0][1]).to.equal(2000);
    });
  });
});
