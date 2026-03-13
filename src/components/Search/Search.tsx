import SearchIcon from '../../assets/images/home/search.svg?react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Search = ({ value, onChange, placeholder = 'Поиск' }: Props) => {
  return (
    <div className="flex justify-end w-full mb-[20px]">
      <label className="relative">
        <SearchIcon className="absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-afacad text-[var(--primary-text-color)] pl-[52px] w-[454px] h-[44px] rounded-[12px] bg-[var(--input-color)]"
          aria-label={placeholder}
        />
      </label>
    </div>
  );
};
