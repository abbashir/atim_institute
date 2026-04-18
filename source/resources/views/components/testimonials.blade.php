<section id="about-us" class="py-16 bg-cream-dark">
    <div class="max-w-7xl mx-auto px-6">

        {{-- Section Header --}}
        <div class="text-center mb-8">
            <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">প্রশংসাপত্র</span>
            <h2 class="text-3xl md:text-4xl font-bold text-[#1a4d3a] tracking-tight">দাতাদের অভিজ্ঞতা</h2>
            <div class="w-16 h-1 bg-[#c59436] mx-auto mt-4 rounded-full"></div>
        </div>

        {{-- Slider Container --}}
        <div class="swiper testimonial-slider max-w-4xl mx-auto relative">
            <div class="swiper-wrapper py-6">

                {{-- Slide 1 --}}
                <div class="swiper-slide px-2 md:px-6">
                    <div class="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/40 text-center relative overflow-hidden">
                        {{-- Background Accent --}}
                        <div class="absolute -top-4 -right-4 text-[#c59436]/5 text-9xl font-serif select-none pointer-events-none">"</div>
                        
                        <div class="relative z-10">
                            <div class="w-12 h-12 bg-[#c59436]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span class="text-[#c59436] text-2xl font-serif">"</span>
                            </div>

                            <p class="text-[#4a7a6a] italic text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                                দারুস সালাম ফাউন্ডেশন আমার যাকাত প্রদানের জন্য একটি বিশ্বস্ত মাধ্যম। তাদের হিফজ প্রোগ্রামের মাধ্যমে শিশুদের উন্নতি দেখে আমার হৃদয় আনন্দে ভরে ওঠে।
                            </p>

                            <div class="inline-block px-6 py-2 bg-[#f8faf9] rounded-full border border-gray-50">
                                <h4 class="text-[#1a4d3a] font-bold text-base">ডাঃ রাশিদ হোসেন</h4>
                                <p class="text-[#c59436] text-[10px] font-bold uppercase tracking-widest mt-0.5">নিয়মিত যাকাত দাতা</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Slide 2 --}}
                <div class="swiper-slide px-2 md:px-6">
                    <div class="bg-white rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/40 text-center relative overflow-hidden">
                        <div class="absolute -top-4 -right-4 text-[#c59436]/5 text-9xl font-serif select-none pointer-events-none">"</div>
                        
                        <div class="relative z-10">
                            <div class="w-12 h-12 bg-[#c59436]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span class="text-[#c59436] text-2xl font-serif">"</span>
                            </div>

                            <p class="text-[#4a7a6a] italic text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                                এতিম স্পনসরশিপে তাদের স্বচ্ছতা অসাধারণ। আমি যে শিশুটিকে সহায়তা করি তার সম্পর্কে নিয়মিত আপডেট পাই, যা আমাদের বন্ধনটিকে আরও গভীর করে।
                            </p>

                            <div class="inline-block px-6 py-2 bg-[#f8faf9] rounded-full border border-gray-50">
                                <h4 class="text-[#1a4d3a] font-bold text-base">সারাহ আল-মনসুর</h4>
                                <p class="text-[#c59436] text-[10px] font-bold uppercase tracking-widest mt-0.5">এতিম স্পনসর</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {{-- Swiper Pagination --}}
            <div class="swiper-pagination !-bottom-2"></div>
        </div>
    </div>
</section>

<style>
    /* Professional Swiper Customization */
    .testimonial-slider .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: #1a4d3a;
        opacity: 0.2;
        transition: all 0.3s ease;
    }
    .testimonial-slider .swiper-pagination-bullet-active {
        background: #c59436 !important;
        width: 24px;
        border-radius: 4px;
        opacity: 1;
    }
    /* Prevents CLS Layout Shift */
    .swiper-wrapper {
        align-items: center;
    }
</style>
