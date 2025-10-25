import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUOTE_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Quote components
import { Status } from "./status";
import { DeliveryOptions } from "./delivery-options";
import { ValidUntil } from "./valid-until";

export const QuoteTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Quote</h3>
            <Tabs defaultValue={QUOTE_TABS.STATUS}>
                <TabsList>
                    {Object.keys(QUOTE_TABS).map((key) => {
                        const tabKey = key as keyof typeof QUOTE_TABS;
                        const tabValue = QUOTE_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.QUOTE];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.QUOTE][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <TabsContent value={QUOTE_TABS.STATUS}>
                    <Status />
                </TabsContent>
                <TabsContent value={QUOTE_TABS.DELIVERY_OPTIONS}>
                    <DeliveryOptions />
                </TabsContent>
                <TabsContent value={QUOTE_TABS.VALID_UNTIL}>
                    <ValidUntil />
                </TabsContent>
            </Tabs>
        </div>
    );
};
