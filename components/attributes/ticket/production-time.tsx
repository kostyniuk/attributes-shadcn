"use client";
import React, { useState } from "react";
import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Trash2 } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";

type ProductionTimeItem = {
  id: number;
  name: string;
  days: number;
}

export const ProductionTime = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].productionTime.data;

  const [productionTimes, setProductionTimes] = useState<ProductionTimeItem[]>([...data] as ProductionTimeItem[]);

  const handleRemove = (id: number) => {
    setProductionTimes(productionTimes.filter((productionTime) => productionTime.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now();
    const newProductionTime = {
      id: newId,
      name: "",
      days: 0,
    };
    setProductionTimes([...productionTimes, newProductionTime]);
  };

  const handleUpdate = (id: number, newValue: number) => {
    setProductionTimes(productionTimes.map((productionTime) =>
      productionTime.id === id ? { ...productionTime, days: newValue } : productionTime
    ));
  };

  const handleNameUpdate = (id: number, newLabel: string) => {
    setProductionTimes(productionTimes.map((productionTime) =>
      productionTime.id === id ? { ...productionTime, name: newLabel } : productionTime
    ));
  };

  const handleCopy = (id: number) => {
    console.log(productionTimes.find((productionTime) => productionTime.id === id));
  };

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Production Time</FieldLegend>
            <FieldDescription>
              Define standard lead times for manufacturing orders
            </FieldDescription>
            <FieldGroup>
              <Field>
                {productionTimes.map((productionTime) => (
                  <div key={productionTime.id} className="flex items-center gap-10 mb-2">
                    <Input
                      id={`name-${productionTime.id}`}
                      className="w-48"
                      value={productionTime.name}
                      onChange={(e) => handleNameUpdate(productionTime.id, e.target.value)}
                      placeholder="Production Time"
                    />
                    <InputGroup className="w-28">
                      <InputGroupInput
                        id={`days-${productionTime.id}`}
                        className="w-full"
                        value={productionTime.days}
                        type="number"
                        onChange={(e) => handleUpdate(productionTime.id, Number(e.target.value))}
                        placeholder="Production Time Days"
                        min={0}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>Days</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <Copy
                      className="cursor-pointer size-4 text-blue-600 hover:text-blue-700"
                      onClick={() => handleCopy(productionTime.id)}
                    />
                    <Trash2
                      className="cursor-pointer size-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(productionTime.id)}
                    />
                  </div>
                ))}
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={handleAdd}
          className="mt-2 w-fit"
        >
          Add Production Time
        </Button>
      </form>
    </div>
  );
};
