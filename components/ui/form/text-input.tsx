import { useFieldContext } from "@/hooks/form-context"
import { Field } from "../field"
import { Input } from "../input"
import { FieldError } from "../field"

export const TextInputField = ({ placeholder }: { placeholder: string }) => {
    const field = useFieldContext<string>()

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field className="w-60" data-invalid={isInvalid}>
            <Input
                value={field.state.value as string}
                onChange={(e) => field.handleChange((e.target.value))}
                placeholder={placeholder}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid}
            />
            {isInvalid && (
                <FieldError errors={field.state.meta.errors} />
            )}
        </Field>
    )
}