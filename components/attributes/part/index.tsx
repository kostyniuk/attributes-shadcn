import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PART_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Part components
import { CurrentPlan } from "./current-plan";
import { PaymentMethod } from "./payment-method";
import { BillingHistory } from "./billing-history";

export const PartTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Part</h3>
            <Tabs defaultValue={PART_TABS.PLAN}>
                <TabsList>
                    {Object.keys(PART_TABS).map((key) => {
                        const tabKey = key as keyof typeof PART_TABS;
                        const tabValue = PART_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.PART];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.PART][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
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
    );
};
