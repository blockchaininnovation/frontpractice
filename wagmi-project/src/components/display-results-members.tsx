interface DisplayResultMembersProps {
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

export default function DisplayResultMembers(returnData: DisplayResultMembersProps) {
  const { status, result, error } = returnData;
  if (status === "failure") {
    return <div className="w-[1100px] break-words">{error.toString()}</div>;
  } else if (status === undefined) {
    return null;
  }

  if (result !== undefined) {
    console.log("result: %o", result);

    if (result.hasOwnProperty('addr')) {
      console.log("result.id: %o", result.id);
      console.log("result.addr: %o", result.addr);
      return <div>ID: {result.id + ""}<br />address: {result.addr}</div>;
    }
  } else {
    return <div><span style={{ color: 'red' }}>No data found</span></div>;
  }


  // return <div>{RenderObjects(result)}</div>;

  return <div>{RenderObjects(result)}</div>;
}
