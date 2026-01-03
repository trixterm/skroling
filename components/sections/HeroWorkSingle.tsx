'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroWorkSingleProps {
	heroImage: string;
	title?: string;
}

export default function HeroWorkSingle({ heroImage, title = "Work" }: HeroWorkSingleProps) {
	const containerRef = useRef(null);
	const imageWrapperRef = useRef(null);
	const imageRef = useRef(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			let mm = gsap.matchMedia();

			mm.add("(min-width: 992px)", () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "+=1500",
						pin: true,
						scrub: true,
						anticipatePin: 1,
					}
				});

				tl.to(imageWrapperRef.current, {
					scale: 0.85,
					ease: "none"
				}, 0)
				.to(imageRef.current, {
					borderRadius: "40px",
					ease: "none"
				}, 0);
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="relative w-full h-[400px] md:h-svh overflow-hidden max-md:px-[15px] max-md:mt-24">
			<div ref={imageWrapperRef} className="relative h-full flex items-center justify-center">
				<div ref={imageRef} className="relative w-full h-full overflow-hidden">
					<Image
						src={heroImage}
						alt={title}
						fill
						className="object-cover max-md:rounded-[16px]"
						priority
					/>
				</div>
			</div>
		</section>
	);
}