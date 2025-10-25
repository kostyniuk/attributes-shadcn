import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PARCEL_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Parcel components
import { Status } from "./status";

export const ParcelTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Parcel</h3>
            <Tabs defaultValue={PARCEL_TABS.STATUS}>
                <TabsList>
                    {Object.keys(PARCEL_TABS).map((key) => {
                        const tabKey = key as keyof typeof PARCEL_TABS;
                        const tabValue = PARCEL_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.PARCEL];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.PARCEL][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <TabsContent value={PARCEL_TABS.STATUS}>
                    <Status />
                </TabsContent>
            </Tabs>
        </div>
    );
};
