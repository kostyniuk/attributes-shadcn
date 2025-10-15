"use client";
import React, { useState } from "react";
import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeliveryOptionItem = {
  id: number;
  name: string;
};

export const DeliveryOptions = () => {
  const initialData = TAB_DATA[ATTRIBUTE_TYPES.TICKET].deliveryOptions.data;

  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionItem[]>([...initialData] as DeliveryOptionItem[]);

  const handleRemove = (id: number) => {
    setDeliveryOptions(deliveryOptions.filter((option) => option.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now();
    const newOption: DeliveryOptionItem = {
      id: newId,
      name: "",
    };
    setDeliveryOptions([...deliveryOptions, newOption]);
  };

  const handleNameUpdate = (id: number, newLabel: string) => {
    setDeliveryOptions(
      deliveryOptions.map((option) => (option.id === id ? { ...option, name: newLabel } : option))
    );
  };

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Delivery Options</FieldLegend>
            <FieldDescription>Configure available shipping or pickup methods</FieldDescription>
            <FieldGroup>
              <Field>
                {deliveryOptions.map((option) => (
                  <div key={option.id} className="flex items-center gap-10 mb-2">
                    <Input
                      id={option.id.toString()}
                      className="w-72"
                      value={option.name}
                      onChange={(e) => handleNameUpdate(option.id, e.target.value)}
                      placeholder="Delivery Option"
                    />
                    <Trash2
                      className="cursor-pointer size-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(option.id)}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={handleAdd}
                  className="mt-2 max-w-36"
                >
                  Add Delivery Option
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};
