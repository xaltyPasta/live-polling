interface PageContainerProps {
    children: React.ReactNode
    maxWidth?: number
    // Added alignment prop with specific allowed values
    align?: "start" | "center" | "end"
}

function PageContainer({
    children,
    maxWidth = 980,
    align = "start" // Default to center
}: PageContainerProps) {
    const alignmentMap = {
        start: "flex-start",
        center: "center",
        end: "flex-end"
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: alignmentMap[align],
                paddingBottom: "180px"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: `${maxWidth}px`,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default PageContainer