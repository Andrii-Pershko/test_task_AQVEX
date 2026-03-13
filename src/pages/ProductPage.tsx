import { Link, useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-cyan-400">Картка товару</h1>
      <p className="text-slate-300 mb-6">
        Ця сторінка поки що порожня. ID з URL: <span className="font-mono">{id}</span>
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
      >
        Назад на головну
      </Link>
    </main>
  );
};

export default ProductPage;

