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
import { Copy, Trash2 } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";

type ProductionTimeItem = {
  id: number | null;
  name: string;
  days: number;
}

export const ProductionTime = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].productionTime.data as ProductionTimeItem[];

  const form = useForm({
    defaultValues: {
      productionTimes: data
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast("You submitted the following values:", codeToast(value));
    },
    validators: {
      onSubmit: z.object({
        productionTimes: z.array(z.object({
          id: z.number().nullable(),
          name: z.string().min(1, 'Name is required'),
          days: z.number().min(0, 'Days is required'),
        })),
      }),
    },
  });

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form id="production-time-form" onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}>
        <form.Field name="productionTimes" mode="array" // eslint-disable-next-line react/no-children-prop
          children={(field) => (
            <div>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Production Time</FieldLegend>
                  <FieldDescription>
                    Define standard lead times for manufacturing orders
                  </FieldDescription>
                  <FieldGroup>
                    {field.state.value.map((_, i) => {
                      return (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-start gap-10">
                            <form.Field
                              key={`name-${i}`}
                              name={`productionTimes[${i}].name`}
                              validators={{
                                onBlur: z.string().min(1, 'Name is required'),
                              }}
                              children={(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field className="w-60" data-invalid={isInvalid}>
                                    <Input
                                      id={`production-time-name-${i}`}
                                      value={subField.state.value}
                                      onChange={(e) => subField.handleChange(e.target.value)}
                                      placeholder="Production Time"
                                      onBlur={subField.handleBlur}
                                      aria-invalid={isInvalid}
                                    />
                                    {isInvalid && (
                                      <FieldError errors={subField.state.meta.errors} />
                                    )}
                                  </Field>
                                )
                              }}
                            >
                            </form.Field>
                            <form.Field
                              key={`days-${i}`}
                              name={`productionTimes[${i}].days`}
                              validators={{
                                onBlur: z.number().min(0, 'Please provide a valid time').max(99, 'Maximum is 99'),
                              }}
                              children={(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field className="w-26">
                                    <InputGroup>
                                      <InputGroupInput
                                        id={`production-time-days-${i}`}
                                        value={subField.state.value}
                                        type="number"
                                        onChange={(e) => subField.handleChange(Number(e.target.value))}
                                        placeholder="Production Time Days"
                                        min={0}
                                        onBlur={subField.handleBlur}
                                        aria-invalid={isInvalid}
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <InputGroupText>Days</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                    {isInvalid && (
                                      <FieldError errors={subField.state.meta.errors} />
                                    )}
                                  </Field>
                                )
                              }}
                            />
                            <Copy
                              className="cursor-pointer size-4 mt-[10px] text-blue-600 hover:text-blue-700"
                              onClick={() => { }}
                            />
                            <Trash2 className="cursor-pointer size-4 mt-[10px] text-red-500 hover:text-red-700" onClick={() => field.removeValue(i)} />
                          </div>
                        </div>
                      )
                    })}
                    < Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue({ id: null, name: '', days: 0 })}
                      className="w-fit"
                    >
                      Add Production Time
                    </Button >
                    <FieldGroup className="flex-row gap-2">
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        form="production-time-form"
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
        />
      </form >
    </div >
  );
};
