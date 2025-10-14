import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_DATA, ATTRIBUTE_TYPES, TICKET_TABS, QUOTE_TABS, PART_TABS } from "./constants";

// Ticket components
import { PersonalInfo } from "./ticket/PersonalInfo";
import { SocialLinks } from "./ticket/SocialLinks";
import { Preferences } from "./ticket/Preferences";

// Quote components
import { General } from "./quote/General";
import { Security } from "./quote/Security";
import { Privacy } from "./quote/Privacy";

// Part components
import { CurrentPlan } from "./part/CurrentPlan";
import { PaymentMethod } from "./part/PaymentMethod";
import { BillingHistory } from "./part/BillingHistory";

interface TabComponentProps {
  defaultValue?: string;
  className?: string;
}

export const TabComponent = ({ defaultValue = ATTRIBUTE_TYPES.TICKET, className }: TabComponentProps) => (
  <Tabs className={className || "w-100"} defaultValue={defaultValue}>
    <TabsList>
      <TabsTrigger value={ATTRIBUTE_TYPES.TICKET}>Ticket</TabsTrigger>
      <TabsTrigger value={ATTRIBUTE_TYPES.QUOTE}>Quote</TabsTrigger>
      <TabsTrigger value={ATTRIBUTE_TYPES.PART}>Part</TabsTrigger>
    </TabsList>
    
    <TabsContent value={ATTRIBUTE_TYPES.TICKET}>
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="mb-4 font-semibold text-lg">Ticket</h3>
        <Tabs defaultValue={TICKET_TABS.PERSONAL}>
          <TabsList>
            <TabsTrigger value={TICKET_TABS.PERSONAL}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].personal.title}</TabsTrigger>
            <TabsTrigger value={TICKET_TABS.SOCIAL}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].social.title}</TabsTrigger>
            <TabsTrigger value={TICKET_TABS.PREFERENCES}>{TAB_DATA[ATTRIBUTE_TYPES.TICKET].preferences.title}</TabsTrigger>
          </TabsList>
          <TabsContent value={TICKET_TABS.PERSONAL}>
            <PersonalInfo />
          </TabsContent>
          <TabsContent value={TICKET_TABS.SOCIAL}>
            <SocialLinks />
          </TabsContent>
          <TabsContent value={TICKET_TABS.PREFERENCES}>
            <Preferences />
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
