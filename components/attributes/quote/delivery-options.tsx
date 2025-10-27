"use client";

import { TAB_DATA, ATTRIBUTE_TYPES } from "../constants";
import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { useAppForm } from "@/hooks/form";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";
import { z } from "zod";
import { DragDropProvider } from "@dnd-kit/react";
import { DraggableItem } from "@/components/ui/custom/draggable-item";

interface DeliveryOptionItem {
    id: number | string;
    name: string;
}

const deliveryOptionsSchema = z.object({
    deliveryOptions: z.array(z.object({
        id: z.union([z.number(), z.string()]),
        name: z.string().min(1, 'Name is required'),
    })),
})

export const DeliveryOptions = () => {
    const data = TAB_DATA[ATTRIBUTE_TYPES.QUOTE].deliveryOptions.data as DeliveryOptionItem[];

    const form = useAppForm({
        defaultValues: {
            deliveryOptions: data
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            toast("You submitted the following values:", codeToast(value));
        },
        validators: {
            onSubmit: deliveryOptionsSchema,
        }
    })

    return (
        <div className="mt-4 space-y-3 rounded-md border p-4">
            <form id="quote-delivery-options-form" onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <DragDropProvider onDragEnd={(event) => {
                    const { source, target } = event?.operation || {};
                    const oldIndex = form.state.values.deliveryOptions.findIndex(item => Number(item.id) === Number(source?.id));
                    const newIndex = (target as { sortable?: { index: number } })?.sortable?.index ?? 0;

                    form.moveFieldValues('deliveryOptions', oldIndex, newIndex);
                }}>
                    <form.Field name="deliveryOptions" mode="array">
                        {(field) => (
                            <div>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>Delivery Options</FieldLegend>
                                        <FieldDescription>
                                            Configure available shipping or pickup methods
                                        </FieldDescription>
                                        <FieldGroup>
                                            {field.state.value.map((deliveryOption, i) => {
                                                const itemId = deliveryOption.id.toString();
                                                return (
                                                    <DraggableItem id={itemId} key={itemId} index={i}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-start gap-10">
                                                                <form.AppField name={`deliveryOptions[${i}].name`} validators={{
                                                                    onBlur: z.string().min(1, 'Name is required'),
                                                                }}>
                                                                    {(subField) => {
                                                                        return <subField.TextInputField placeholder="Delivery Option" />
                                                                    }}
                                                                </form.AppField>
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
                                                onClick={() => field.pushValue({ id: `temp-${crypto.randomUUID()}`, name: '' })}
                                                className="w-fit"
                                            >
                                                Add Delivery Option
                                            </Button>
                                            <form.AppForm>
                                                <form.ConfirmSection submitLabel="Submit" resetLabel="Reset" />
                                            </form.AppForm>
                                        </FieldGroup>
                                    </FieldSet>
                                </FieldGroup>
                            </div>
                        )}
                    </form.Field>
                </DragDropProvider>
            </form>
        </div>
    );
};
