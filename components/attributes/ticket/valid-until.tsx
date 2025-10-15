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
import { Trash2 } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";

type ValidUntilItem = {
  id: number;
  name: string;
  days: number;
}

export const ValidUntil = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].validUntil.data;

  const [validUntil, setValidUntil] = useState<ValidUntilItem[]>([...data] as ValidUntilItem[]);

  const handleRemove = (id: number) => {
    setValidUntil(validUntil.filter((validUntil) => validUntil.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now();
    const newValidUntil = {
      id: newId,
      name: "",
      days: 0,
    };
    setValidUntil([...validUntil, newValidUntil]);
  };

  const handleUpdate = (id: number, newValue: number) => {
    setValidUntil(validUntil.map((validUntil) =>
      validUntil.id === id ? { ...validUntil, days: newValue } : validUntil
    ));
  };

  const handleNameUpdate = (id: number, newLabel: string) => {
    setValidUntil(validUntil.map((validUntil) =>
      validUntil.id === id ? { ...validUntil, name: newLabel } : validUntil
    ));
  };

  const handleCopy = (id: number) => {
    console.log(validUntil.find((validUntil) => validUntil.id === id));
  };

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Valid Until</FieldLegend>
            <FieldDescription>
              Spicify the expiration date for quotes or offers
            </FieldDescription>
            <FieldGroup>
              <Field>
                {validUntil.map((validUntil) => (
                  <div key={validUntil.id} className="flex items-center gap-10 mb-2">
                    <Input
                      id={`name-${validUntil.id}`}
                      className="w-48"
                      value={validUntil.name}
                      onChange={(e) => handleNameUpdate(validUntil.id, e.target.value)}
                      placeholder="Valid Until"
                    />
                    <InputGroup className="w-28">
                      <InputGroupInput
                        id={`days-${validUntil.id}`}
                        className="w-full"
                        value={validUntil.days}
                        type="number"
                        onChange={(e) => handleUpdate(validUntil.id, Number(e.target.value))}
                        placeholder="Valid Until Days"
                        min={0}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>Days</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <Trash2
                      className="cursor-pointer size-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(validUntil.id)}
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
          Add Valid Until
        </Button>
      </form>
    </div>
  );
};
