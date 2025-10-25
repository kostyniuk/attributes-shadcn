import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITEM_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Item components
import { Status } from "./status";

export const ItemTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Item</h3>
            <Tabs defaultValue={ITEM_TABS.STATUS}>
                <TabsList>
                    {Object.keys(ITEM_TABS).map((key) => {
                        const tabKey = key as keyof typeof ITEM_TABS;
                        const tabValue = ITEM_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.ITEM];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.ITEM][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <TabsContent value={ITEM_TABS.STATUS}>
                    <Status />
                </TabsContent>
            </Tabs>
        </div>
    );
};
