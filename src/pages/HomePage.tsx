import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/productsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, items } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">AQVEX Products</h1>
      <p className="mb-4 text-sm text-slate-300">
        Перехід на головну сторінку виконує один запит до API і логування
        результату в консоль.
      </p>

      {loading && <p className="text-slate-200">Завантаження товарів...</p>}
      {error && <p className="text-red-400">Помилка: {error}</p>}

      {!loading && !error && items.length > 0 && (
        <p className="text-sm text-slate-400 mb-4">
          Отримано товарів: {items.length} (дані дивись у консолі браузера).
        </p>
      )}

      <Link
        to="/product/1"
        className="mt-6 inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
      >
        Перейти до картки товару
      </Link>
    </main>
  );
};

export default HomePage;

