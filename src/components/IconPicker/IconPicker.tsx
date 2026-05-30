import { AVAILABLE_SVGS } from '../../constants';
import { SvgIcon } from '../SvgIcon';
import { Tooltip } from '../Tooltip/Tooltip';
import type { IconPickerProps } from './IconPicker.types';

export const IconPicker = ({ value, onChange }: IconPickerProps) => {
    return (
        <div className="border-input-border bg-background overflow-hidden rounded-md border">
            <div className="flex h-26 flex-wrap gap-2 overflow-auto p-2">
                {AVAILABLE_SVGS.map((svg) => {
                    const isSelected = value === svg;
                    return (
                        <Tooltip key={svg} message={svg} placement="bottom-start" size="small" offset={6}>
                            <button
                                type="button"
                                onClick={() => onChange(svg)}
                                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border transition-colors ${
                                    isSelected
                                        ? 'border-[#2f81f7] bg-[#1c2128]'
                                        : 'border-input-border hover:bg-[#1c2128]'
                                }`}
                            >
                                <SvgIcon icon={svg} size="small" />
                            </button>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};
