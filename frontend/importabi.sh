#!/bin/bash
# Usage: ./importabi.sh TextDAOFacade

# エラーハンドリング
set -e

# 1. 引数の処理
CONTRACT_NAME=${1:-TextDAOFacade}
OUTPUT_DIR="src/lib/abi"
OUTPUT_FILE="${OUTPUT_DIR}/${CONTRACT_NAME}.ts"

# 2. JSONファイルの絶対パスを取得
JSON_PATH=$(realpath "../../TextDAO/out/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json")

# 3. 出力ディレクトリがなければ作成
mkdir -p "$OUTPUT_DIR"

# 4. ABI部分だけを抽出し、型安全なTypeScriptに変換して出力
echo "////////////////////////////////////////////////////////////////////////////////////////////////////////" > "$OUTPUT_FILE"
echo "// ${CONTRACT_NAME} ABI" >> "$OUTPUT_FILE"
echo "////////////////////////////////////////////////////////////////////////////////////////////////////////" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "export const abi = " >> "$OUTPUT_FILE"
jq '.abi' "$JSON_PATH" | head -n -1 >> "$OUTPUT_FILE"
echo "] as const;" >> "$OUTPUT_FILE"

# 5. 完了メッセージ
echo "✅ ABI exported to ${OUTPUT_FILE}"
