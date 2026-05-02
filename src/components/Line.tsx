interface LineProps {
    borderColorClassName?: string;
    orientation?: 'horizontal' | 'vertical';
}

export const Line = ({
    borderColorClassName = 'border-input-border',
    orientation = 'horizontal',
}: LineProps) => {
    const sizeAndBorder = orientation === 'vertical' ? 'h-full border-r' : 'w-full border-b';
    return <div className={`${borderColorClassName} ${sizeAndBorder}`} />;
};
