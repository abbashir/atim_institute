<x-layouts.app>
    {{-- 1. Navigation --}}
    @include('components.navbar')

    {{-- 2. Hero Section --}}
    @include('components.hero')

    {{-- 3. Mission / Features Section --}}
    <section class="py-24 bg-[#eef6f3] overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {{-- Left Content --}}
                <div class="lg:w-1/2">
                    <span class="text-[#c59436] font-bold tracking-[0.1em] uppercase text-sm">Our Mission</span>
                    <h2 class="text-4xl md:text-[42px] font-bold text-[#1a4d3a] mt-3 leading-tight">
                        Guided by the Quran & Sunnah
                    </h2>

                    {{-- Quote Box --}}
                    <div class="mt-8 relative p-8 bg-[#dbeae4] rounded-2xl border-l-[6px] border-[#c59436]">
                        <blockquote class="italic text-[#2d5a4a] text-lg leading-relaxed">
                            "Have you seen the one who denies the Recompense? For that is the one who drives away the orphan."
                            <span class="block mt-4 font-semibold text-sm not-italic text-[#4a7a6a]">— Surah Al-Ma'un (107:1-2)</span>
                        </blockquote>
                    </div>

                    <p class="mt-8 text-[#4a7a6a] leading-relaxed text-[17px]">
                        Our institute is dedicated to providing holistic care for orphaned children, combining Islamic education with modern learning to prepare them for a bright future. Every child deserves love, guidance, and opportunity.
                    </p>
                </div>

                {{-- Right Grid Features --}}
                <div class="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div class="p-8 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-start transition-transform hover:-translate-y-1">
                        <div class="w-14 h-14 bg-[#1e6b4e] text-white rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">Islamic Education</h3>
                        <p class="mt-3 text-sm text-[#5a8a7a] leading-relaxed">Comprehensive Islamic studies including Quran, Hadith, and Arabic language for every child.</p>
                    </div>

                    <div class="p-8 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-start transition-transform hover:-translate-y-1">
                        <div class="w-14 h-14 bg-[#1e6b4e] text-white rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">Hifz Program</h3>
                        <p class="mt-3 text-sm text-[#5a8a7a] leading-relaxed">Dedicated Hifz-ul-Quran program helping children memorize the Holy Quran with expert teachers.</p>
                    </div>

                    <div class="p-8 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-start transition-transform hover:-translate-y-1">
                        <div class="w-14 h-14 bg-[#1e6b4e] text-white rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">Food & Shelter</h3>
                        <p class="mt-3 text-sm text-[#5a8a7a] leading-relaxed">Safe, clean housing and nutritious meals ensuring every orphan lives with dignity and comfort.</p>
                    </div>

                    <div class="p-8 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-start transition-transform hover:-translate-y-1">
                        <div class="w-14 h-14 bg-[#1e6b4e] text-white rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">Moral Development</h3>
                        <p class="mt-3 text-sm text-[#5a8a7a] leading-relaxed">Character building rooted in Islamic values, nurturing compassionate and responsible individuals.</p>
                    </div>

                </div>
            </div>
        </div>
    </section>

    {{-- 4. Orphan Profiles Grid --}}
    <section class="py-24 gradient-emerald">
        <div class="max-w-7xl mx-auto px-6">
            {{-- Section Header --}}
            <div class="text-center mb-16">
                <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-xs">Sponsor An Orphan</span>
                <h2 class="text-4xl md:text-5xl font-bold text-white mt-4">Change a Life Forever</h2>
                <div class="w-24 h-1 bg-[#c59436] mx-auto mt-4 rounded-full opacity-50"></div>
                <p class="mt-6 text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
                    Choose a child to sponsor and provide them with education, food, shelter, and hope for a brighter future.
                </p>
            </div>

            {{-- Grid --}}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <x-donation-card
                        name="Yusuf Ahmed"
                        age="7"
                        location="Dhaka, Bangladesh"
                        amount="2500"
                />
                <x-donation-card
                        name="Fatima Begum"
                        age="9"
                        location="Chittagong, Bangladesh"
                        amount="2500"
                />
                <x-donation-card
                        name="Ibrahim Hassan"
                        age="5"
                        location="Sylhet, Bangladesh"
                        amount="2000"
                />
                <x-donation-card
                        name="Aisha Khatun"
                        age="11"
                        location="Rajshahi, Bangladesh"
                        amount="3000"
                />
            </div>
        </div>
    </section>

    {{-- 5. Stats Section --}}
    @include('components.stats')

    {{-- 6. Direct Donation Selector (Alpine.js Tabs) --}}
    @include('components.donation-selector')

    {{--Testimonial--}}
    @include('components.testimonials')

    {{--Contact Us --}}
    @include('components.contact-us')

    {{-- 7. Footer --}}
    @include('components.footer')

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const testimonialSwiper = new Swiper('.testimonial-slider', {
          // Options
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          // Effects
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          // Accessibility
          grabCursor: true,
        });
      });
    </script>
</x-layouts.app>