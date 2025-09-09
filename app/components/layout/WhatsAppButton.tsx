// components/WhatsAppButton.tsx
'use client';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/905543794589?text=Merhaba%20SarMez%20iletişime%20geçmek%20istiyorum." // kendi numaran
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center
                 w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500 text-white
                 shadow-lg hover:bg-green-600 transition"
            aria-label="WhatsApp ile iletişime geç"
        >
            <FaWhatsapp size={28} className="md:size-32" />
        </a>
    );
}