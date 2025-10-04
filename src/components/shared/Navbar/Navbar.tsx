'use client'
import { ModeToggle } from "@/components/ModeToggler"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"


const navigationLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/projects", label: "Projects", role: "PUBLIC" },
    { href: "/blogs", label: "Blogs", role: "PUBLIC" },
    { href: "/dashboard/profile", label: "Dashboard", role: "PUBLIC" },
]

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="border-b bg-background sticky top-0 z-50 px-4 md:px-6">
            <div className="flex h-16 md:px-4 lg:px-8 max-w-screen-xl mx-auto items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex flex-1 items-center gap-2">

                    {/* Logo */}
                    <Link href="/" className="text-primary flex items-center hover:text-primary/90">
                        {/* <img className="w-2/5" src={brandlogo} alt="" /> */}
                    </Link>
                    <div className="flex items-center gap-6">

                    </div>
                </div>


                {/* Right side */}
                <div className="flex items-center gap-2">

                    {/* Desktop navigation - icon only */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="flex items-start gap-0 md:gap-2">
                            {navigationLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <NavigationMenuItem key={link.href} className="w-full">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-2 py-1.5 px-2 rounded transition",
                                                    isActive
                                                        ? "font-semibold bg-muted-foreground/30 px-3"
                                                        : "px-3"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>



                    {/* Mobile menu trigger */}
                    <Popover>
                        {/* {
                            data?.data?.email ? (
                                <>
                                    <UserMenu data={data} handleLogout={handleLogout} />
                                </>
                            ) : ( */}
                        <>
                            <span className="hidden md:flex">
                                <ModeToggle />
                            </span>
                            {/* <Button asChild
                                        className="text-sm">
                                        <Link href={"/login"}>Login</Link>
                                    </Button> */}
                        </>
                        { /* )
                        } */}

                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent align="start" className="w-36 p-1 mr-9 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => {

                                        return (
                                            <NavigationMenuItem key={index} className="w-full">
                                                <NavigationMenuLink
                                                    asChild
                                                    className="flex-row items-center gap-2 py-1.5"
                                                >
                                                    <Link href={link.href}>{link.label}</Link>

                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                    <div className="flex justify-center w-full"><ModeToggle /></div>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>


                    {/* this is eng loggle  */}
                    {/* <Select defaultValue="en">
            <SelectTrigger
              id={`language-${id}`}
              className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none px-2 shadow-none [&>svg]:shrink-0"
              aria-label="Select language"
            >
              <GlobeIcon size={16} aria-hidden="true" />
              <SelectValue className="hidden sm:inline-flex" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <span className="flex items-center gap-2">
                    <span className="truncate">{lang.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}


                </div>
            </div>
        </header>
    )
}
