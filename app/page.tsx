'use client';

import { useEffect, useRef, useState } from 'react';
import InfiniteGallery from '@/components/InfiniteGallery';
import EditModal from '@/components/EditModal';
import { useIframe } from '@/components/providers/IframeProvider';
import { Edit2 } from 'lucide-react';

export default function Home() {
	const [portfolioText, setPortfolioText] = useState("I'm; Batman");
	const [images, setImages] = useState([
		{ src: '/batman1.jpg', alt: 'Batman Image 1' },
		{ src: '/batman2.jpg', alt: 'Batman Image 2' },
		{ src: '/batman3.jpg', alt: 'Batman Image 3' },
		{ src: '/batman4.jpg', alt: 'Batman Image 4' },
		{ src: '/batman5.jpg', alt: 'Batman Image 5' },
		{ src: '/batman6.jpg', alt: 'Batman Image 6' },
		{ src: '/batman7.jpg', alt: 'Batman Image 7' },
		{ src: '/batman8.jpg', alt: 'Batman Image 8' },
	]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [audioTrack, setAudioTrack] = useState<{ src: string; name?: string } | null>(
		null,
	);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [shouldAttemptPlay, setShouldAttemptPlay] = useState(false);
    const { isIframe } = useIframe();

    useEffect(() => {
        if (isIframe) {
            setPortfolioText("damnnn");
        }
    }, [isIframe]);

	const handleSave = (
		text: string,
		newImages: { src: string; alt: string }[],
		newAudio: { src: string; name?: string } | null,
	) => {
		setPortfolioText(text);
		// Clean up old blob URLs
		images.forEach((img) => {
			if (img.src.startsWith('blob:')) {
				URL.revokeObjectURL(img.src);
			}
		});
		setImages((prevImages) => (newImages.length > 0 ? newImages : prevImages));
		setAudioTrack((prevAudio) => {
			// Revoke old blob URL if needed
			if (prevAudio?.src?.startsWith('blob:')) {
				URL.revokeObjectURL(prevAudio.src);
			}
			return newAudio;
		});
		setShouldAttemptPlay(true);
	};

	useEffect(() => {
		if (!audioTrack?.src || !audioRef.current) {
			return;
		}

		const audioEl = audioRef.current;

		// Attempt to play, handling autoplay restrictions
		const tryPlay = () => {
			audioEl.play().catch(() => {
				// If autoplay is blocked, show controls briefly and notify the user via console
				audioEl.controls = true;
				console.info(
					'Audio playback was blocked by the browser. The audio controls are now visible so you can start it manually.',
				);
			});
		};

		if (shouldAttemptPlay) {
			tryPlay();
			setShouldAttemptPlay(false);
		}
	}, [audioTrack, shouldAttemptPlay]);

	useEffect(() => {
		return () => {
			// Cleanup when component unmounts
			setAudioTrack((prevAudio) => {
				if (prevAudio?.src?.startsWith('blob:')) {
					URL.revokeObjectURL(prevAudio.src);
				}
				return prevAudio;
			});
		};
	}, []);

	// Parse text to handle italic parts
	// Format: "text before semicolon; rest of text" - part before semicolon becomes italic
	const parseText = (text: string) => {
		const semicolonIndex = text.indexOf(';');
		if (semicolonIndex > 0) {
			const italicPart = text.substring(0, semicolonIndex).trim();
			const rest = text.substring(semicolonIndex + 1).trim();
			return (
				<>
					<span className="italic">{italicPart}</span>
					{rest && ` ${rest}`}
				</>
			);
		}
		// If no semicolon, check for comma pattern like "I'm, Batman"
		const commaMatch = text.match(/^(.+?),\s*(.+)$/);
		if (commaMatch) {
			return (
				<>
					<span className="italic">{commaMatch[1]}</span> {commaMatch[2]}
				</>
			);
		}
		return text;
	};

	return (
		<main className="min-h-screen">
			<InfiniteGallery
				images={images}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full rounded-lg overflow-hidden"
			/>
			<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
					{parseText(portfolioText)}
				</h1>
			</div>

			<div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold pointer-events-none">
				<p>Use mouse wheel, arrow keys, or touch to navigate</p>
				<p className="opacity-60">
					Auto-play resumes after 3 seconds of inactivity
				</p>
			</div>

			{audioTrack?.src && (
				<audio
					ref={audioRef}
					src={audioTrack.src}
					autoPlay
					loop
					preload="auto"
					controls={false}
					className="hidden"
				>
					Your browser does not support the audio element.
				</audio>
			)}

			{/* Edit Button */}
			{!isIframe && (
				<button
					onClick={() => setIsEditModalOpen(true)}
					className="fixed top-6 right-6 md:top-auto md:right-auto md:bottom-6 md:left-6 z-40 p-3 bg-(--background)/80 backdrop-blur-sm border border-(--foreground)/20 text-(--foreground)/80 hover:text-foreground hover:bg-(--foreground)/10 hover:border-(--foreground)/40 rounded-full transition-all pointer-events-auto"
					aria-label="Edit portfolio"
				>
					<Edit2 className="w-5 h-5" />
				</button>
			)}

			{/* Edit Modal */}
			<EditModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onSave={handleSave}
				currentText={portfolioText}
				currentImages={images}
				currentAudio={audioTrack}
			/>
		</main>
	);
}
