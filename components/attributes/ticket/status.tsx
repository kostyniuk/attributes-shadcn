"use client";

import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";
import {
  Field,
  FieldDescription,
  FieldError,
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
import { z } from "zod";
interface StatusItem {
  id: string;
  value: string;
  color: string;
}

const statusSchema = z.object({
  statuses: z.array(z.object({
    id: z.string(),
    value: z.string().min(1, 'Name is required'),
    color: z.string().length(6, 'Color must be 6'),
  })),
})

export const Status = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].status.data as StatusItem[];

  const form = useForm({
    defaultValues: {
      statuses: data
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast("You submitted the following values:", codeToast(value));
    },
    validators: {
      onSubmit: statusSchema,
    }
  })

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form id="status-form" onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
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
                        <div key={i} className="flex items-center justify-between">
                          <div key={i} className="flex items-flex-start gap-10">
                            <form.Field
                              key={`value-${i}`}
                              name={`statuses[${i}].value`}
                              validators={{
                                onBlur: z.string().min(1, 'Name is required'),
                              }}
                            >
                              {(subField) => {
                                const isInvalid =
                                  subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid}>
                                    <Input
                                      id={`status-${i}`}
                                      className="w-60"
                                      value={subField.state.value as string}
                                      onChange={(e) => subField.handleChange((e.target.value))}
                                      placeholder="New Status"
                                      onBlur={subField.handleBlur}
                                      aria-invalid={isInvalid}
                                    />
                                    {isInvalid && (
                                      <FieldError errors={subField.state.meta.errors} />
                                    )}
                                  </Field>
                                )
                              }}
                            </form.Field>
                            <form.Field
                              key={`color-${i}`}
                              name={`statuses[${i}].color`}
                              validators={{
                                onBlur: z.string().length(6, 'Color must be hex'),
                              }}
                            >
                              {(subField) => {
                                const isInvalid =
                                  subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid}>
                                    <ColorPickerWithLabel
                                      value={subField.state.value as string}
                                      onChange={(color) => subField.handleChange(color)}
                                      onBlur={subField.handleBlur}
                                      invalid={isInvalid}
                                    />
                                    {isInvalid && (
                                      <FieldError errors={subField.state.meta.errors} />
                                    )}
                                  </Field>
                                )
                              }}
                            </form.Field>
                            <Trash2 className="cursor-pointer size-10 pb-[6px] text-red-500 hover:text-red-700" onClick={() => field.removeValue(i)} />
                          </div>
                        </div>
                      )
                    })}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue({ id: '', value: '', color: `000000` })}
                      className="w-fit"
                    >
                      Add Status
                    </Button>
                    <FieldGroup className="flex-row gap-2">
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        form="status-form"
                        className="w-fit"
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => form.reset()}
                        className="w-fit"
                      >
                        Reset
                      </Button>
                    </FieldGroup>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </div>
          )}
        </form.Field>
      </form>
    </div>
  );
};




