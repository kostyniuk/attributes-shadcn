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
import { useAppForm } from "@/hooks/form";
import { toast } from "sonner";
import { codeToast } from "@/app/simple/helper";
import { z } from "zod";

interface IndustryItem {
    id: number | null;
    name: string;
}

const industrySchema = z.object({
    industries: z.array(z.object({
        id: z.number().nullable(),
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
                                        {field.state.value.map((_, i) => {
                                            return (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div key={i} className="flex items-start gap-10">
                                                        <form.Field
                                                            key={`name-${i}`}
                                                            name={`industries[${i}].name`}
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
                                                                            id={`customer-industry-${i}`}
                                                                            value={subField.state.value as string}
                                                                            onChange={(e) => subField.handleChange((e.target.value))}
                                                                            placeholder="Industry"
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
            </form>
        </div>
    );
};
