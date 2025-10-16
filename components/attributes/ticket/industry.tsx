"use client";
import React, { useState } from "react";
import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner"


const formSchema = z.object({
  industries: z.array(z.object({
    id: z.number().optional(),
    name: z.string().min(1),
  })),
})

export const Industries = () => {
  const initialData = TAB_DATA[ATTRIBUTE_TYPES.TICKET].industries.data;


  const form = useForm({
    defaultValues: {
      industries: initialData,
    } as unknown as z.infer<typeof formSchema>,
    validators: {
      onBlur: formSchema,
    },
    onSubmit: (value) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <div className="mt-4 space-y-3 rounded-md border p-4">
      <form
        id="industry-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}>
        <FieldGroup>
          <form.Field name="industries" mode="array">
            {(field) => {
              return (
                <FieldSet>
                  <FieldLegend>Industries</FieldLegend>
                  <FieldDescription>Classify customer contacts by their bussines sector</FieldDescription>
                  <FieldGroup>
                    {field.state.value.map((_, index) => (
                      <form.Field
                        key={index}
                        name={`industries[${index}].name`}
                        children={(subField) => {
                          const isSubFieldInvalid =
                            subField.state.meta.isTouched &&
                            !subField.state.meta.isValid
                          return (
                            <Field key={index} orientation="horizontal" data-invalid={isSubFieldInvalid}>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="w-72"
                                    name={subField.name}
                                    value={subField.state.value as string}
                                    onBlur={subField.handleBlur}
                                    onChange={(e) => subField.handleChange(e.target.value)}
                                    placeholder="Industry"
                                    aria-invalid={isSubFieldInvalid}
                                  />
                                  <Trash2
                                    className="cursor-pointer size-4 text-red-500 hover:text-red-700"
                                    onClick={() => field.removeValue(index)}
                                  />
                                </div>
                                {isSubFieldInvalid && (
                                  <FieldError
                                    errors={subField.state.meta.errors}
                                  />
                                )}
                              </div>
                            </Field>
                          )
                        }}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={() => field.pushValue({ name: "" })}
                      className="mt-2 w-fit"
                    >
                      Add Industry
                    </Button>
                  </FieldGroup>
                </FieldSet>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </div>
  );
};
