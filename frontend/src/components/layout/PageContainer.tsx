interface PageContainerProps {
    children: React.ReactNode
}

function PageContainer({ children }: PageContainerProps) {
    return (
        <div
            style={{
                minHeight: "100vh",
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
                    maxWidth: "980px",
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default PageContainer