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

type IndustryItem = {
  id: number;
  name: string;
};

export const Industries = () => {
  const initialData = TAB_DATA[ATTRIBUTE_TYPES.TICKET].industries.data;

  const [industries, setIndustries] = useState<IndustryItem[]>([...initialData] as IndustryItem[]);

  const handleRemove = (id: number) => {
    setIndustries(industries.filter((option) => option.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now();
    const newOption: IndustryItem = {
      id: newId,
      name: "",
    };
    setIndustries([...industries, newOption]);
  };

  const handleNameUpdate = (id: number, newLabel: string) => {
    setIndustries(
      industries.map((option) => (option.id === id ? { ...option, name: newLabel } : option))
    );
  };

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Industries</FieldLegend>
            <FieldDescription>Classify customer contacts by their bussines sector</FieldDescription>
            <FieldGroup>
              <Field>
                {industries.map((option) => (
                  <div key={option.id} className="flex items-center gap-10 mb-2">
                    <Input
                      id={option.id.toString()}
                      className="w-72"
                      value={option.name}
                      onChange={(e) => handleNameUpdate(option.id, e.target.value)}
                      placeholder="Industry"
                    />
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
          Add Industry
        </Button>
      </form>
    </div>
  );
};
