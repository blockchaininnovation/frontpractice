interface DisplayResultProposalsProps {
  status?: "success" | "failure" | undefined;
  result?: { [key: string]: any } | bigint | undefined;
  error?: any;
}

function RenderObjects(result: { [key: string]: any } | bigint | undefined) {
  if (!result) {
    return <div>Undefined</div>;
  }
  if (typeof result === "bigint") {
    return (
      <div className="ml-5 my-2">
        <strong className="font-mono text-gray-600">Value:</strong>{" "}
        {result.toString()}
      </div>
    );
  }
  return Object.keys(result).map((key) => {
    const value = result[key];
    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="ml-5 my-2">
          <strong className="font-mono text-gray-600">{key}:</strong>
          <div>{RenderObjects(value)}</div>
        </div>
      );
    } else {
      return (
        <div key={key} className="ml-5 my-2">
          <strong className="font-mono text-gray-600">{key}:</strong>{" "}
          {value.toString()}
        </div>
      );
    }
  });
}

function hexToAscii(hex: string): string {
  // 2文字ずつに分割してASCIIコードに変換
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    // 2文字の16進数を10進数に変換し、対応するASCII文字に変換
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

export default function DisplayResultProposals(returnData: DisplayResultProposalsProps) {
  const { status, result, error } = returnData;
  if (status === "failure") {
    return <div className="w-[1100px] break-words">{error.toString()}</div>;
  } else if (status === undefined) {
    return null;
  }

  // console.log("result: %o", result);
  if (Array.isArray(result) && result.length > 0 && result[0].hasOwnProperty('metadataURI')) {
    // console.log("result[0].metadataURI: %o", hexToAscii(result[0].metadataURI));
    const metadataURI = hexToAscii(result[0].metadataURI);
    const currentScore = result[0].currentScore + "";
    return <div>title: {metadataURI}<br />score: {currentScore} </div>;
  } else {
    const strInput = result + "";
    var num = parseInt(strInput);
    // console.log("num: %o", num);

    if (!isNaN(num) && isFinite(num)) {
      num = num - 1;
      return <div>{num.toString()}</div>;
    } else {
      return <div><span style={{ color: 'red' }}>No data found</span></div>;
    }
  }
  // return <div>{RenderObjects(result)}</div>;
}


