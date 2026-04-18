<nav
        x-data="{ scrolled: false, mobileMenuOpen: false }"
        @scroll.window="scrolled = (window.pageYOffset > 50)"
        class="fixed top-0 w-full z-50 transition-all duration-300 font-cairo">
    <!-- <div
        x-show="!scrolled"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-full"
        class="gradient-emerald text-white py-2 px-6 border-b border-white-400 hidden md:block">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <p class="text-[13px] italic font-light font-amiri">
                "I and the one who cares for an orphan will be in Paradise like this."
                <span class="text-yellow-500 ml-1">– Prophet Muhammad (SAW)</span>
            </p>
            <a href="#" class="bg-[#c59436] hover:bg-[#b0832d] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2 transition duration-300">
                <span class="text-[10px]">🌙</span> Donate Zakat / Sadaqah
            </a>
        </div>
    </div> -->

    <div
            :class="scrolled ? 'bg-primary backdrop-blur-lg py-5 shadow-xl' : 'bg-primary py-5'"
            class="text-white px-6 transition-all duration-300 border-b border-white/5"
    >
        <div class="max-w-7xl mx-auto flex justify-between items-center">

            <div class="flex items-center gap-2">
                <a href="/" class="flex items-center gap-2">
                    <div class="text-[#c59436] text-2xl">🌙</div>
                    <div class="font-bold text-xl tracking-tight">
                        দারুস সালাম <span class="text-[#c59436]">ফাউন্ডেশন</span>
                    </div>
                </a>
            </div>

            <div class="hidden lg:flex items-center space-x-8 text-[12px] font-medium uppercase tracking-wider">
                @php
                    $links = [
                        'home' => 'হোম',
                        'about-us' => 'আমাদের সম্পর্কে',
                        'our-mission' => 'আমাদের লক্ষ্য',
                        'sponsor-an-orphan' => 'এতিম স্পনসর',
                        'programs' => 'প্রোগ্রামসমূহ',
                        'donate' => 'দান করুন',
                        'contact' => 'যোগাযোগ'
                    ];
                @endphp
                @foreach($links as $id => $label)
                    <a href="#{{ $id }}" class="text-white/80 hover:text-yellow-400 transition-colors">{{ $label }}</a>
                @endforeach
            </div>

            <div class="flex items-center gap-4">
                <a href="#" class="hidden md:block bg-[#c59436] hover:bg-[#b0832d] text-white px-6 py-2.5 rounded font-bold text-sm transition duration-300 shadow-md">
                    এখনই দান করুন
                </a>

                <button
                        @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden p-2 text-white hover:text-yellow-500 focus:outline-none"
                >
                    <svg x-show="!mobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    <svg x-show="mobileMenuOpen" x-cloak class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
    </div>

    <div
            x-show="mobileMenuOpen"
            x-cloak
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 -translate-y-5"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 -translate-y-5"
            class="lg:hidden bg-emerald-deep/95 backdrop-blur-xl border-t border-white/10"
    >
        <div class="px-6 py-8 space-y-4">
            @foreach($links as $id => $label)
                <a @click="mobileMenuOpen = false" href="#{{ $id }}" class="block text-lg font-medium text-white/90 hover:text-yellow-400 border-b border-white/5 pb-2">{{ $label }}</a>
            @endforeach
            <div class="pt-4">
                <a href="#" class="block w-full text-center bg-[#c59436] text-white py-4 rounded-xl font-bold">এখনই দান করুন</a>
            </div>
        </div>
    </div>
</nav>

{{--<nav class="w-full z-50">--}}
{{--    <div class="gradient-emerald text-white py-2 px-6 border-b border-white/10">--}}
{{--        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">--}}
{{--            <p class="text-[13px] md:text-sm italic font-light text-center md:text-left">--}}
{{--                "I and the one who cares for an orphan will be in Paradise like this."--}}
{{--                <span class="text-yellow-500 ml-1">– Prophet Muhammad (SAW)</span>--}}
{{--            </p>--}}
{{--            <a href="#" class="bg-[#c59436] hover:bg-[#b0832d] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2 transition duration-300">--}}
{{--                <span class="text-[10px]">🌙</span> Donate Zakat / Sadaqah--}}
{{--            </a>--}}
{{--        </div>--}}
{{--    </div>--}}

{{--    <div class="sticky top-0 bg-primary text-white px-6 py-4 shadow-lg">--}}
{{--        <div class="max-w-7xl mx-auto flex justify-between items-center">--}}

{{--            <div class="flex items-center gap-2">--}}
{{--                <div class="text-[#c59436] text-2xl">🌙</div>--}}
{{--                <div class="font-bold text-xl tracking-tight">--}}
{{--                    Al-Yateem <span class="text-[#c59436]">Foundation</span>--}}
{{--                </div>--}}
{{--            </div>--}}

{{--            <div class="hidden lg:flex items-center space-x-8 text-[13px] font-medium uppercase tracking-wider">--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">Home</a>--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">About Us</a>--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">Our Mission</a>--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">Sponsor an Orphan</a>--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">Programs</a>--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">Donate</a>--}}
{{--                <a href="#" class="hover:text-yellow-400 transition">Contact</a>--}}
{{--            </div>--}}

{{--            <a href="#" class="bg-[#c59436] hover:bg-[#b0832d] text-white px-6 py-2.5 rounded font-bold text-sm transition duration-300 shadow-md">--}}
{{--                Donate Now--}}
{{--            </a>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--</nav>--}}