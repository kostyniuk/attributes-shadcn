"use client";
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
import { useForm } from "@tanstack/react-form";

type ProductionTimeItem = {
  id: number;
  name: string;
  days: number;
}

export const ProductionTime = () => {
  const data = TAB_DATA[ATTRIBUTE_TYPES.TICKET].productionTime.data as ProductionTimeItem[];

  const form = useForm({
    defaultValues: {
      productionTimes: data
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
                            <form.Field name={`productionTimes[${i}].name`} // eslint-disable-next-line react/no-children-prop
                              children={(subField) => (
                                <Field className="w-60">
                                  <Input
                                    id={`production-time-name-${i}`}
                                    value={subField.state.value}
                                    onChange={(e) => subField.handleChange(e.target.value)}
                                    placeholder="Production Time"
                                  />
                                </Field>
                              )}
                            />
                            <form.Field name={`productionTimes[${i}].days`} // eslint-disable-next-line react/no-children-prop
                              children={(subField) => (
                                <Field className="w-26">
                                  <InputGroup>
                                    <InputGroupInput
                                      id={`production-time-days-${i}`}
                                      value={subField.state.value}
                                      type="number"
                                      onChange={(e) => subField.handleChange(Number(e.target.value))}
                                      placeholder="Production Time Days"
                                      min={0}
                                    />
                                    <InputGroupAddon align="inline-end">
                                      <InputGroupText>Days</InputGroupText>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Field>
                              )}
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
                  </FieldGroup>

                  < Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.pushValue({ id: 0, name: '', days: 0 })}
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
                </FieldSet>
              </FieldGroup>
            </div>
          )}
        />
      </form >
    </div >
  );
};
