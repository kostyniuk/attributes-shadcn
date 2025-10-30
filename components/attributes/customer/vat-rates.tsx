"use client";
import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";
import { useAppForm } from "@/hooks/form";
import { z } from "zod";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";
import { DragDropProvider } from "@dnd-kit/react";
import { DraggableItem } from "@/components/ui/custom/draggable-item";

type VatRateItem = {
    id: number | string;
    value: number;
};

export const VatRates = () => {
    const data = TAB_DATA[ATTRIBUTE_TYPES.CUSTOMER].vatRates.data as VatRateItem[];

    const form = useAppForm({
        defaultValues: {
            vatRates: data
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            toast("You submitted the following values:", codeToast(value));
        },
        validators: {
            onSubmit: z.object({
                vatRates: z.array(z.object({
                    id: z.union([z.number(), z.string()]),
                    value: z.number().min(0, 'Value is required').max(100, 'Value must be between 0 and 100'),
                })),
            }),
        },
    });

    return (
        <div className="mt-4 space-y-3 rounded-md border p-4">
            <form id="vat-rates-form" onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <DragDropProvider onDragEnd={(event) => {
                    const { source, target } = event?.operation || {};
                    const oldIndex = form.state.values.vatRates.findIndex(item => Number(item.id) === Number(source?.id));
                    const newIndex = (target as { sortable?: { index: number } })?.sortable?.index ?? 0;

                    form.moveFieldValues('vatRates', oldIndex, newIndex);
                }}>
                    <form.Field name="vatRates" mode="array" // eslint-disable-next-line react/no-children-prop
                        children={(field) => (
                            <div>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>Vat Rates</FieldLegend>
                                        <FieldDescription>
                                            Configure VAT rates for different countries
                                        </FieldDescription>
                                        <FieldGroup>
                                            {field.state.value.map((item, i) => {
                                                const itemId = item.id.toString();
                                                return (
                                                    <DraggableItem id={itemId} key={itemId} index={i}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-start gap-10">
                                                                <form.Field
                                                                    key={`value-${i}`}
                                                                    name={`vatRates[${i}].value`}
                                                                    validators={{
                                                                        onBlur: z.number().min(0, 'Value is required').max(100, 'Value must be between 0 and 100'),
                                                                    }}
                                                                    // eslint-disable-next-line react/no-children-prop
                                                                    children={(subField) => {
                                                                        const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                        return (
                                                                            <Field className="w-26" data-invalid={isInvalid}>
                                                                                <InputGroup>
                                                                                    <InputGroupInput
                                                                                        id={`vat-rate-${i}`}
                                                                                        value={subField.state.value}
                                                                                        type="number"
                                                                                        onChange={(e) => subField.handleChange(Number(e.target.value))}
                                                                                        placeholder="0"
                                                                                        min={0}
                                                                                        max={100}
                                                                                        onBlur={subField.handleBlur}
                                                                                        aria-invalid={isInvalid}
                                                                                    />
                                                                                    <InputGroupAddon align="inline-end">
                                                                                        <InputGroupText>%</InputGroupText>
                                                                                    </InputGroupAddon>
                                                                                </InputGroup>
                                                                                {isInvalid && (
                                                                                    <FieldError errors={subField.state.meta.errors} />
                                                                                )}
                                                                            </Field>
                                                                        )
                                                                    }}
                                                                />
                                                                <Trash2 className="cursor-pointer size-4 mt-[10px] text-red-500 hover:text-red-700" onClick={() => field.removeValue(i)} />
                                                            </div>
                                                        </div>
                                                    </DraggableItem>
                                                )
                                            })}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => field.pushValue({ id: `temp-${crypto.randomUUID()}`, value: 0 })}
                                                className="w-fit"
                                            >
                                                Add Vat Rate
                                            </Button>
                                            <form.AppForm>
                                                <form.ConfirmSection submitLabel="Submit" resetLabel="Reset" />
                                            </form.AppForm>
                                        </FieldGroup>
                                    </FieldSet>
                                </FieldGroup>
                            </div>
                        )}
                    />
                </DragDropProvider>
            </form>
        </div>
    );
};


