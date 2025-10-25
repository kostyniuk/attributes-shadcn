import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TICKET_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Ticket components
import { Status } from "./status";
import { ProductionTime } from "./production-time";
import { DeliveryOptions } from "./delivery-options";
import { VatRates } from "./vat-rates";
import { ValidUntil } from "./valid-until";

export const TicketTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Ticket</h3>
            <Tabs defaultValue={TICKET_TABS.STATUS}>
                <TabsList>
                    {Object.keys(TICKET_TABS).map((key) => {
                        const tabKey = key as keyof typeof TICKET_TABS;
                        const tabValue = TICKET_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.TICKET];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.TICKET][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
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
                <TabsContent value={TICKET_TABS.VAT_RATES}>
                    <VatRates />
                </TabsContent>
                <TabsContent value={TICKET_TABS.VALID_UNTIL}>
                    <ValidUntil />
                </TabsContent>
            </Tabs>
        </div>
    );
};
