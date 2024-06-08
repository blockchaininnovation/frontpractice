import Link from "next/link";

import paths from "@/lib/paths";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-around items-center min-h-screen">
      <div>
        <h1 className="text-xl font-semibold">Participants</h1>
        <nav className="grid gap-4 text-sm text-muted-foreground mt-6">
          <Link href={paths.memberJoin()}>Member Join</Link>
          <Link href={paths.vote()}>Vote</Link>
        </nav>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Lecturer</h1>
        <nav
          className="grid gap-4 text-sm text-muted-foreground mt-6"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href={paths.initialize()}>Initialize</Link>
          <Link href={paths.propose()}>Propose</Link>
          <Link href={paths.tally()}>Tally</Link>
        </nav>
      </div>
    </div>
  );
}
