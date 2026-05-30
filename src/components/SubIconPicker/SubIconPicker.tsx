import { AVAILABLE_SUB_ICONS, subIconColorClasses } from '../../constants';
import { Tooltip } from '../Tooltip/Tooltip';
import type { SubIconPickerProps } from './SubIconPicker.types';

export const SubIconPicker = ({ value, onChange }: SubIconPickerProps) => {
    return (
        <div className="border-input-border bg-background overflow-hidden rounded-md border">
            <div className="flex flex-wrap gap-2 p-2">
                {AVAILABLE_SUB_ICONS.map((subIcon) => {
                    const isSelected = value === subIcon;
                    const { bg, border } = subIconColorClasses[subIcon];
                    return (
                        <Tooltip key={subIcon} message={subIcon} placement="bottom-start" size="small" offset={6}>
                            <button
                                type="button"
                                onClick={() => onChange(subIcon)}
                                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border transition-colors ${
                                    isSelected
                                        ? 'border-[#2f81f7] bg-[#1c2128]'
                                        : 'border-input-border hover:bg-[#1c2128]'
                                }`}
                            >
                                {subIcon === 'none' ? (
                                    <span className="h-3 w-3 rounded-full border border-dashed border-[#6e7681]" />
                                ) : (
                                    <span className={`h-3 w-3 rounded-full border ${bg} ${border}`} />
                                )}
                            </button>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};
