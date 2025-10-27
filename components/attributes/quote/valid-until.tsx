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
import { Trash2 } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group";
import { useAppForm } from "@/hooks/form";
import { z } from "zod";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";
import { DragDropProvider } from "@dnd-kit/react";
import { DraggableItem } from "@/components/ui/custom/draggable-item";

type ValidUntilItem = {
    id: number | string;
    name: string;
    days: number;
}

export const ValidUntil = () => {
    const data = TAB_DATA[ATTRIBUTE_TYPES.QUOTE].validUntil.data as ValidUntilItem[];

    const form = useAppForm({
        defaultValues: {
            validUntil: data
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            toast("You submitted the following values:", codeToast(value));
        },
        validators: {
            onSubmit: z.object({
                validUntil: z.array(z.object({
                    id: z.union([z.number(), z.string()]),
                    name: z.string().min(1, 'Name is required'),
                    days: z.number().min(0, 'Days is required'),
                })),
            }),
        },
    });

    return (
        <div className="mt-4 space-y-3 rounded-md border p-4">
            <form id="quote-valid-until-form" onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <DragDropProvider onDragEnd={(event) => {
                    const { source, target } = event?.operation || {};
                    const oldIndex = form.state.values.validUntil.findIndex(item => Number(item.id) === Number(source?.id));
                    const newIndex = (target as { sortable?: { index: number } })?.sortable?.index ?? 0;

                    form.moveFieldValues('validUntil', oldIndex, newIndex);
                }}>
                    <form.Field name="validUntil" mode="array" // eslint-disable-next-line react/no-children-prop
                        children={(field) => (
                            <div>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>Valid Until</FieldLegend>
                                        <FieldDescription>
                                            Specify the expiration date for quotes or offers
                                        </FieldDescription>
                                        <FieldGroup>
                                            {field.state.value.map((item, i) => {
                                                const itemId = item.id.toString();
                                                return (
                                                    <DraggableItem id={itemId} key={itemId} index={i}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-start gap-10">
                                                                <form.Field
                                                                    key={`name-${i}`}
                                                                    name={`validUntil[${i}].name`}
                                                                    validators={{
                                                                        onBlur: z.string().min(1, 'Name is required'),
                                                                    }}
                                                                    // eslint-disable-next-line react/no-children-prop
                                                                    children={(subField) => {
                                                                        const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                        return (
                                                                            <Field className="w-60" data-invalid={isInvalid}>
                                                                                <Input
                                                                                    id={`quote-valid-until-name-${i}`}
                                                                                    value={subField.state.value}
                                                                                    onChange={(e) => subField.handleChange(e.target.value)}
                                                                                    placeholder="Valid Until"
                                                                                    onBlur={subField.handleBlur}
                                                                                    aria-invalid={isInvalid}
                                                                                />
                                                                                {isInvalid && (
                                                                                    <FieldError errors={subField.state.meta.errors} />
                                                                                )}
                                                                            </Field>
                                                                        )
                                                                    }}
                                                                />
                                                                <form.Field
                                                                    key={`days-${i}`}
                                                                    name={`validUntil[${i}].days`}
                                                                    validators={{
                                                                        onBlur: z.number().min(0, 'Please provide a valid time').max(999, 'Maximum is 999'),
                                                                    }}
                                                                    // eslint-disable-next-line react/no-children-prop
                                                                    children={(subField) => {
                                                                        const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                        return (
                                                                            <Field className="w-26">
                                                                                <InputGroup>
                                                                                    <InputGroupInput
                                                                                        id={`quote-valid-until-days-${i}`}
                                                                                        value={subField.state.value}
                                                                                        type="number"
                                                                                        onChange={(e) => subField.handleChange(Number(e.target.value))}
                                                                                        placeholder="Valid Until Days"
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
                                                onClick={() => field.pushValue({ id: `temp-${crypto.randomUUID()}`, name: '', days: 0 })}
                                                className="w-fit"
                                            >
                                                Add Valid Until
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
