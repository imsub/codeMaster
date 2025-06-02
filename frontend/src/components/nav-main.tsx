"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="tw-flex tw-flex-col tw-gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="tw-flex tw-items-center tw-gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 hover:tw-text-primary-foreground active:tw-bg-primary/90 active:tw-text-primary-foreground tw-min-w-8 tw-duration-200 tw-ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="tw-size-8 group-data-[collapsible=icon]:tw-opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="tw-sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
