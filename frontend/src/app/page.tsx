function App() {
  return (
    <div className="px-20 py-5">
      <h1 className="text-xl font-bold py-10">Top</h1>
      <article>
        <h3 className="text-lg">使い方</h3>
        <br />
        <ol className="list-decimal ml-5">
          <li>
            右上の MetaMask ボタンを押してウォレットをコネクトする（チェーンを
            Sepolia にしてください）
          </li>
          <li>Initialize から初期設定を済ませる（講師が済ませています）</li>
          <li>Propose から提案を作成する（講師が行います）</li>
          <li>Proposalから作成したProposeが取得できるか確認する</li>
          <li>MemberJoin から自分のアカウントを登録する</li>
          <li>Membersから登録した自分のアカウントが取得できるか確認する（実装演習）</li>
          <li>Vote から提案に投票を行う（実装演習）</li>
        </ol>
      </article>
    </div>
  );
}

export default App;
