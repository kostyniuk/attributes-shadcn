const toastDescription = (value: object) => (
    <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
        <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
);

const toastStyle = {
    "--border-radius": "calc(var(--radius) + 4px)",
} as React.CSSProperties;

const toastClassNames = {
    content: "flex flex-col gap-2",
};

export const codeToast = (value: object) => ({
    description: toastDescription(value),
    position: "bottom-right" as const,
    classNames: toastClassNames,
    style: toastStyle,
});