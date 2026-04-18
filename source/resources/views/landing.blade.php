<x-layouts.app>
    {{-- 1. Navigation --}}
    @include('components.navbar')

    {{-- 2. Hero Section --}}
    @include('components.hero')

    {{-- 3. Mission / Features Section --}}
    <section id="our-mission" class="py-16 bg-[#fdfbf7] overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {{-- Left Content --}}
                <div class="lg:w-5/12 space-y-6">
                    <div>
                        <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-[10px] block mb-2">আমাদের লক্ষ্য</span>
                        <h2 class="text-3xl md:text-4xl font-bold text-[#1a4d3a] leading-tight tracking-tight">
                            কুরআন ও সুন্নাহর নির্দেশনায় <br class="hidden md:block"> সেবা ও শিক্ষা
                        </h2>
                        <div class="w-16 h-1 bg-[#c59436] mt-4 rounded-full"></div>
                    </div>

                    {{-- Quote Box - Refined --}}
                    <div class="relative p-6 md:p-8 bg-[#1a4d3a]/5 rounded-[32px] border-l-4 border-[#c59436]">
                        <blockquote class="italic text-[#1a4d3a] text-base md:text-lg leading-relaxed">
                            "আপনি কি তাকে দেখেছেন, যে বিচার দিবসকে অস্বীকার করে? সে তো সেই ব্যক্তি যে এতিমকে গলা ধাক্কা দেয়।"
                            <footer class="block mt-4 font-bold text-[11px] not-italic text-[#4a7a6a] uppercase tracking-widest">
                                — সূরা আল-মাউন (১০৭:১-২)
                            </footer>
                        </blockquote>
                    </div>

                    <p class="text-[#4a7a6a] leading-relaxed text-[15px] md:text-base font-medium opacity-90">
                        আমাদের প্রতিষ্ঠানটি এতিম শিশুদের সামগ্রিক যত্ন প্রদানের জন্য নিবেদিত, যেখানে তাদের উজ্জ্বল ভবিষ্যতের জন্য ইসলামিক শিক্ষার সাথে আধুনিক শিক্ষার সমন্বয় করা হয়েছে।
                    </p>
                </div>

                {{-- Right Grid Features --}}
                <div class="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

                    {{-- Feature 1 --}}
                    <div class="group p-8 bg-white rounded-[28px] border border-gray-100 shadow-xl shadow-gray-200/40 transition-all hover:border-[#c59436]/30">
                        <div class="w-12 h-12 bg-[#1a4d3a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#1a4d3a]/20 group-hover:-translate-y-1 transition-transform">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">ইসলামিক শিক্ষা</h3>
                        <p class="mt-2 text-sm text-[#5a8a7a] leading-relaxed">কুরআন, হাদিস এবং আরবি ভাষাসহ ব্যাপক ইসলামিক শিক্ষার সমন্বয়।</p>
                    </div>

                    {{-- Feature 2 --}}
                    <div class="group p-8 bg-white rounded-[28px] border border-gray-100 shadow-xl shadow-gray-200/40 transition-all hover:border-[#c59436]/30">
                        <div class="w-12 h-12 bg-[#1a4d3a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#1a4d3a]/20 group-hover:-translate-y-1 transition-transform">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">হিফজ প্রোগ্রাম</h3>
                        <p class="mt-2 text-sm text-[#5a8a7a] leading-relaxed">দক্ষ শিক্ষকদের মাধ্যমে নিবেদিত হিফজ-উল-কুরআন প্রোগ্রাম।</p>
                    </div>

                    {{-- Feature 3 --}}
                    <div class="group p-8 bg-white rounded-[28px] border border-gray-100 shadow-xl shadow-gray-200/40 transition-all hover:border-[#c59436]/30">
                        <div class="w-12 h-12 bg-[#1a4d3a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#1a4d3a]/20 group-hover:-translate-y-1 transition-transform">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">খাদ্য ও বাসস্থান</h3>
                        <p class="mt-2 text-sm text-[#5a8a7a] leading-relaxed">মর্যাদা ও আরামের সাথে নিরাপদ আবাসন এবং পুষ্টিকর খাবার নিশ্চিতকরণ।</p>
                    </div>

                    {{-- Feature 4 --}}
                    <div class="group p-8 bg-white rounded-[28px] border border-gray-100 shadow-xl shadow-gray-200/40 transition-all hover:border-[#c59436]/30">
                        <div class="w-12 h-12 bg-[#1a4d3a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#1a4d3a]/20 group-hover:-translate-y-1 transition-transform">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-[#1a4d3a]">নৈতিক উন্নয়ন</h3>
                        <p class="mt-2 text-sm text-[#5a8a7a] leading-relaxed">ইসলামিক মূল্যবোধের ভিত্তিতে সহমর্মী মানুষ হিসেবে গড়ে তোলা।</p>
                    </div>

                </div>
            </div>
        </div>
    </section>

    {{-- 4. Orphan Profiles Grid --}}
    <section id="sponsor-an-orphan" class="py-16 gradient-emerald">
        <div class="max-w-7xl mx-auto px-6">
            {{-- Section Header --}}
            <div class="text-center mb-16">
                <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-xs">একটি এতিম শিশুকে স্পনসর করুন</span>
                <h2 class="text-4xl md:text-5xl font-bold text-white mt-4">চিরতরে একটি জীবন বদলে দিন</h2>
                <div class="w-24 h-1 bg-[#c59436] mx-auto mt-4 rounded-full opacity-50"></div>
                <p class="mt-6 text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
                    স্পনসর করার জন্য একটি শিশু বেছে নিন এবং তাদের শিক্ষা, খাদ্য, বাসস্থান এবং একটি উজ্জ্বল ভবিষ্যতের আশা প্রদান করুন।
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