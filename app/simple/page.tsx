"use client";

import { Button } from "@/components/ui/button";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner"

type User = {
    name: string;
}

export default function SimpleForm() {

    const defaultUser: User = { name: "" };

    const form = useForm({
        defaultValues: defaultUser,
        onSubmitInvalid: (formState) => {
            console.warn("Form is invalid", formState);
        },
        onSubmit: (value) => {
            console.log(value.value);
            toast("You submitted the following values:", {
                description: (
                    <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                        <code>{JSON.stringify(value.value, null, 2)}</code>
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
    });

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1>Simple Form</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <form.Field
                    name="name"
                    validators={{
                        onChange: ({ value }) =>
                            value.length < 3 ? 'Name must be at least 3 characters long' : undefined,
                    }}
                    children={(field) => {
                        return (
                            <div className="flex flex-col gap-2 w-64">
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <Input
                                    type="text"
                                    id={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Name"
                                />
                                <FieldError>{field.state.meta.errors.join(',')}</FieldError>
                            </div>
                        );
                    }} />
                <Button variant="default" type="submit" className="w-32 mt-4">Submit</Button>
            </form>
        </div>
    );
}