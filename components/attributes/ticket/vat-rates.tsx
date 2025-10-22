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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";

type VatRateItem = {
  id: number;
  value: string;
};

export const VatRates = () => {
  const initialData = TAB_DATA[ATTRIBUTE_TYPES.TICKET].vatRates.data;

  const [vatRates, setVatRates] = useState<VatRateItem[]>([...initialData] as VatRateItem[]);

  const handleRemove = (id: number) => {
    setVatRates(vatRates.filter((option) => option.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now();
    const newOption: VatRateItem = {
      id: newId,
      value: "",
    };
    setVatRates([...vatRates, newOption]);
  };

  const handleValueUpdate = (id: number, newValue: string) => {
    setVatRates(
      vatRates.map((option) => (option.id === id ? { ...option, value: newValue } : option))
    );
  };

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Vat Rates</FieldLegend>
            <FieldDescription>Configure VAT rates for different countries</FieldDescription>
            <FieldGroup>
              <Field>
                {vatRates.map((option) => (
                  <div key={option.id} className="flex items-center gap-10 mb-2">
                    <InputGroup className="w-24">
                      <InputGroupInput
                        id={`days-${option.id}`}
                        className="w-full"
                        value={option.value}
                        type="number"
                        onChange={(e) => handleValueUpdate(option.id, e.target.value)}
                        placeholder="0"
                        min={0}
                        max={100}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>%</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <Trash2
                      className="cursor-pointer size-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(option.id)}
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
          Add Vat Rate
        </Button>
      </form>
    </div>
  );
};
