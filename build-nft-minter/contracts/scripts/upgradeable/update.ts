import { ethers, upgrades } from "hardhat";

async function main() {
  // Deploying
  const DynamintUpgradeable = await ethers.getContractFactory(
    "DynaMintUpgradeable"
  );
  const instance = await upgrades.deployProxy(DynamintUpgradeable, [
    "Dynamint NFT",
    "DNF",
  ]);
  await instance.deployed();
  console.log("DynamintUpgradeable deployed to:", instance.address);
}

main();
