import { useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getQueryClient } from "@/providers/queryWrapper";
import Image from "next/image";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/features/login/constant";
import { useRouter } from "next/navigation";

export function UserNav({ profileData }: any) {
  const router = useRouter();
  const queryClient = getQueryClient();
  const firstInitial = useMemo(
    () => profileData?.firstName?.charAt(0).toUpperCase() || "A",
    [profileData?.firstName]
  );
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
          <Button
            variant="default"
            className="relative h-8 w-8 rounded-full outline-none"
          >
            <Avatar className="h-8 w-8 bg-primary outline-none">
              {/* <AvatarImage src="/User.svg?height=32&width=32" alt="@user" /> */}
              <AvatarFallback className="bg-transparent outline-none">
                {firstInitial}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-64 rounded-xl p-2 shadow-lg border-[1px] border-muted-light bg-[#fff]"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal px-2 pb-2 border-b border-transparent">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-tight bg-gradient-to-r from-[#540F86] to-[#542F80] text-transparent bg-clip-text">
                {(profileData?.firstName || "N/A") +
                  " " +
                  (profileData?.lastName || "N/A")}
              </p>
              <p className="text-xs leading-tight bg-gradient-to-r from-[#540F86] to-[#542F80] text-transparent bg-clip-text">
                {profileData?.email || "N/A"}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-px my-2 bg-muted-light" />

          <DropdownMenuGroup>
            {[{ label: "Profile" }, { label: "Settings" }].map(({ label }) => (
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

          <DropdownMenuSeparator className="h-px my-2 bg-muted-light" />

          <DropdownMenuItem
            className="group px-3 py-2 rounded-md transition-colors cursor-pointer hover:bg-[#FF743C]/10"
            onClick={() => {
              queryClient.clear(); // Clear all cached data
              queryClient.resetQueries(); // Reset query state and remove active queries
              Cookies.remove(ACCESS_TOKEN);
              Cookies.remove(REFRESH_TOKEN);
              router.replace("/login");
              router.refresh();
            }}
          >
            <span className="bg-gradient-to-r from-[#540F86] to-[#542F80]  text-transparent bg-clip-text font-medium">
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
