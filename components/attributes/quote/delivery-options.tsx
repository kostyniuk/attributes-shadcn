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
import { useForm } from "@tanstack/react-form";
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

    const form = useForm({
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
                                                        <form.Field
                                                            key={`name-${i}`}
                                                            name={`deliveryOptions[${i}].name`}
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
                                                                            id={`quote-delivery-option-${i}`}
                                                                            value={subField.state.value as string}
                                                                            onChange={(e) => subField.handleChange((e.target.value))}
                                                                            placeholder="Delivery Option"
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
                                        <FieldGroup className="flex-row gap-2">
                                            <Button
                                                type="submit"
                                                variant="default"
                                                size="sm"
                                                form="quote-delivery-options-form"
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
