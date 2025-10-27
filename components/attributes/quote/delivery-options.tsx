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

interface DeliveryOptionItem {
    id: number | null;
    name: string;
}

const deliveryOptionsSchema = z.object({
    deliveryOptions: z.array(z.object({
        id: z.number().nullable(),
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
                                        {field.state.value.map((_, i) => {
                                            return (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div key={i} className="flex items-start gap-10">
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
                                            )
                                        })}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => field.pushValue({ id: null, name: '' })}
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
            </form>
        </div>
    );
};
