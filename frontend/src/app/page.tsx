function App() {
  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Top</h1>
      <article>
        <h3 className="text-lg">使い方</h3>
        <br />
        <ol className="list-decimal ml-5">
          <li>
            右上の MetaMask ボタンを押してウォレットをコネクトする（チェーンをanvilにしてください）
          </li>
          <li>Initialize から初期設定を済ませる</li>
          <li>Propose から提案を作成する</li>
          <li>Proposalから作成したProposeが取得できるか確認する</li>
          <li>MemberJoin から自分のアカウントを登録する</li>
          <li>Membersから登録した自分のアカウントが取得できるか確認する</li>
          <li>Vote から提案に投票を行う</li>
          <li>Proposalで投票ができているか確認する</li>
          <li>Onboard Imageで自身のアイコンを登録する</li>
          <li>Membersから、登録したアイコンのIPFS、署名情報を確認する。</li>
        </ol>
      </article>
    </div>
  );
}

export default App;
