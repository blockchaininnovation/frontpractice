#!/bin/bash
# Usage: ./importabi.sh TextDAOFacade

CONTRACT_NAME=$1
JSON_PATH=$(realpath "../../TextDAO/out/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json")

# echo "Building types for $CONTRACT_NAME ..."
# npx typechain --target ethers-v5 --out-dir src/lib/abi "$JSON_PATH"

cp $JSON_PATH src/lib/abi