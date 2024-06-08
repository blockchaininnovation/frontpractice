//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TextDAOFacade
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const abi = [
  {
    type: "function",
    inputs: [{ name: "_target", internalType: "address", type: "address" }],
    name: "clone",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "uint256", type: "uint256" }],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "uint256", type: "uint256" }],
    name: "fork",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "initialMembers", internalType: "address[]", type: "address[]" },
      {
        name: "pConfig",
        internalType: "struct Schema.ProposalsConfig",
        type: "tuple",
        components: [
          { name: "expiryDuration", internalType: "uint256", type: "uint256" },
          { name: "tallyInterval", internalType: "uint256", type: "uint256" },
          { name: "repsNum", internalType: "uint256", type: "uint256" },
          { name: "quorumScore", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "uint256", type: "uint256" },
      {
        name: "_candidates",
        internalType: "struct Schema.Member[]",
        type: "tuple[]",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "addr", internalType: "address", type: "address" },
          { name: "metadataURI", internalType: "bytes32", type: "bytes32" },
        ],
      },
    ],
    name: "memberJoin",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "uint256", type: "uint256" },
      {
        name: "_config",
        internalType: "struct Schema.ProposalsConfig",
        type: "tuple",
        components: [
          { name: "expiryDuration", internalType: "uint256", type: "uint256" },
          { name: "tallyInterval", internalType: "uint256", type: "uint256" },
          { name: "repsNum", internalType: "uint256", type: "uint256" },
          { name: "quorumScore", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "overrideProposalsConfig",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_p",
        internalType: "struct Types.ProposalArg",
        type: "tuple",
        components: [
          {
            name: "header",
            internalType: "struct Schema.Header",
            type: "tuple",
            components: [
              { name: "id", internalType: "uint256", type: "uint256" },
              {
                name: "currentScore",
                internalType: "uint256",
                type: "uint256",
              },
              { name: "metadataURI", internalType: "bytes32", type: "bytes32" },
              { name: "tagIds", internalType: "uint256[]", type: "uint256[]" },
            ],
          },
          {
            name: "cmd",
            internalType: "struct Schema.Command",
            type: "tuple",
            components: [
              { name: "id", internalType: "uint256", type: "uint256" },
              {
                name: "actions",
                internalType: "struct Schema.Action[]",
                type: "tuple[]",
                components: [
                  { name: "func", internalType: "string", type: "string" },
                  { name: "abiParams", internalType: "bytes", type: "bytes" },
                ],
              },
              {
                name: "currentScore",
                internalType: "uint256",
                type: "uint256",
              },
            ],
          },
          {
            name: "proposalMeta",
            internalType: "struct Schema.ProposalMeta",
            type: "tuple",
            components: [
              {
                name: "currentScore",
                internalType: "uint256",
                type: "uint256",
              },
              {
                name: "headerRank",
                internalType: "uint256[]",
                type: "uint256[]",
              },
              { name: "cmdRank", internalType: "uint256[]", type: "uint256[]" },
              {
                name: "nextHeaderTallyFrom",
                internalType: "uint256",
                type: "uint256",
              },
              {
                name: "nextCmdTallyFrom",
                internalType: "uint256",
                type: "uint256",
              },
              { name: "reps", internalType: "address[]", type: "address[]" },
              { name: "nextRepId", internalType: "uint256", type: "uint256" },
              { name: "createdAt", internalType: "uint256", type: "uint256" },
            ],
          },
        ],
      },
    ],
    name: "propose",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "uint256", type: "uint256" },
      { name: "_text", internalType: "string", type: "string" },
    ],
    name: "saveText",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_config",
        internalType: "struct Schema.ProposalsConfig",
        type: "tuple",
        components: [
          { name: "expiryDuration", internalType: "uint256", type: "uint256" },
          { name: "tallyInterval", internalType: "uint256", type: "uint256" },
          { name: "repsNum", internalType: "uint256", type: "uint256" },
          { name: "quorumScore", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "setProposalsConfig",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "uint256", type: "uint256" }],
    name: "tally",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "uint256", type: "uint256" },
      { name: "_cmdIds", internalType: "uint256[3]", type: "uint256[3]" },
    ],
    name: "voteCmds",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "uint256", type: "uint256" },
      { name: "_headerIds", internalType: "uint256[3]", type: "uint256[3]" },
    ],
    name: "voteHeaders",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
