// components/WhatsAppFloat.tsx
export default function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/905555555555"
            target="_blank"
            className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-105 transition"
            aria-label="WhatsApp"
        >
            <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M. . ."/></svg>
        </a>
    );
}