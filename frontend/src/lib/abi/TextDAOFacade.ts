////////////////////////////////////////////////////////////////////////////////////////////////////////
// TextDAOFacade ABI
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const abi = 
[
  {
    "type": "function",
    "name": "clone",
    "inputs": [
      {
        "name": "_target",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "_proposalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "fork",
    "inputs": [
      {
        "name": "pid",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_p",
        "type": "tuple",
        "internalType": "struct Types.ProposalArg",
        "components": [
          {
            "name": "header",
            "type": "tuple",
            "internalType": "struct Schema.Header",
            "components": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "metadataURI",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "tagIds",
                "type": "uint256[]",
                "internalType": "uint256[]"
              }
            ]
          },
          {
            "name": "cmd",
            "type": "tuple",
            "internalType": "struct Schema.Command",
            "components": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "actions",
                "type": "tuple[]",
                "internalType": "struct Schema.Action[]",
                "components": [
                  {
                    "name": "func",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "abiParams",
                    "type": "bytes",
                    "internalType": "bytes"
                  }
                ]
              },
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "proposalMeta",
            "type": "tuple",
            "internalType": "struct Schema.ProposalMeta",
            "components": [
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "headerRank",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "cmdRank",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "nextHeaderTallyFrom",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "nextCmdTallyFrom",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "reps",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "nextRepId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "createdAt",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getConfigOverride",
    "inputs": [
      {
        "name": "sig",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.ConfigOverride",
        "components": [
          {
            "name": "quorumScore",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMember",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.Member",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "addr",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "iconURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "iconVerifiedSignature",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getNextMemberId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getNextProposalId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getNextTextId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getNextVRFId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProposal",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Getter.ProposalInfo",
        "components": [
          {
            "name": "proposalMeta",
            "type": "tuple",
            "internalType": "struct Schema.ProposalMeta",
            "components": [
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "headerRank",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "cmdRank",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "nextHeaderTallyFrom",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "nextCmdTallyFrom",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "reps",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "nextRepId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "createdAt",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "headersLength",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "cmdsLength",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProposalCommand",
    "inputs": [
      {
        "name": "pid",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "cid",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.Command",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "actions",
            "type": "tuple[]",
            "internalType": "struct Schema.Action[]",
            "components": [
              {
                "name": "func",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "abiParams",
                "type": "bytes",
                "internalType": "bytes"
              }
            ]
          },
          {
            "name": "currentScore",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProposalHeaders",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct Schema.Header[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentScore",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "metadataURI",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "tagIds",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProposalsConfig",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.ProposalsConfig",
        "components": [
          {
            "name": "expiryDuration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "tallyInterval",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "repsNum",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quorumScore",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSubscriptionId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getText",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.Text",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "metadataURIs",
            "type": "bytes32[]",
            "internalType": "bytes32[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getVRFConfig",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.VRFConfig",
        "components": [
          {
            "name": "vrfCoordinator",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "keyHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "callbackGasLimit",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "requestConfirmations",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "numWords",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "LINKTOKEN",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getVRFRequest",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Schema.Request",
        "components": [
          {
            "name": "requestId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "proposalId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "initialMembers",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "pConfig",
        "type": "tuple",
        "internalType": "struct Schema.ProposalsConfig",
        "components": [
          {
            "name": "expiryDuration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "tallyInterval",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "repsNum",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quorumScore",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "memberJoin",
    "inputs": [
      {
        "name": "_candidates",
        "type": "tuple[]",
        "internalType": "struct Schema.Member[]",
        "components": [
          {
            "name": "id",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "addr",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "iconURI",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "iconVerifiedSignature",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "onboardImage",
    "inputs": [
      {
        "name": "ipfsUrl",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "overrideProposalsConfig",
    "inputs": [
      {
        "name": "_proposalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_config",
        "type": "tuple",
        "internalType": "struct Schema.ProposalsConfig",
        "components": [
          {
            "name": "expiryDuration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "tallyInterval",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "repsNum",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quorumScore",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "propose",
    "inputs": [
      {
        "name": "_p",
        "type": "tuple",
        "internalType": "struct Types.ProposalArg",
        "components": [
          {
            "name": "header",
            "type": "tuple",
            "internalType": "struct Schema.Header",
            "components": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "metadataURI",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "tagIds",
                "type": "uint256[]",
                "internalType": "uint256[]"
              }
            ]
          },
          {
            "name": "cmd",
            "type": "tuple",
            "internalType": "struct Schema.Command",
            "components": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "actions",
                "type": "tuple[]",
                "internalType": "struct Schema.Action[]",
                "components": [
                  {
                    "name": "func",
                    "type": "string",
                    "internalType": "string"
                  },
                  {
                    "name": "abiParams",
                    "type": "bytes",
                    "internalType": "bytes"
                  }
                ]
              },
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          },
          {
            "name": "proposalMeta",
            "type": "tuple",
            "internalType": "struct Schema.ProposalMeta",
            "components": [
              {
                "name": "currentScore",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "headerRank",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "cmdRank",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "nextHeaderTallyFrom",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "nextCmdTallyFrom",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "reps",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "nextRepId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "createdAt",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "saveText",
    "inputs": [
      {
        "name": "_proposalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_text",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setProposalsConfig",
    "inputs": [
      {
        "name": "_config",
        "type": "tuple",
        "internalType": "struct Schema.ProposalsConfig",
        "components": [
          {
            "name": "expiryDuration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "tallyInterval",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "repsNum",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quorumScore",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "tally",
    "inputs": [
      {
        "name": "_proposalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "voteCmds",
    "inputs": [
      {
        "name": "_proposalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_cmdIds",
        "type": "uint256[3]",
        "internalType": "uint256[3]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "voteHeaders",
    "inputs": [
      {
        "name": "_proposalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_headerIds",
        "type": "uint256[3]",
        "internalType": "uint256[3]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const;
