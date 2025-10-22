import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ATTRIBUTE_TYPES } from "./constants";

// Tab section components
import { TicketTabs } from "./ticket";
import { QuoteTabs } from "./quote";
import { PartTabs } from "./part";

interface TabComponentProps {
  defaultValue?: string;
  className?: string;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);



export const TabComponent = ({ defaultValue = ATTRIBUTE_TYPES.TICKET, className }: TabComponentProps) => {
  return (
    <Tabs className={className || "w-180 min-h-screen"} defaultValue={defaultValue}>
      <TabsList>
        {Object.keys(ATTRIBUTE_TYPES).map((key) => {
          const tab = ATTRIBUTE_TYPES[key as keyof typeof ATTRIBUTE_TYPES]
          const title = capitalize(tab);
          return (
            <TabsTrigger key={key} value={tab}>{title}</TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value={ATTRIBUTE_TYPES.TICKET}>
        <TicketTabs />
      </TabsContent>

      <TabsContent value={ATTRIBUTE_TYPES.QUOTE}>
        <QuoteTabs />
      </TabsContent>

      <TabsContent value={ATTRIBUTE_TYPES.PART}>
        <PartTabs />
      </TabsContent>
    </Tabs>
  );
}
