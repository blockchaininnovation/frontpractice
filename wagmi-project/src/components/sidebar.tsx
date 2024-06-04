import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="px-12 flex flex-col justify-around border-r h-screen">
      <div>
        <h1 className="text-3xl font-semibold">Participants</h1>
        <nav
          className="grid gap-4 text-sm text-muted-foreground mt-6"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#" className="hover:bg-gray-100 duration-200">
            General
          </Link>
          <Link href="#" className="hover:bg-gray-100 duration-200">
            Security
          </Link>
          <Link href="#" className="hover:bg-gray-100 duration-200">
            Integrations
          </Link>
          <Link href="#" className="hover:bg-gray-100 duration-200">
            Support
          </Link>
          <Link href="#" className="hover:bg-gray-100 duration-200">
            Organizations
          </Link>
          <Link href="#" className="hover:bg-gray-100 duration-200">
            Advanced
          </Link>
        </nav>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">Lecturer</h1>
        <nav
          className="grid gap-4 text-sm text-muted-foreground mt-6"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#">General</Link>
          <Link href="#">Security</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
      </div>
    </div>
  );
}
