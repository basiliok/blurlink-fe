interface LineProps {
    color?: string;
}

export const Line = ({ color = 'border-input-border' }: LineProps) => {
    return <div className={`${color} w-full border-b`} />;
};
