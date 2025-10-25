import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JOB_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Job components
import { Status } from "./status";

export const JobTabs = () => {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Job</h3>
            <Tabs defaultValue={JOB_TABS.STATUS}>
                <TabsList>
                    {Object.keys(JOB_TABS).map((key) => {
                        const tabKey = key as keyof typeof JOB_TABS;
                        const tabValue = JOB_TABS[tabKey];
                        const tabDataKey = tabValue as keyof typeof TAB_DATA[typeof ATTRIBUTE_TYPES.JOB];
                        return (
                            <TabsTrigger key={key} value={tabValue}>
                                {TAB_DATA[ATTRIBUTE_TYPES.JOB][tabDataKey].title}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <TabsContent value={JOB_TABS.STATUS}>
                    <Status />
                </TabsContent>
            </Tabs>
        </div>
    );
};
