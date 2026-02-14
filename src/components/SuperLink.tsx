import { GenericIcon } from './GenericIcon';
import { DotsThreeVerticalIcon } from '../assets/icons';

export const SuperLink = () => {
    return (
        <div className="border-input-border superlink flex flex-row rounded-md border">
            <div className="flex flex-1 flex-col">
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 flex-row items-center gap-2 overflow-hidden pr-1 pl-2 transition-colors hover:bg-[#2a333d]"
                >
                    <GenericIcon name={'FAS'} size="small" />
                    <div className="flex flex-1 flex-col justify-center overflow-hidden">
                        <span className="truncate text-[0.8rem] leading-[1.125rem] font-[400] text-[#9198A1]">
                            canal youtube 1
                        </span>
                    </div>
                </a>
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 flex-row items-center gap-2 overflow-hidden pr-1 pl-2 transition-colors hover:bg-[#2a333d]"
                >
                    <GenericIcon name={'FAS'} size="small" />
                    <div className="flex flex-1 flex-col justify-center overflow-hidden">
                        <span className="truncate text-[0.8rem] leading-[1.125rem] font-[400] text-[#9198A1]">
                            canal youtube 1
                        </span>
                    </div>
                </a>
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 flex-row items-center gap-2 overflow-hidden pr-1 pl-2 transition-colors hover:bg-[#2a333d]"
                >
                    <GenericIcon name={'FAS'} size="small" />
                    <div className="flex flex-1 flex-col justify-center overflow-hidden">
                        <span className="truncate text-[0.8rem] leading-[1.125rem] font-[400] text-[#9198A1]">
                            canal youtube 1
                        </span>
                    </div>
                </a>
            </div>

            <button
                type="button"
                className="flex w-6 cursor-pointer items-center justify-center text-[#44474b] transition-colors hover:bg-[#2a333d] hover:text-[#D1D7E0]"
            >
                <DotsThreeVerticalIcon size="1.5rem" />
            </button>
        </div>
    );
};
