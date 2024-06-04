import Image from "next/image";
import Link from "next/link";

import { useAccount, useConnect, useDisconnect } from "wagmi";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useToast } from "./ui/use-toast";

import gitIcon from "public/githubIcon.png";

export default function Navbar() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <nav>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src={gitIcon} alt="Logo" width={40} height={40} priority />
            <span>Tokyo University</span>
          </Link>
        </nav>
        <div>
          {account.status !== "connected" && (
            <div className="flex gap-4">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  onClick={() =>
                    connect(
                      { connector },
                      {
                        onError: (error) => {
                          toast({
                            variant: "destructive",
                            title: error.name,
                            description: error.message,
                          });
                        },
                      }
                    )
                  }
                >
                  {connector.name}
                </Button>
              ))}
            </div>
          )}
          {account.status === "connected" && (
            <div className="flex items-center gap-8">
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="rounded-md border p-2 text-sm font-medium">
                      {account.address}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="border rounded-md p-2 mt-1 bg-white">
                        Current Address
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="rounded-md border p-2 text-sm font-medium">
                      {account.chainId}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="border rounded-md p-2 mt-1 bg-white">
                        Current Chain
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Button onClick={() => disconnect()}>Disconnect</Button>
            </div>
          )}
        </div>
      </header>
      {account.status === "connected" && account.chainId !== 11155111 && (
        <Alert variant="destructive" className="w-80 ml-auto mt-10">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Chain Not Supported</AlertTitle>
          <AlertDescription>
            Current Chain is not supported. <br />
            Make sure to use Sepolia.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
