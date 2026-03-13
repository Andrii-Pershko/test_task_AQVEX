import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { Container } from '../components/Container/Container';
import SceletImg from '../assets/images/home/scelet.jpg';
import DiscountIcon from '../assets/images/home/discount.svg?react';
import StarIcon from '../assets/images/home/blue-star.svg?react';
import GreenCheckIcon from '../assets/images/home/green-check.svg?react';
import DripIcon from '../assets/images/home/drip.svg?react';
import ToCartIcon from '../assets/images/home/to_cart.svg?react';
import DownArrowIcon from '../assets/images/home/down_arrow.svg?react';
import type { Product, ProductVolume } from '../store/productsSlice';

const IMAGE_BASE_URL = 'https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/images/';

function VolumeOption({
  volume,
  onSelect,
}: {
  volume: ProductVolume;
  onSelect: () => void;
}) {
  const disabled = !volume.in_stock;
  return (
    <p
      role="option"
      onClick={disabled ? undefined : onSelect}
      className={`cursor-pointer hover:bg-[var(--background-hover)] transition-all duration-300 px-[12px] py-[8px] rounded-[8px] w-full text-[14px] ${
        disabled
          ? 'text-[var(--gray-text-color)] cursor-not-allowed opacity-60'
          : 'text-[var(--primary-text-color)]'
      }`}
    >
      {volume.label}
    </p>
  );
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { items } = useAppSelector((state) => state.products);
  const product = items.find((p) => p.id === id);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [volumeDropdownOpen, setVolumeDropdownOpen] = useState(false);
  const [selectedVolumeId, setSelectedVolumeId] = useState(
    () => product?.volumes[0]?.id ?? product?.selected_volume_id ?? ''
  );
  const volumeDropdownRef = useRef<HTMLDivElement>(null);

  const volumes = product?.volumes ?? [];
  const selectedVolume = volumes.find((v) => v.id === selectedVolumeId) ?? volumes[0];
  const showVolumeDropdown = volumes.length > 1;

  useEffect(() => {
    if (product) {
      setSelectedVolumeId(product.volumes[0]?.id ?? product.selected_volume_id);
    }
  }, [product?.id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        volumeDropdownRef.current &&
        !volumeDropdownRef.current.contains(e.target as Node)
      ) {
        setVolumeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!product) {
    return (
      <main>
        <Container className="py-10">
          <p className="text-[var(--primary-text-color)] opacity-[var(--opacity-text)] mb-4">
            Товар не знайдено
          </p>
          <Link
            to="/"
            className="text-[16px] text-[var(--primary-text-color)] underline hover:no-underline"
          >
            Повернутися на головну
          </Link>
        </Container>
      </main>
    );
  }

  const imageUrl =
    product.image && product.image.trim().length > 0
      ? product.image.startsWith('http')
        ? product.image
        : `${IMAGE_BASE_URL}${product.image}`
      : SceletImg;

  return (
    <main>
      <Container className="py-8">
        <Link
          to="/"
          className="inline-block text-[14px] text-[var(--primary-text-color)] opacity-[var(--opacity-text)] hover:opacity-100 mb-8"
        >
          ← На головну
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Картка товару — зображення та основна інфа */}
          <div className="flex-shrink-0 w-full max-w-[450px]">
            <div className="mb-6 relative w-full aspect-[347/280] overflow-hidden rounded-[12px] bg-[var(--input-color)]">
              {!imageLoaded && (
                <div
                  className="absolute inset-0 animate-pulse bg-[var(--border-color)]"
                  aria-hidden
                />
              )}
              <img
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                src={imageUrl}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                onError={(event) => {
                  if (event.currentTarget.src !== SceletImg) {
                    event.currentTarget.src = SceletImg;
                  } else {
                    setImageLoaded(true);
                  }
                }}
              />
            </div>

            <div className="mb-6 flex items-center gap-[8px]">
              <p className="old-price">{product.old_price}</p>
              <p className="gradient-price text-[16px] leading-[100%]">
                {product.price} {product.currency}
              </p>
              <div className="relative">
                <DiscountIcon />
                <span className="text-[14px] font-[700] absolute top-1/2 -translate-y-1/2 right-[3px] leading-[100%] text-[var(--white-text-color)]">
                  {product.discount_percent}%
                </span>
              </div>
            </div>

            <h1 className="text-[20px] leading-[1.3] text-[var(--primary-text-color)] mb-6 font-medium">
              {product.name}
            </h1>

            <div className="flex gap-[8px] mb-6 items-center">
              <div className="w-[68px]">
                <div
                  style={{ width: `${product.rating * 12}px` }}
                  className="flex items-center gap-[2px] overflow-hidden"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon className="shrink-0" key={i} />
                  ))}
                </div>
              </div>
              <p className="text-[14px] leading-[100%] font-[400] underline decoration-[#182a42]/10 underline-offset-4">
                {product.reviews_count} відгуків
              </p>
            </div>

            <div className="flex items-center gap-[14px] mb-6">
              <div className="flex items-center gap-[8px]">
                <GreenCheckIcon />
                <p>{product.in_stock ? 'В наличии' : 'Нет в наличии'}</p>
              </div>
              <DripIcon />
              <p className="text-[14px] opacity-[var(--opacity-text)]">
                {product.category}
              </p>
            </div>

            <div className="flex items-center gap-[8px] flex-wrap">
              {showVolumeDropdown ? (
                <div
                  className="relative min-w-[123px] border border-[var(--border-color)] rounded-[12px] py-[16px] pl-[20px]"
                  ref={volumeDropdownRef}
                >
                  <p
                    className="relative pr-[28px] text-[16px] leading-[100%] flex items-center gap-2 cursor-pointer select-none text-[var(--primary-text-color)]"
                    onClick={() => setVolumeDropdownOpen((o) => !o)}
                  >
                    {selectedVolume?.label}
                    <DownArrowIcon
                      className={`opacity-30 absolute right-[20px] top-1/2 -translate-y-1/2 transition-transform ${
                        volumeDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </p>
                  <div
                    className={`z-10 w-full py-[12px] bg-[var(--input-color)] rounded-[12px] border border-[var(--border-color)] select-none flex flex-col absolute top-[55px] left-0 min-w-[120px] ${
                      volumeDropdownOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {volumes.map((volume) => (
                      <VolumeOption
                        key={volume.id}
                        volume={volume}
                        onSelect={() => {
                          if (volume.in_stock) {
                            setSelectedVolumeId(volume.id);
                            setVolumeDropdownOpen(false);
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                selectedVolume && (
                  <span className="text-[16px] text-[var(--primary-text-color)]">
                    {selectedVolume.label}
                  </span>
                )
              )}
              <button
                type="button"
                className="bg-[var(--background-color)] hover:bg-[var(--background-hover)] transition-all duration-300 flex items-center gap-[8px] justify-center py-[12px] px-6 rounded-[12px]"
              >
                <ToCartIcon />
                <p>В корзину</p>
              </button>
            </div>
          </div>

          {/* Розширений опис */}
          <div className="flex-1 min-w-0">
            <section className="rounded-[12px] bg-[var(--input-color)] p-6 lg:p-8">
              <h2 className="text-[18px] font-medium text-[var(--primary-text-color)] mb-4">
                Опис товару
              </h2>
              <p className="text-[16px] leading-[1.5] text-[var(--primary-text-color)] opacity-90 mb-6">
                {product.name} — товар категорії «{product.category}». Рейтинг{' '}
                {product.rating} з 5 на основі {product.reviews_count} відгуків.
                {product.in_stock
                  ? ' Товар є в наявності та готовий до відправки.'
                  : ' На даний момент товар відсутній у наявності.'}
              </p>
              <dl className="space-y-3 text-[14px]">
                <div className="flex gap-2">
                  <dt className="text-[var(--gray-text-color)] min-w-[120px]">
                    Категорія:
                  </dt>
                  <dd className="text-[var(--primary-text-color)]">
                    {product.category}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[var(--gray-text-color)] min-w-[120px]">
                    Рейтинг:
                  </dt>
                  <dd className="text-[var(--primary-text-color)]">
                    {product.rating} / 5 ({product.reviews_count} відгуків)
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[var(--gray-text-color)] min-w-[120px]">
                    Наявність:
                  </dt>
                  <dd className="text-[var(--primary-text-color)]">
                    {product.in_stock ? 'Є в наявності' : 'Немає в наявності'}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[var(--gray-text-color)] min-w-[120px]">
                    Доступні обʼєми:
                  </dt>
                  <dd className="text-[var(--primary-text-color)]">
                    {volumes.map((v) => v.label).join(', ')}
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductPage;
