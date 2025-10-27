import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { ConfirmSection } from "@/components/ui/form/confirm-section";

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {
        ConfirmSection: ConfirmSection
    }
})
