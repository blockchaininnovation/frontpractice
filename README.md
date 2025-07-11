# Frontend Practice

## Contributors

- [株式会社 D-Chain](https://d-chain.co.jp)

## 目次

- [環境構築](#環境構築)

  - [nvm ( Node Version Manager ) のインストール](#nvm-node-version-manager-のインストール)
    - [Mac](#mac)
    - [Windows](#windows)
  - [Node.js のインストール](#nodejs-のインストール)

- [このレポジトリについて](#このレポジトリについて)
  - [仕様](#仕様)
  - [使用パッケージ](#使用パッケージ)
  - [実行手順](#実行手順)
  - [ローカルの TextDAO を使用する場合](#ローカルの-textdao-を使用する場合)

---

# 環境構築

## 1. nvm ( Node Version Manager ) のインストール

- ### Mac

  1. `command` + `space` で Spotlight Search を開き、 `terminal` と入力

  2. 以下のコマンドの **どちらか** を入力し `return`

     ```zsh
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     ```

     ```zsh
     wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     ```

  3. 以下のコマンドを実行し、正常にインストールされているか確認 ( `nvm` と表示されたら OK )

     ```zsh
     command -v nvm
     ```

     - `nvm: command not found` が出る場合、以下のコマンド実行してみてください

       - bash の場合

         ```bash
         source ~/.bash_profile
         ```

       - zsh の場合

         ```zsh
         source ~/.zshrc
         ```

---

- #### 上記通りにやってもうまくいかない場合

  - [ここ](https://github.com/nvm-sh/nvm?tab=readme-ov-file#troubleshooting-on-macos)を参照しトラブルシューティングを行ってください

- ### Windows

  - #### WSL2 ( Windows Subsystem for Linux 2 ) にインストールする場合

    - ディストリビューション `Ubuntu:22.04`

    1. 以下のコマンドを実行し、ディストリビューションを更新する ( 推奨 )

       ```ubuntu
       sudo apt update && sudo apt upgrade
       ```

    2. 以下のコマンドを実行し、cURL をインストール

       ```ubuntu
       sudo apt-get install curl
       ```

    3. 以下のコマンドを実行し、nvm をインストール

       ```ubuntu
       curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
       ```

    4. 以下のコマンドを実行し、正常にインストールされているか確認

       ```ubuntu
       nvm -v
       ```

       - `0.39.7`等，バージョン情報が出てくれば OK です
       - `Command 'nvm' not found ...` が出る場合、現在のターミナルを閉じてから再度開き、もう一度やり直してください
       - もしくは
         ```ubuntu
         source ~/.bashrc
         ```
         と実行したあとに再度「nvm -v」を打ってみてください．

---

- #### 上記通りにやってもうまくいかない場合

  - [ここ](https://github.com/nvm-sh/nvm?tab=readme-ov-file#troubleshooting-on-linux)を参照しトラブルシューティングを行ってください

## 2. Node.js のインストール

- Mac はターミナル、Windows はコマンドプロンプト ( または WSL ) を開いておいてください

1. 以下のコマンドを実行し、`Node.js: v24.4.0` をインストール

   ```cmd
   nvm install stable
   ```

2. 以下のコマンドを実行し、`Node.js: v24.4.0` を使用しているか確認 ( `v24.4.0` と表示されたら OK )

   ```cmd
   node --version
   ```

   - 違うバージョンが表示される場合、以下のコマンドを実行してください

     ```cmd
     nvm use v24.4.0
     ```

- また以下のコマンドを実行し、`npm` があることも確認してください

  ```cmd
  npm --version
  ```

# このレポジトリについて．アプリケーション実行手順など

## 仕様

- 対応ブラウザ： Chrome ( JavaScript を許可してください )
- 対応デバイス： PC
- 対応ウォレット： MetaMask ( Chrome 拡張機能 )

- Indexer 無し
- DB 無し
- Backend あり

- 仕様変更で使わなくなったパッケージ、ファイルも一部残っています


## 実行手順

1. レポジトリをクローンする

     ```cmd
     git clone git@github.com:blockchaininnovation/frontpractice.git
     ```

2. クローンしたディレクトリに移動し、以下のコマンドを実行

   ```cmd
   cd frontend
   ```

   ```cmd
   npm install
   ```

   ```cmd
   cp .env.sample .env.local
   ```

   各自 ↑ で作成した `.env.local` に TextDAO のアドレスを記載してください

   ```cmd
   cd src
   cp wagmi.sample.ts wagmi.ts
   ```

   ↑ で作成した `wagmi.ts` に 接続したいネットワーク情報を記述してください．


   ```cmd
   npm run build
   ```

   ```cmd
   npm run start
   ```

   もしくは，run build, run start の代わりに開発モードとして

   ```cmd
   npm run dev
   ```

3. ブラウザで以下にアクセス

   http://localhost:3000 または http://127.0.0.1:3000

## ローカルの TextDAO を使用する場合
1. ブロックチェーン起動
    1.  localで開発用のブロックチェーンを起動
        TextDAO のディレクトリで以下のコマンドを実行
        ```
        anvil
        ```

2.  コンソールに出力された PrivateKey のどれか一つを TextDAOの`.env` ファイルに記載．
    1. .envファイルがない場合は以下：
      .env.sampleを.envにコピー
      ```
      cp .env.sample .env
      ```
    2. コピー(一例)
      ```
      DEPLOYER_PRIV_KEY=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      ```
3.  TextDAO のディレクトリで以下のコマンドを実行

    ```
    forge script script/Deployment.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
    ```

4.  `wagmi-project` の `src/wagmi.ts` の `config` を以下のように変更:
    1. localでそのままanvilで起動したチェーンに接続する場合：
      ```typescript
      export const config = createConfig({
        chains: [anvil],
        connectors: [],
        ssr: true,
        transports: {
          [anvil.id]: http("http://localhost:8545"),
        },
      });
      ```

    2. (補足) sepoliaに接続する場合：
      ```typescript
      export const config = createConfig({
        chains: [sepolia],
        connectors: [],
        ssr: true,
        transports: {
          [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),
        },
      });
      ```

5.  `wagmi-project` の `src/wagmi.ts` の `textDAOFacade` を以下のように変更

    ```typescript
    export const TextDAOFacade = {
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDR! as Address,
      abi,
      // account,
    } as const;
    ```
    3つ目の引数「account」は，開発用にいちいちMetamaskが起動するのが鬱陶しい場合は，秘密鍵をsrc/lib/accout.ts に記述することで毎回のMetamask起動を回避できる．
    コメントアウトすると毎回Metamaskを起動する．

