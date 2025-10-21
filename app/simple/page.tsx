"use client";

import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, useStore } from "@tanstack/react-form";
import { toast } from "sonner"
import { z } from "zod";
import { codeToast } from "./helper";

const userSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
})

export default function SimpleForm() {

    const defaultUser: z.infer<typeof userSchema> = { name: "", email: "" };
    const form = useForm({
        defaultValues: defaultUser,
        onSubmitInvalid: (formState) => {
            console.warn("Form is invalid", formState);
        },
        onSubmit: (value) => {
            console.log(value.value);
            toast("You submitted the following values:", codeToast(value.value));
            form.reset();
        },
        validators: {
            onChange: userSchema,
        },
    });

    return (
        <div className="flex flex-col gap-4 p-4 max-w-md mx-auto h-screen items-center justify-center">
            <h1>Simple Form</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <FieldGroup>
                    <form.Field
                        name="name"
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
                                    {!field.state.meta.isPristine && <FieldError errors={field.state.meta.errors} />}
                                </div>
                            );
                        }} />
                    <form.Field
                        name="email"
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-2 w-64">
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        type="email"
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Email"
                                    />
                                    {!field.state.meta.isPristine && <FieldError errors={field.state.meta.errors as Array<{ message?: string } | undefined>} />}
                                </div>
                            );
                        }} />
                </FieldGroup>
                <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
                    {([canSubmit, isPristine]) => {
                        const isDisabled = !canSubmit || isPristine;
                        return (
                            <Button
                                variant={isDisabled ? "outline" : "default"}
                                type="submit"
                                disabled={isDisabled}
                                className="w-32 mt-4"
                            >
                                Submit
                            </Button>
                        );
                    }}
                </form.Subscribe>
            </form>
        </div>
    );
}