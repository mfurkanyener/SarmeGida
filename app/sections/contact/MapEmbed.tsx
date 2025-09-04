// components/MapEmbed.tsx
export default function MapEmbed() {
    return (
        <div className="w-full overflow-hidden rounded-xl border">
            <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                loading="lazy"
                className="h-[320px] w-full"
            />
        </div>
    );
}