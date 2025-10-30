import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TICKET_TABS, TAB_DATA, ATTRIBUTE_TYPES } from "../constants";

// Ticket components
import { Status } from "./status";

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

            </Tabs>
        </div>
    );
};
