interface PageHeaderProps {
    title: string
    subtitle?: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="text-left mb-5">

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
                <p className="mt-3">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default PageHeader