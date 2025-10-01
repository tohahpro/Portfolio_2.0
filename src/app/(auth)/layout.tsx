
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="min-h-dvh flex flex-col">
                <div className="grow-1">
                    {children}
                </div>
            </main>
        </>
    );
}
