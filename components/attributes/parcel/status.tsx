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
import { useAppForm } from "@/hooks/form";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";
import { z } from "zod";
import { DragDropProvider } from "@dnd-kit/react";
import { DraggableItem } from "@/components/ui/custom/draggable-item";

interface StatusItem {
    id: number | string;
    value: string;
    color: string;
}

const statusSchema = z.object({
    statuses: z.array(z.object({
        id: z.union([z.number(), z.string()]),
        value: z.string().min(1, 'Name is required'),
        color: z.string().length(6, 'Color must be 6'),
    })),
})

export const Status = () => {
    const data = TAB_DATA[ATTRIBUTE_TYPES.PARCEL].status.data as StatusItem[];

    const form = useAppForm({
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
            <form id="parcel-status-form" onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <DragDropProvider onDragEnd={(event) => {
                    const { source, target } = event?.operation || {};
                    const oldIndex = form.state.values.statuses.findIndex(item => Number(item.id) === Number(source?.id));
                    const newIndex = (target as { sortable?: { index: number } })?.sortable?.index ?? 0;

                    form.moveFieldValues('statuses', oldIndex, newIndex);
                }}>
                    <form.Field name="statuses" mode="array">
                        {(field) => (
                            <div>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>Parcel Status</FieldLegend>
                                        <FieldDescription>
                                            Status name
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
                                                                    name={`statuses[${i}].value`}
                                                                    validators={{
                                                                        onBlur: z.string().min(1, 'Name is required'),
                                                                    }}
                                                                >
                                                                    {(subField) => {
                                                                        const isInvalid =
                                                                            subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                        return (
                                                                            <Field className="w-60" data-invalid={isInvalid}>
                                                                                <Input
                                                                                    id={`parcel-status-${i}`}
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
                                                                            <Field className="w-40" data-invalid={isInvalid}>
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
                                                onClick={() => field.pushValue({ id: `temp-${crypto.randomUUID()}`, value: '', color: `000000` })}
                                                className="w-fit"
                                            >
                                                Add Status
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
