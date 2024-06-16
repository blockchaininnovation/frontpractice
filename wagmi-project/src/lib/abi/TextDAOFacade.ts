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
    inputs: [
      { name: "_proposalId", internalType: "uint256", type: "uint256" },
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
    name: "fork",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "sig", internalType: "bytes4", type: "bytes4" }],
    name: "getConfigOverride",
    outputs: [
      {
        name: "",
        internalType: "struct Schema.ConfigOverride",
        type: "tuple",
        components: [
          { name: "quorumScore", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getMember",
    outputs: [
      {
        name: "",
        internalType: "struct Schema.Member",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "addr", internalType: "address", type: "address" },
          { name: "metadataURI", internalType: "bytes32", type: "bytes32" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getNextMemberId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getNextProposalId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getNextTextId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getNextVRFId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getProposal",
    outputs: [
      {
        name: "",
        internalType: "struct Getter.ProposalInfo",
        type: "tuple",
        components: [
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
          { name: "headersLength", internalType: "uint256", type: "uint256" },
          { name: "cmdsLength", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "pid", internalType: "uint256", type: "uint256" },
      { name: "cid", internalType: "uint256", type: "uint256" },
    ],
    name: "getProposalCommand",
    outputs: [
      {
        name: "",
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
          { name: "currentScore", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getProposalHeaders",
    outputs: [
      {
        name: "",
        internalType: "struct Schema.Header[]",
        type: "tuple[]",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "currentScore", internalType: "uint256", type: "uint256" },
          { name: "metadataURI", internalType: "bytes32", type: "bytes32" },
          { name: "tagIds", internalType: "uint256[]", type: "uint256[]" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getProposalsConfig",
    outputs: [
      {
        name: "",
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
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getSubscriptionId",
    outputs: [{ name: "", internalType: "uint64", type: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getText",
    outputs: [
      {
        name: "",
        internalType: "struct Schema.Text",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          {
            name: "metadataURIs",
            internalType: "bytes32[]",
            type: "bytes32[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getVRFConfig",
    outputs: [
      {
        name: "",
        internalType: "struct Schema.VRFConfig",
        type: "tuple",
        components: [
          { name: "vrfCoordinator", internalType: "address", type: "address" },
          { name: "keyHash", internalType: "bytes32", type: "bytes32" },
          { name: "callbackGasLimit", internalType: "uint32", type: "uint32" },
          {
            name: "requestConfirmations",
            internalType: "uint16",
            type: "uint16",
          },
          { name: "numWords", internalType: "uint32", type: "uint32" },
          { name: "LINKTOKEN", internalType: "address", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getVRFRequest",
    outputs: [
      {
        name: "",
        internalType: "struct Schema.Request",
        type: "tuple",
        components: [
          { name: "requestId", internalType: "uint256", type: "uint256" },
          { name: "proposalId", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
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
