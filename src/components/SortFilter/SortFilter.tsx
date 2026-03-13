import { useState } from 'react';
import FilterIcon from '../../assets/images/home/filter-arrow.svg?react';
import DownArrowIcon from '../../assets/images/home/down_arrow.svg?react';

export type SortOption = 'popularity' | 'price_asc' | 'price_desc';

const SORT_LABELS: Record<SortOption, string> = {
  popularity: 'По популярности',
  price_asc: 'От дешевших',
  price_desc: 'От дорогих',
};

type Props = {
  totalCount: number;
  value: SortOption;
  onChange: (option: SortOption) => void;
};

const OPTION_ORDER: SortOption[] = ['popularity', 'price_asc', 'price_desc'];

export const SortFilter = ({ totalCount, value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center mb-[23px]">
      <p className="text-[var(--primary-text-color)] opacity-[var(--opacity-text)] text-[16px]">
        {totalCount} товарів
      </p>
      <div className="flex items- justify-end gap-[10px] relative min-w-[182px]">
        <FilterIcon />
        <div className="relative min-w-[182px]">
          <p
            className="relative pr-[28px] text-[16px] leading-[100%] flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {SORT_LABELS[value]}
            <DownArrowIcon
              className={`opacity-30 absolute right-[0px] top-1/2 -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}
            />
          </p>
          <div
            className={`z-10 w-full py-[12px] bg-[var(--input-color)] rounded-[12px] select-none flex items-center gap-2 flex-col absolute top-[25px] left-0 ${isOpen ? 'block' : 'hidden'}`}
          >
            {OPTION_ORDER.map((option) => (
              <p
                key={option}
                className="cursor-pointer hover:bg-[var(--background-hover)] transition-all duration-300 px-[12px] py-[8px] rounded-[8px] w-full"
                onClick={() => handleSelect(option)}
              >
                {SORT_LABELS[option]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
