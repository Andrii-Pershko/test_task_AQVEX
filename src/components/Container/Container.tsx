export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`max-w-[1480px] w-full m-auto px-[15px] ${className}`}>
            {children}
        </div>
    );
};