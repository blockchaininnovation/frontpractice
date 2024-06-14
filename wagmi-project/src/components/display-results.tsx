interface DisplayResultProps {
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

export default function DisplayResult(returnData: DisplayResultProps) {
  const { status, result, error } = returnData;
  if (status === "failure") {
    return <div>{error.toString()}</div>;
  } else if (status === undefined) {
    return null;
  }

  return <div>{RenderObjects(result)}</div>;
}
