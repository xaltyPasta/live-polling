interface PageHeaderProps {
    title: string
    subtitle?: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="text-center mb-5">
            <div
                style={{
                    background: "var(--gradient-primary)",
                    color: "white",
                    display: "inline-block",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    marginBottom: "16px",
                }}
            >
                ✦ Intervue Poll
            </div>

            <h1 style={{ fontWeight: 600 }}>{title}</h1>

            {subtitle && (
                <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "auto" }}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default PageHeader