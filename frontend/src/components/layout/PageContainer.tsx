interface PageContainerProps {
    children: React.ReactNode
    maxWidth?: number
    align?: "start" | "center" | "end"
}

function PageContainer({
    children,
    maxWidth = 980,
    align = "center"
}: PageContainerProps) {

    const textAlignMap = {
        start: "left",
        center: "center",
        end: "right"
    } as const;

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",   
                paddingBottom: "180px"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: `${maxWidth}px`,
                    textAlign: textAlignMap[align]
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default PageContainer