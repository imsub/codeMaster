import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:tw-from-primary/5 *:data-[slot=card]:tw-to-card dark:*:data-[slot=card]:tw-bg-card tw-grid tw-grid-cols-1 tw-gap-4 tw-px-4 *:data-[slot=card]:tw-bg-gradient-to-t *:data-[slot=card]:tw-shadow-xs lg:tw-px-6 tw-@xl/main:grid-cols-2 tw-@5xl/main:grid-cols-4">
      <Card className="tw-@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="tw-text-2xl tw-font-semibold tw-tabular-nums tw-@[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="tw-flex-col tw-items-start tw-gap-1.5 tw-text-sm">
          <div className="tw-line-clamp-1 tw-flex tw-gap-2 tw-font-medium">
            Trending up this month <IconTrendingUp className="tw-size-4" />
          </div>
          <div className="tw-text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="tw-@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="tw-text-2xl tw-font-semibold tw-tabular-nums tw-@[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="tw-flex-col tw-items-start tw-gap-1.5 tw-text-sm">
          <div className="tw-line-clamp-1 tw-flex tw-gap-2 tw-font-medium">
            Down 20% this period <IconTrendingDown className="tw-size-4" />
          </div>
          <div className="tw-text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="tw-@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="tw-text-2xl tw-font-semibold tw-tabular-nums tw-@[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="tw-flex-col tw-items-start tw-gap-1.5 tw-text-sm">
          <div className="tw-line-clamp-1 tw-flex tw-gap-2 tw-font-medium">
            Strong user retention <IconTrendingUp className="tw-size-4" />
          </div>
          <div className="tw-text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="tw-@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="tw-text-2xl tw-font-semibold tw-tabular-nums tw-@[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="tw-flex-col tw-items-start tw-gap-1.5 tw-text-sm">
          <div className="tw-line-clamp-1 tw-flex tw-gap-2 tw-font-medium">
            Steady performance increase <IconTrendingUp className="tw-size-4" />
          </div>
          <div className="tw-text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
