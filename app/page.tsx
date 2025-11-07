import InfiniteGallery from '@/components/InfiniteGallery';

export default function Home() {
	const sampleImages = [
		{ src: '/batman1.jpg', alt: 'Batman Image 1' },
		{ src: '/batman2.jpg', alt: 'Batman Image 2' },
		{ src: '/batman3.jpg', alt: 'Batman Image 3' },
		{ src: '/batman4.jpg', alt: 'Batman Image 4' },
		{ src: '/batman5.jpg', alt: 'Batman Image 5' },
		{ src: '/batman6.jpg', alt: 'Batman Image 6' },
		{ src: '/batman7.jpg', alt: 'Batman Image 7' },
		{ src: '/batman8.jpg', alt: 'Batman Image 8' },
	];

	return (
		<main className="min-h-screen ">
			<InfiniteGallery
				images={sampleImages}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full rounded-lg overflow-hidden"
			/>
			<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
					<span className="italic">I'm</span> Batman.
				</h1>
			</div>

			<div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
				<p>Use mouse wheel, arrow keys, or touch to navigate</p>
				<p className=" opacity-60">
					Auto-play resumes after 3 seconds of inactivity
				</p>
			</div>
		</main>
	);
}
