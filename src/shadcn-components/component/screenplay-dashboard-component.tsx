import React from 'react';
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "~/shadcn-components/ui/sheet";
import { Button } from "~/shadcn-components/ui/button";
import { Input } from "~/shadcn-components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "~/shadcn-components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "~/shadcn-components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/shadcn-components/ui/table";

export function ScreenplayDashboardComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link href="#" className="text-foreground transition-colors hover:text-foreground" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Screenplays
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Products
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Customers
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" {...({ children: (
            <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                  <Package2Icon className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground" prefetch={false}>
                  Dashboard
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  Projects
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  Products
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  Customers
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  Analytics
                </Link>
                </nav>
           ) } as any)}>
        </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popularity</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users In Queue</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Projects</CardTitle>
                <CardDescription>Recent projects from your team.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#" prefetch={false}>
                  View All
                  <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="space-y-1">
                        <div className="font-medium">Project Name</div>
                        <div className="text-sm text-muted-foreground">Creator Username</div>
                      </div>
                    </TableHead>
                    <TableHead className="hidden xl:table-column">Last Edited</TableHead>
                    <TableHead className="hidden xl:table-column">Last Edited</TableHead>
                    <TableHead className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">A Rope of Sand</div>
                        <div className="text-sm text-muted-foreground">@ObliviousObserver</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-23</TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-23</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">Olivia Smith</div>
                        <div className="text-sm text-muted-foreground">olivia@example.com</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-24</TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-24</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">Noah Williams</div>
                        <div className="text-sm text-muted-foreground">noah@example.com</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-25</TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-25</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">Emma Brown</div>
                        <div className="text-sm text-muted-foreground">emma@example.com</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-26</TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-26</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">Liam Johnson</div>
                        <div className="text-sm text-muted-foreground">liam@example.com</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-27</TableCell>
                    <TableCell className="hidden xl:table-column">2023-06-27</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="font-medium">@FicklessSlug</div>
                <div className="flex items-center gap-2 ml-auto">
                  <ThumbsUpIcon className="w-5 h-5 text-green-500" />
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-medium">@JacksonLee</div>
                <div className="flex items-center gap-2 ml-auto">
                  <ThumbsDownIcon className="w-5 h-5 text-red-500" />
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-medium">@IsabellaNguyen</div>
                <div className="flex items-center gap-2 ml-auto">
                  <ThumbsUpIcon className="w-5 h-5 text-green-500" />
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-medium">@WilliamKim</div>
                <div className="flex items-center gap-2 ml-auto">
                  <ThumbsDownIcon className="w-5 h-5 text-red-500" />
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}

function ArrowUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function CircleUserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ThumbsDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  )
}

function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
