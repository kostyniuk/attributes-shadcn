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

interface IndustryItem {
    id: number | string;
    name: string;
}

const industrySchema = z.object({
    industries: z.array(z.object({
        id: z.union([z.number(), z.string()]),
        name: z.string().min(1, 'Name is required'),
    })),
})

export const Industries = () => {
    const data = TAB_DATA[ATTRIBUTE_TYPES.CUSTOMER].industries.data as IndustryItem[];

    const form = useAppForm({
        defaultValues: {
            industries: data
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            toast("You submitted the following values:", codeToast(value));
        },
        validators: {
            onSubmit: industrySchema,
        }
    })

    return (
        <div className="mt-4 space-y-3 rounded-md border p-4">
            <form id="customer-industry-form" onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <DragDropProvider onDragEnd={(event) => {
                    const { source, target } = event?.operation || {};
                    const oldIndex = form.state.values.industries.findIndex(industry => Number(industry.id) === Number(source?.id));
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const newIndex = (target as any)?.sortable?.index ?? 0;

                    form.moveFieldValues('industries', oldIndex, newIndex);
                }}>
                    <form.Field name="industries" mode="array">
                        {(field) => (
                            <div>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>Industries</FieldLegend>
                                        <FieldDescription>
                                            Classify customer contacts by their business sector
                                        </FieldDescription>
                                        <FieldGroup>
                                            {field.state.value.map((industry, i) => {
                                                const itemId = industry.id.toString();
                                                return (
                                                    <DraggableItem
                                                        id={itemId}
                                                        key={itemId}
                                                        index={i}
                                                    >
                                                        <div key={i} className="flex items-center justify-between">
                                                            <div key={i} className="flex items-start gap-10">
                                                                <form.AppField name={`industries[${i}].name`} validators={{
                                                                    onBlur: z.string().min(1, 'Name is required'),
                                                                }}>
                                                                    {(subField) => {
                                                                        return <subField.TextInputField placeholder="Industry" />
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
                                                Add Industry
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
