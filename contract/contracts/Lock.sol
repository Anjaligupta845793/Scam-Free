// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lock {
    // ==============================
    //  STRUCTS
    // ==============================
    struct Profile {
        string profileUrl;
        bool isListed;
        uint256 reportCount;
        address firstReporter;
        uint256 firstReportTimestamp;
    }

    struct Report {
        string evidenceUri;
        string reason;
        uint256 timestamp;
        address reporter;
    }

    // ==============================
    //  EVENTS
    // ==============================
    event ProfileAdded(string profileUrl, address reporter, uint256 timestamp);
    event ReportAdded(string profileUrl, address reporter, uint256 timestamp);

    // ==============================
    //  STATE VARIABLES
    // ==============================
    mapping(bytes32 => Profile) private profiles;
    mapping(bytes32 => Report[]) private reports;
    bytes32[] private allProfileHashes;

    // ==============================
    //  MODIFIERS
    // ==============================
    modifier profileNotListed(string memory _profileUrl) {
        bytes32 profileHash = keccak256(abi.encodePacked(_profileUrl));
        require(!profiles[profileHash].isListed, "Profile is already listed");
        _;
    }

    // ==============================
    //  FUNCTIONS
    // ==============================

    /**
     * @dev Adds a new scammer profile and automatically adds the first report.
     * @param _profileUrl LinkedIn profile URL of the scammer.
     * @param _reason The reason for reporting.
     * @param _evidenceUrl Link to evidence (e.g., IPFS or pinata ).
     */
    function addProfile(
        string memory _profileUrl,
        string memory _reason,
        string memory _evidenceUrl
    ) public profileNotListed(_profileUrl) {
        bytes32 profileHash = keccak256(abi.encodePacked(_profileUrl));
        allProfileHashes.push(profileHash);

        profiles[profileHash] = Profile({
            profileUrl: _profileUrl,
            isListed: true,
            reportCount: 1,
            firstReporter: msg.sender,
            firstReportTimestamp: block.timestamp
        });

        emit ProfileAdded(_profileUrl, msg.sender, block.timestamp);

        // Add the first report
        addReport(_profileUrl, _reason, _evidenceUrl);
    }

    /**
     * @dev Adds a report to an existing scammer profile.
     * @param _profileUrl LinkedIn profile URL of the scammer.
     * @param _reason The reason for reporting.
     * @param _evidenceUrl Link to evidence (e.g., IPFS or pinata).
     */
    function addReport(
        string memory _profileUrl,
        string memory _reason,
        string memory _evidenceUrl
    ) public {
        bytes32 profileHash = keccak256(abi.encodePacked(_profileUrl));

        require(profiles[profileHash].isListed, "Profile is not listed");

        // Update profile report count
        profiles[profileHash].reportCount++;

        // Add the report
        reports[profileHash].push(Report({
            evidenceUri: _evidenceUrl,
            reason: _reason,
            timestamp: block.timestamp,
            reporter: msg.sender
        }));

        emit ReportAdded(_profileUrl, msg.sender, block.timestamp);
    }

    // ==============================
    //  GETTERS
    // ==============================

    /**
     * @dev Fetches details of a specific profile.
     * @param _profileUrl LinkedIn profile URL.
     * @return Profile details.
     */
    function getProfile(string memory _profileUrl) public view returns (Profile memory) {
        return profiles[keccak256(abi.encodePacked(_profileUrl))];
    }

    /**
     * @dev Fetches all scammer profiles.
     * @return Array of all reported profiles.
     */
    function getAllProfiles() public view returns (Profile[] memory) {
        uint256 length = allProfileHashes.length;
        Profile[] memory allProfiles = new Profile[](length);

        for (uint256 i = 0; i < length; i++) {
            allProfiles[i] = profiles[allProfileHashes[i]];
        }

        return allProfiles;
    }

    /**
     * @dev Fetches all reports associated with a profile.
     * @param _profileUrl LinkedIn profile URL.
     * @return Array of reports related to the profile.
     */
    function getReports(string memory _profileUrl) public view returns (Report[] memory) {
        return reports[keccak256(abi.encodePacked(_profileUrl))];
    }
}
