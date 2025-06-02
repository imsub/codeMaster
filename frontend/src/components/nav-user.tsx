"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:tw-bg-sidebar-accent data-[state=open]:tw-text-sidebar-accent-foreground"
            >
              <Avatar className="tw-h-8 tw-w-8 tw-rounded-lg tw-grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="tw-rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="tw-grid tw-flex-1 tw-text-left tw-text-sm tw-leading-tight">
                <span className="tw-truncate tw-font-medium">{user.name}</span>
                <span className="tw-text-muted-foreground tw-truncate tw-text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="tw-ml-auto tw-size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="tw-w-(--radix-dropdown-menu-trigger-width) tw-min-w-56 tw-rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="tw-p-0 tw-font-normal">
              <div className="tw-flex tw-items-center tw-gap-2 tw-px-1 tw-py-1.5 tw-text-left tw-text-sm">
                <Avatar className="tw-h-8 tw-w-8 tw-rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="tw-rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="tw-grid tw-flex-1 tw-text-left tw-text-sm tw-leading-tight">
                  <span className="tw-truncate tw-font-medium">{user.name}</span>
                  <span className="tw-text-muted-foreground tw-truncate tw-text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
