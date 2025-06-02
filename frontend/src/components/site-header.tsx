import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="tw-flex tw-h-(--header-height) tw-shrink-0 tw-items-center tw-gap-2 tw-border-b tw-transition-[width,height] tw-ease-linear tw-group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="tw-flex tw-w-full tw-items-center tw-gap-1 tw-px-4 lg:tw-gap-2 lg:tw-px-6">
        <SidebarTrigger className="tw--ml-1" />
        <Separator
          orientation="vertical"
          className="tw-mx-2 data-[orientation=vertical]:tw-h-4"
        />
        <h1 className="tw-text-base tw-font-medium">Documents</h1>
        <div className="tw-ml-auto tw-flex tw-items-center tw-gap-2">
          <Button variant="ghost" asChild size="sm" className="tw-hidden sm:tw-flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:tw-text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
