export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "profileUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ProfileAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "profileUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ReportAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_profileUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_discription",
        type: "string",
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
      {
        internalType: "string",
        name: "_evidenceUrl",
        type: "string",
      },
    ],
    name: "addProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_profileUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
      {
        internalType: "string",
        name: "_evidenceUrl",
        type: "string",
      },
    ],
    name: "addReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allProfileHashes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProfiles",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "profileUrl",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "discription",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "reportCount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "firstReporter",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "firstReportTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Web3ScamRegistry.Profile[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_profileUrl",
        type: "string",
      },
    ],
    name: "getProfile",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "profileUrl",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "discription",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "reportCount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "firstReporter",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "firstReportTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Web3ScamRegistry.Profile",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_profileUrl",
        type: "string",
      },
    ],
    name: "getReports",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "evidenceUri",
            type: "string",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "reporter",
            type: "address",
          },
        ],
        internalType: "struct Web3ScamRegistry.Report[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
