import { useFormContext } from "@/hooks/form-context"
import { Button } from "../button"
import { FieldGroup } from "../field"

export const ConfirmSection = ({ submitLabel, resetLabel }: { submitLabel: string, resetLabel: string }) => {
    const form = useFormContext()
    return (
        <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
            {([canSubmit, isPristine]) => {
                return (
                    <>
                        {!isPristine && <FieldGroup className="flex-row gap-2">
                            <Button
                                type="submit"
                                variant="default"
                                size="sm"
                                form="status-form"
                                className="w-fit"
                                disabled={!canSubmit}
                            >
                                {submitLabel}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => form.reset()}
                                className="w-fit"
                                disabled={isPristine}
                            >
                                {resetLabel}
                            </Button>
                        </FieldGroup>}
                    </>
                )
            }}
        </form.Subscribe>
    )
}