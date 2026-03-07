interface PageContainerProps {
    children: React.ReactNode
    maxWidth?: number
}

function PageContainer({ children, maxWidth = 980 }: PageContainerProps) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                padding: "40px 20px",
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