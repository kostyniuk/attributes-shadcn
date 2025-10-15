"use client";

import { useState } from "react";
import { TAB_DATA, TICKET_TABS, ATTRIBUTE_TYPES } from "../constants";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ColorPickerWithLabel } from "@/components/ui/custom/color-picker-with-label";
import { Trash2 } from "lucide-react";
interface StatusItem {
  id: string;
  label: string;
  value: string;
  color: string;
}

export const Status = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].status.data;
  const [statuses, setStatuses] = useState<StatusItem[]>([...data] as StatusItem[]);
  
  const handleRemove = (id: string) => {
    setStatuses(statuses.filter((status) => status.id !== id));
  };

  const handleAdd = () => {
    const newId = `status-${Date.now()}`;
    const newStatus = {
      id: newId,
      label: "New Status",
      value: "",
      color: "000000"
    };
    setStatuses([...statuses, newStatus]);
  };

  const handleUpdate = (id: string, newValue: string) => {
    setStatuses(statuses.map((status) => 
      status.id === id ? { ...status, value: newValue } : status
    ));
  };

  const handleColorChange = (id: string, newColor: string) => {
    setStatuses(statuses.map((status) => 
      status.id === id ? { ...status, color: newColor } : status
    ));
  };
  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Ticket Status</FieldLegend>
            <FieldDescription>
              The status of the ticket
            </FieldDescription>
            <FieldGroup>
               <Field>
                 {statuses.map((status) => (
                   <div key={status.id} className="flex items-center gap-10 mb-2">
                     <div className="flex-1">
                       <Input
                         id={status.id}
                         className="w-60"
                         value={status.value}
                         onChange={(e) => handleUpdate(status.id, e.target.value)}
                         placeholder="New Status"
                       />
                     </div>
                     <div className="flex-1">
                       <ColorPickerWithLabel 
                         value={status.color}
                         onChange={(color) => handleColorChange(status.id, color)}
                         placeholder="000000"
                       />
                     </div>
                     <Trash2 className="cursor-pointer size-4 text-red-500 hover:text-red-700" onClick={() => handleRemove(status.id)}/>

                   </div>
                 ))}
                 <Button 
                   type="button" 
                   variant="default"
                   size="sm"
                   onClick={handleAdd}
                   className="mt-2 max-w-24"
                 >
                   Add Status
                 </Button>
               </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};




