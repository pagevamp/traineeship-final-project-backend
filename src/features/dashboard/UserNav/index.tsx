import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Image src="/message.svg" alt="Image 2" width={36} height={36} />
        <Image
          src="/message1.svg"
          alt="message"
          width={18}
          height={18}
          className="absolute inset-0 mx-auto my-auto"
        />
      </div>
      <Image src="/bell.svg" alt="Image 1" width={36} height={36} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/User.svg?height=32&width=32" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-64 rounded-xl p-2 shadow-lg border-[1px] border-black bg-[#F9F2FF]"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal px-2 pb-2 border-b border-transparent">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-tight bg-gradient-to-r from-[#540F86] to-[#542F80] text-transparent bg-clip-text">
                <></>John Doe
              </p>
              <p className="text-xs leading-tight bg-gradient-to-r from-[#540F86] to-[#542F80] text-transparent bg-clip-text">
                john.doe@example.com
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-px my-2 bg-gradient-to-r from-[#540F86] to-[#542F80]" />

          <DropdownMenuGroup>
            {[
              { label: "Profile" },
              { label: "Billing" },
              { label: "Settings" },
            ].map(({ label }) => (
              <DropdownMenuItem
                key={label}
                className="group px-3 py-2 rounded-md transition-colors hover:bg-[#FF743C]/10"
              >
                <span className="bg-gradient-to-r from-[#540F86] to-[#542F80]  text-transparent bg-clip-text font-medium">
                  {label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="h-px my-2 bg-gradient-to-r from-[#540F86] to-[#542F80] " />

          <Link href="/login">
            <DropdownMenuItem className="group px-3 py-2 rounded-md transition-colors hover:bg-[#FF743C]/10">
              <span className="bg-gradient-to-r from-[#540F86] to-[#542F80]  text-transparent bg-clip-text font-medium">
                Log out
              </span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
