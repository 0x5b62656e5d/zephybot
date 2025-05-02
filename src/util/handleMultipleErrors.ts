export const handleMultipleErrors = (error: any) => {
    if (
        error &&
        typeof error === "object" &&
        "errors" in error &&
        Array.isArray((error as any).errors)
    ) {
        for (const subError of (error as any).errors) {
            console.error(subError);
        }
    }
};
