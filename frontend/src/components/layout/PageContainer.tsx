interface PageContainerProps {
    children: React.ReactNode
    maxWidth?: number
}

function PageContainer({ children, maxWidth = 720 }: PageContainerProps) {
    return (
        <div
            style={{
                minHeight: "100dvh",
                background: "var(--background-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
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