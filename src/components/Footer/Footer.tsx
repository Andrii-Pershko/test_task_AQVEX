import Logo from '../../assets/images/home/botom-logo.svg?react';
import MadeUkraine from '../../assets/images/home/made_in_ukraine.svg?react';
import MasterCard from '../../assets/images/home/mastercard.svg?react';
import Visa from '../../assets/images/home/visa.svg?react';
import ApplePay from '../../assets/images/home/apple_pay.svg?react';
import GooglePay from '../../assets/images/home/google_pay.svg?react';
import { Container } from '../Container/Container';

export const Footer = () => {
    return (
        <footer className="border-t border-[var(--border-color)] mt-[67px]">
            <Container className="flex justify-between items-center h-[80px]">
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center gap-[5px]">
                        <Logo />
                        <MadeUkraine />
                    </div>

                    <p className="text-[14px] leading-[140%] font-[400] opacity-[var(--opacity-text)]">AQVEX  ©  2026  |  Все права защищены</p>
                </div>
                <div className="flex items-center gap-[22px]">
                    <MasterCard />
                    <Visa />
                    <ApplePay />
                    <GooglePay />
                </div>
            </Container>
        </footer>
    );
};