<nav
    x-data="{ scrolled: false, mobileMenuOpen: false }"
    @scroll.window="scrolled = (window.pageYOffset > 50)"
    class="fixed top-0 w-full z-50 transition-all duration-500 font-cairo">

    <div
        :class="scrolled ? 'bg-primary backdrop-blur-md py-3 shadow-2xl' : 'bg-primary py-3 md:py-5'"
        class="text-white px-6 transition-all duration-300"
    >
        <div class="max-w-7xl mx-auto flex justify-between items-center">

            {{-- Logo Section --}}
            <div class="flex items-center gap-2">
                <a href="/" class="flex items-center gap-2 group">
                    <div class="text-[#c59436] text-2xl transition-transform group-hover:scale-110">🌙</div>
                    <div class="font-bold text-xl tracking-tight leading-none">
                        দারুস সালাম <span class="text-[#c59436]">ফাউন্ডেশন</span>
                    </div>
                </a>
            </div>

            {{-- Desktop Navigation --}}
            <div class="hidden lg:flex items-center space-x-6 text-[12px] font-bold uppercase tracking-[0.1em]">
                @php
                    $links = [
                        'home' => 'হোম',
                        'about-us' => 'আমাদের সম্পর্কে',
                        'our-mission' => 'আমাদের লক্ষ্য',
                        'sponsor-an-orphan' => 'এতিম স্পনসর',
                        'programs' => 'প্রভাব',
                        'donate' => 'দান করুন',
                        'contact' => 'যোগাযোগ'
                    ];
                @endphp
                @foreach($links as $id => $label)
                    <a href="#{{ $id }}" class="text-white/70 hover:text-[#c59436] transition-colors duration-300 relative group">
                        {{ $label }}
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c59436] transition-all duration-300 group-hover:w-full"></span>
                    </a>
                @endforeach
            </div>

            {{-- CTA & Mobile Toggle --}}
            <div class="flex items-center gap-4">
                <a href="#donate" class="hidden md:block bg-[#c59436] hover:bg-[#b0832d] text-white px-5 py-2.5 rounded-lg font-black text-[12px] uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#c59436]/20 active:scale-95">
                    এখনই দান করুন
                </a>

                <button
                    @click="mobileMenuOpen = !mobileMenuOpen"
                    class="lg:hidden p-2 text-white hover:text-[#c59436] transition-colors focus:outline-none"
                >
                    <svg x-show="!mobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    <svg x-show="mobileMenuOpen" x-cloak class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>
    </div>

    {{-- Mobile Menu (Transparent Border Removed) --}}
    <div
        x-show="mobileMenuOpen"
        x-cloak
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 -translate-y-full"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-200"
        class="lg:hidden bg-primary shadow-2xl overflow-hidden"
    >
        <div class="px-6 py-8 space-y-1">
            @foreach($links as $id => $label)
                <a @click="mobileMenuOpen = false" href="#{{ $id }}" 
                   class="block py-3 px-4 rounded-xl text-base font-bold text-white/80 hover:text-white hover:bg-white/5 transition-all">
                    {{ $label }}
                </a>
            @endforeach
            <div class="pt-6 px-4">
                <a href="#donate" @click="mobileMenuOpen = false" class="block w-full text-center bg-[#c59436] text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg">
                    এখনই দান করুন
                </a>
            </div>
        </div>
    </div>
</nav>
