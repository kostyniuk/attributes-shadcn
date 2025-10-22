"use client";

import { useState } from "react";
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
import { ColorPickerWithLabel } from "@/components/ui/custom/color-picker-with-label";
import { Trash2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";
interface StatusItem {
  id: string;
  value: string;
  color: string;
}

export const Status = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].status.data as StatusItem[];

  const form = useForm({
    defaultValues: {
      statuses: data
    },
    validators: {
      onBlur: (value) => {
        toast("You submitted the following values:", codeToast(value.value));
        // form.reset();
      },
    },
  })

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form.Field name="statuses" mode="array">
        {(field) => (
          <div>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Ticket Status</FieldLegend>
                <FieldDescription>
                  Status name
                </FieldDescription>
                <FieldGroup>
                  {field.state.value.map((_, i) => {
                    return (
                      <div key={i} className="flex items-center gap-10 mb-2">
                        <form.Field key={'value-${i}'} name={`statuses[${i}].value`}>
                          {(subField) => (
                            <Field>
                              <Input
                                id={`status-${i}`}
                                className="w-60"
                                value={subField.state.value as string}
                                onChange={(e) => subField.handleChange((e.target.value))}
                                placeholder="New Status"
                                onBlur={subField.handleBlur}
                              />
                            </Field>
                          )}
                        </form.Field>
                        <form.Field key={'color-${i}'} name={`statuses[${i}].color`}>
                          {(subField) => (
                            <ColorPickerWithLabel
                              value={subField.state.value as string}
                              onChange={(color) => subField.handleChange(color)}
                              onBlur={subField.handleBlur}
                            />
                          )}
                        </form.Field>
                        <Trash2 className="cursor-pointer size-8 text-red-500 hover:text-red-700" onClick={() => field.removeValue(i)} />
                      </div>
                    )
                  })}
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => field.pushValue({ id: '', value: '', color: `000000` })}
                    className="mt-2 w-fit"
                  >
                    Add Status
                  </Button>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </div>
        )}
      </form.Field>
    </div>
  );
};




