import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { ConfirmSection } from "@/components/ui/form/confirm-section";
import { TextInputField } from "@/components/ui/form/text-input";

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TextInputField: TextInputField
    },
    formComponents: {
        ConfirmSection: ConfirmSection
    }
})
