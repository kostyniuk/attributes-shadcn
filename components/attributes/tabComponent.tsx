import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_DATA, ATTRIBUTE_TYPES, TICKET_TABS, QUOTE_TABS, PART_TABS } from "./constants";

// Ticket components
import { Status } from "./ticket/status";
import { ProductionTime } from "./ticket/production-time";
import { DeliveryOptions } from "./ticket/delivery-options";

// Quote components
import { General } from "./quote/General";
import { Security } from "./quote/Security";
import { Privacy } from "./quote/Privacy";

// Part components
import { CurrentPlan } from "./part/CurrentPlan";
import { PaymentMethod } from "./part/PaymentMethod";
import { BillingHistory } from "./part/BillingHistory";
import { Industries } from "./ticket/industry";

interface TabComponentProps {
  defaultValue?: string;
  className?: string;
}

export const TabComponent = ({ defaultValue = ATTRIBUTE_TYPES.TICKET, className }: TabComponentProps) => (
  <Tabs className={className || "w-150 min-h-screen"} defaultValue={defaultValue}>
    <TabsList>
      <TabsTrigger value={ATTRIBUTE_TYPES.TICKET}>Ticket</TabsTrigger>
      <TabsTrigger value={ATTRIBUTE_TYPES.QUOTE}>Quote</TabsTrigger>
      <TabsTrigger value={ATTRIBUTE_TYPES.PART}>Part</TabsTrigger>
    </TabsList>
    
    <TabsContent value={ATTRIBUTE_TYPES.TICKET}>
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="mb-4 font-semibold text-lg">Ticket</h3>
        <Tabs defaultValue={TICKET_TABS.STATUS}>
          <TabsList>
            <TabsTrigger value={TICKET_TABS.STATUS}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].status.title}</TabsTrigger>
            <TabsTrigger value={TICKET_TABS.PRODUCTION_TIME}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].productionTime.title}</TabsTrigger>
            <TabsTrigger value={TICKET_TABS.DELIVERY_OPTIONS}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].deliveryOptions.title}</TabsTrigger>
            <TabsTrigger value={TICKET_TABS.INDUSTRIES}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].industries.title}</TabsTrigger>
          </TabsList>
          <TabsContent value={TICKET_TABS.STATUS}>
            <Status />
          </TabsContent>
          <TabsContent value={TICKET_TABS.PRODUCTION_TIME}>
            <ProductionTime />
          </TabsContent>
          <TabsContent value={TICKET_TABS.DELIVERY_OPTIONS}>
            <DeliveryOptions />
          </TabsContent>
          <TabsContent value={TICKET_TABS.INDUSTRIES}>
            <Industries />
          </TabsContent>
        </Tabs>
      </div>
    </TabsContent>
    
    <TabsContent value={ATTRIBUTE_TYPES.QUOTE}>
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="mb-4 font-semibold text-lg">Quote</h3>
        <Tabs defaultValue={QUOTE_TABS.GENERAL}>
          <TabsList>
            <TabsTrigger value={QUOTE_TABS.GENERAL}>{TAB_DATA[ATTRIBUTE_TYPES.QUOTE].general.title}</TabsTrigger>
            <TabsTrigger value={QUOTE_TABS.SECURITY}>{TAB_DATA[ATTRIBUTE_TYPES.QUOTE].security.title}</TabsTrigger>
            <TabsTrigger value={QUOTE_TABS.PRIVACY}>{TAB_DATA[ATTRIBUTE_TYPES.QUOTE].privacy.title}</TabsTrigger>
          </TabsList>
          <TabsContent value={QUOTE_TABS.GENERAL}>
            <General />
          </TabsContent>
          <TabsContent value={QUOTE_TABS.SECURITY}>
            <Security />
          </TabsContent>
          <TabsContent value={QUOTE_TABS.PRIVACY}>
            <Privacy />
          </TabsContent>
        </Tabs>
      </div>
    </TabsContent>
    
    <TabsContent value={ATTRIBUTE_TYPES.PART}>
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="mb-4 font-semibold text-lg">Part</h3>
        <Tabs defaultValue={PART_TABS.PLAN}>
          <TabsList>
            <TabsTrigger value={PART_TABS.PLAN}>{TAB_DATA[ATTRIBUTE_TYPES.PART].plan.title}</TabsTrigger>
            <TabsTrigger value={PART_TABS.PAYMENT}>{TAB_DATA[ATTRIBUTE_TYPES.PART].payment.title}</TabsTrigger>
            <TabsTrigger value={PART_TABS.HISTORY}>{TAB_DATA[ATTRIBUTE_TYPES.PART].history.title}</TabsTrigger>
          </TabsList>
          <TabsContent value={PART_TABS.PLAN}>
            <CurrentPlan />
          </TabsContent>
          <TabsContent value={PART_TABS.PAYMENT}>
            <PaymentMethod />
          </TabsContent>
          <TabsContent value={PART_TABS.HISTORY}>
            <BillingHistory />
          </TabsContent>
        </Tabs>
      </div>
    </TabsContent>
  </Tabs>
);
