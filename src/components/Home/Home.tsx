import { useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '../../store/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ProductCart } from '../ProductCart/ProductCart';
import { Paginations } from '../Paginations/Paginations';
import { Search } from '../Search/Search';
import { SortFilter, type SortOption } from '../SortFilter/SortFilter';
import type { Product } from '../../store/productsSlice';

const PER_PAGE = 12;

function sortProducts(items: Product[], sortBy: SortOption): Product[] {
    const copy = [...items];
    switch (sortBy) {
        case 'price_asc':
            return copy.sort((a, b) => a.price - b.price);
        case 'price_desc':
            return copy.sort((a, b) => b.price - a.price);
        case 'popularity':
        default:
            return copy.sort((a, b) => {
                const byRating = b.rating - a.rating;
                if (byRating !== 0) return byRating;
                return b.reviews_count - a.reviews_count;
            });
    }
}

const Home = () => {
    const dispatch = useAppDispatch();
    const { loading, error, items } = useAppSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('popularity');

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return items;
        return items.filter((item) => item.name.toLowerCase().includes(query));
    }, [items, searchQuery]);

    const sortedItems = useMemo(
        () => sortProducts(filteredItems, sortBy),
        [filteredItems, sortBy]
    );

    const totalPages = Math.max(1, Math.ceil(sortedItems.length / PER_PAGE));
    const start = (currentPage - 1) * PER_PAGE;
    const paginatedItems = sortedItems.slice(start, start + PER_PAGE);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [totalPages, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortBy]);

    return (
        <main>
            <Search value={searchQuery} onChange={setSearchQuery} />
            <SortFilter
                totalCount={sortedItems.length}
                value={sortBy}
                onChange={setSortBy}
            />

            {loading && !error && <p className="text-center text-2xl font-bold">Завантаження товарів...</p>}
            {error && <p className="text-center text-2xl font-bold">Помилка при завантаженні товарів</p>}
            {!loading && !error && items.length > 0 && sortedItems.length === 0 && (
                <p className="text-center text-[var(--primary-text-color)] opacity-[var(--opacity-text)]">За запитом нічого не знайдено</p>
            )}
            {!loading && !error && sortedItems.length > 0 && (
                <>
                    <ul className="flex flex-wrap gap-[20px] gap-y-[60px] justify-center md:justify-between">
                        {paginatedItems.map((item) => (
                            <ProductCart key={item.id} product={item} />
                        ))}
                    </ul>
                    {totalPages > 1 && (
                        <Paginations
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}


        </main >
    );
};


export default Home;
