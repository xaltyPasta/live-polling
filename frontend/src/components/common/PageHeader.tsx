interface PageHeaderProps {
    title?: React.ReactNode
    subtitle?: React.ReactNode
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="mb-5">

            <div
                style={{
                    width: 134,
                    height: 31,
                    borderRadius: 24,
                    padding: "0 9px",
                    background: "var(--badge-gradient)",
                    color: "white",
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                }}
            >
                ✦ Intervue Poll
            </div>

            <h1 className="page-header-title">
                {title}
            </h1>

            {subtitle && (
                <p style={{
                    fontSize: "18px",
                    color: "var(--text-muted)",
                    fontFamily: "Sora"
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default PageHeader