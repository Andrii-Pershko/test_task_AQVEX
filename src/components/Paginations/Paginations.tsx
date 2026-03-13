import PaginationArrow from '../../assets/images/home/pagination-arrow.svg?react';

type PageItem = number | 'ellipsis';

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
        return [1, 2, 3, 4, 'ellipsis', totalPages];
    }
    if (currentPage >= totalPages - 2) {
        return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Paginations = ({ currentPage, totalPages, onPageChange }: Props) => {
    const pageItems = getPageItems(currentPage, totalPages);
    const isFirst = currentPage <= 1;
    const isLast = currentPage >= totalPages;

    return (
        <div className="w-[408px] flex items-center justify-between mt-[31px] mx-[auto]">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirst}
                aria-label="Попередня сторінка"
                className="disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <PaginationArrow />
            </button>

            <div className="flex items-center gap-[12px]">
                {pageItems.map((item, index) =>
                    item === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onPageChange(item)}
                            aria-label={`Сторінка ${item}`}
                            aria-current={item === currentPage ? 'page' : undefined}
                            className={`min-w-[32px] p-[12px] leading-[100%] w-[46px] h-[46px] text-[16px] rounded-[12px] font-medium transition-colors text-[var(--primary-text-color)] ${item === currentPage
                                ? 'border border-[1.5px] border-[#43a0fd]'
                                : ' hover:bg-[var(--input-color)]'
                                }`}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLast}
                aria-label="Наступна сторінка"
                className="disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <PaginationArrow className="rotate-180" />
            </button>
        </div>
    );
};
