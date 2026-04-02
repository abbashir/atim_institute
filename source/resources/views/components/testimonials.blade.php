<section class="py-24 bg-cream-dark">
    <div class="max-w-7xl mx-auto px-6">

        {{-- Section Header --}}
        <div class="text-center mb-12">
            <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Testimonials</span>
            <h2 class="text-3xl md:text-4xl font-bold text-[#1a4d3a]">Words from Our Donors</h2>
            <div class="w-16 h-1 bg-[#c59436] mx-auto mt-4 rounded-full"></div>
        </div>

        {{-- Slider Container --}}
        <div class="swiper testimonial-slider max-w-3xl mx-auto">
            <div class="swiper-wrapper py-10">

                <div class="swiper-slide px-4">
                    <div class="bg-white rounded-[20px] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center relative">
                        <div class="text-[#c59436] text-4xl mb-6 font-serif">"</div>

                        <p class="text-[#4a7a6a] italic text-lg leading-relaxed mb-8">
                            Darus Salam Foundation has been a trusted channel for my Zakat contributions. Seeing the children flourish through their Hifz program fills my heart with joy.
                        </p>

                        <div class="space-y-1">
                            <h4 class="text-[#1a4d3a] font-bold text-lg">Dr. Rashid Hossain</h4>
                            <p class="text-[#c59436] text-xs font-medium uppercase tracking-widest">Regular Zakat Donor</p>
                        </div>
                    </div>
                </div>

                <div class="swiper-slide px-4">
                    <div class="bg-white rounded-[20px] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center relative">
                        <div class="text-[#c59436] text-4xl mb-6 font-serif">"</div>

                        <p class="text-[#4a7a6a] italic text-lg leading-relaxed mb-8">
                            Their transparency in orphan sponsorship is remarkable. I receive regular updates about the child I support, which makes the bond feel very real.
                        </p>

                        <div class="space-y-1">
                            <h4 class="text-[#1a4d3a] font-bold text-lg">Sarah Al-Mansur</h4>
                            <p class="text-[#c59436] text-xs font-medium uppercase tracking-widest">Orphan Sponsor</p>
                        </div>
                    </div>
                </div>

            </div>

            {{-- Optional: Pagination dots to match the clean UI --}}
            <div class="swiper-pagination !-bottom-2"></div>
        </div>
    </div>
</section>

<style>
    /* Customizing Swiper pagination colors to match your brand */
    .testimonial-slider .swiper-pagination-bullet-active {
        background: #c59436 !important;
    }
</style>