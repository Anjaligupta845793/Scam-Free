const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWeb3ScamRegistry() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory("Web3ScamRegistry");
    const registry = await Registry.deploy();

    return { registry, owner, otherAccount };
  }

  describe("Adding Profile", function () {
    it("Should add profile and emit event", async function () {
      const { registry, owner } = await loadFixture(deployWeb3ScamRegistry);
      const profileUrl = "https://linkdin";
      const reason = "it's fake ";
      const evidentUrl = "https://jdks";
      await expect(registry.addProfile(profileUrl, reason, evidentUrl))
        .to.emit(registry, "ProfileAdded")
        .withArgs(profileUrl, owner.address, anyValue);

      const profile = await registry.getProfile(profileUrl);
      expect(profile.profileUrl).to.equal(profileUrl);
      expect(profile.isListed).to.equal(true);
      expect(profile.reportCount).to.equal(1);
      expect(profile.firstReporter).to.equal(owner.address);
    });

    it("should revert if profile is already listed", async function () {
      const { registry, owner } = await loadFixture(deployWeb3ScamRegistry);
      const profileUrl = "https://linkdin";
      const reason = "it's fake ";
      const evidentUrl = "https://jdks";
      await registry.addProfile(profileUrl, reason, evidentUrl);
      await expect(
        registry.addProfile(profileUrl, reason, evidentUrl)
      ).to.be.revertedWith("Profile is already listed");
    });
  });
});
