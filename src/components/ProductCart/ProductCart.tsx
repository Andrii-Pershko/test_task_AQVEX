import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVolume } from '../../store/productsSlice';
import SceletImg from '../../assets/images/home/scelet.jpg';
import DiscountIcon from '../../assets/images/home/discount.svg?react';
import StarIcon from '../../assets/images/home/blue-star.svg?react';
import GreenCheckIcon from '../../assets/images/home/green-check.svg?react';
import DripIcon from '../../assets/images/home/drip.svg?react';
import ToCartIcon from '../../assets/images/home/to_cart.svg?react';
import DownArrowIcon from '../../assets/images/home/down_arrow.svg?react';

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
            className={`cursor-pointer hover:bg-[var(--background-hover)] transition-all duration-300 px-[12px] py-[8px] rounded-[8px] w-full text-[14px] ${disabled ? 'text-[var(--gray-text-color)] cursor-not-allowed opacity-60' : 'text-[var(--primary-text-color)]'
                }`}
        >
            {volume.label}
        </p>
    );
}

export const ProductCart = ({ product }: { product: Product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [volumeDropdownOpen, setVolumeDropdownOpen] = useState(false);
    const [selectedVolumeId, setSelectedVolumeId] = useState(
        () => product.volumes[0]?.id ?? product.selected_volume_id
    );
    const volumeDropdownRef = useRef<HTMLDivElement>(null);

    const volumes = product.volumes;
    const selectedVolume = volumes.find((v) => v.id === selectedVolumeId) ?? volumes[0];
    const showVolumeDropdown = volumes.length > 1;

    useEffect(() => {
        setSelectedVolumeId(product.volumes[0]?.id ?? product.selected_volume_id);
    }, [product.id]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (volumeDropdownRef.current && !volumeDropdownRef.current.contains(e.target as Node)) {
                setVolumeDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const imageUrl =
        product.image && product.image.trim().length > 0
            ? product.image.startsWith('http')
                ? product.image
                : `${IMAGE_BASE_URL}${product.image}`
            : SceletImg;

    return (
        <li className="max-w-[450px] min-w-[347px] flex flex-col flex-1 w-auto transition-all duration-300">
            <Link to={`/product/${product.id}`} className="block cursor-pointer">
            <div className="mb-[18px] relative w-full aspect-[347/280] overflow-hidden rounded-[12px] bg-[var(--input-color)]">
                {!imageLoaded && (
                    <div
                        className="absolute inset-0 animate-pulse bg-[var(--border-color)]"
                        aria-hidden
                    />
                )}
                <img
                    className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
            <div className="mb-[32px] flex items-center gap-[8px]">
                <p className="old-price">
                    {product.old_price}
                </p>
                <p className="gradient-price text-[16px] leading-[100%]">
                    {product.price} грн
                </p>
                <p className="relative">
                    <DiscountIcon />
                    <span className="text-[14px] font-[700] absolute top-1/2 -translate-y-1/2 right-[3px] leading-[100%] text-[var(--white-text-color)]">
                        {product.discount_percent}%
                    </span>
                </p>
            </div>
            <p className="mb-[32px]">{product.name}</p>
            <div className="flex flex-1 gap-[8px] mb-[32px] items-end">
                <div className={`w-[68px]`}>
                    <div style={{ width: `${product.rating * 12}px` }} className={`flex items-center gap-[2px] overflow-hidden`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon className="shrink-0" key={i} />
                        ))}
                    </div>
                </div>
                <p className="text-[14px] leading-[100%] font-[400] [text-decoration-skip-ink:none] underline decoration-[#182a42]/10 underline-offset-4">{product.reviews_count}</p>
            </div>
            <div className="flex items-center gap-[14px] mb-[32px]">
                <div className="flex items-center gap-[8px]">
                    <GreenCheckIcon />
                    <p className=" ">{product.in_stock ? 'В наличии' : 'Нет в наличии'}</p>
                </div>
                <DripIcon />
                <p className="text-[14px] opacity-[var(--opacity-text)]">{product.category}</p>
            </div>
            </Link>

            <div className="flex items-center gap-[8px]" onClick={(e) => e.stopPropagation()}>
                {showVolumeDropdown ? (
                    <div className="relative min-w-[123px] border border-[var(--border-color)] rounded-[12px] py-[16px] pl-[20px]" ref={volumeDropdownRef}>
                        <p
                            className="relative pr-[28px] text-[16px] leading-[100%] flex items-center gap-2 cursor-pointer select-none text-[var(--primary-text-color)]"
                            onClick={() => setVolumeDropdownOpen((o) => !o)}
                        >
                            {selectedVolume.label}
                            <DownArrowIcon
                                className={`opacity-30 absolute right-[20px] top-1/2 -translate-y-1/2 transition-transform ${volumeDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </p>
                        <div
                            className={`z-10 w-full py-[12px] bg-[var(--input-color)] rounded-[12px] border border-[#43a0fd] select-none flex flex-col gap-0 absolute top-[55px] left-0 min-w-[120px] ${volumeDropdownOpen ? 'block' : 'hidden'}`}
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
                ) : null}
                <button type="button" className="bg-[var(--background-color)] hover:bg-[var(--background-hover)] transition-all duration-300 w-full flex items-center gap-[8px] justify-center py-[12px] rounded-[12px]">
                    <ToCartIcon />
                    <p>В корзину</p>
                </button>
            </div>

        </li>
    );
};