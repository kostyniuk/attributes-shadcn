import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CUSTOMER_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Customer components
import { Status } from "./status";

export const CustomerTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Customer</h3>
            <Tabs defaultValue={CUSTOMER_TABS.STATUS}>
                <TabsList>
                    {Object.keys(CUSTOMER_TABS).map((key) => {
                        const tabKey = key as keyof typeof CUSTOMER_TABS;
                        const tabValue = CUSTOMER_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.CUSTOMER];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.CUSTOMER][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <TabsContent value={CUSTOMER_TABS.STATUS}>
                    <Status />
                </TabsContent>
            </Tabs>
        </div>
    );
};
