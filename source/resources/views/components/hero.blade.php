<section id="home" class="relative min-h-[650px] md:min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden">
    {{-- Background Image & Overlays --}}
    <div class="absolute inset-0 z-0">
        <img src="/images/hero-bg.jpg" class="w-full h-full object-cover" alt="Orphan children smiling">
        {{-- Deepened overlay for better text contrast --}}
        <div class="absolute inset-0 bg-green-950/80 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#1a4d3a] via-transparent to-green-950/60"></div>
    </div>

    {{-- Content Container --}}
    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {{-- Floating Icon --}}
        <div class="mb-8 animate-bounce transition-all duration-1000">
            <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                <span class="text-[#c59436] text-3xl">🌙</span>
            </div>
        </div>

        {{-- Main Heading --}}
        <h1 class="text-4xl md:text-7xl font-black text-white leading-[1.15] tracking-tight w-full">
            একটি এতিম শিশুকে <span class="text-[#c59436]">সহায়তা করুন</span><br>
            <span class="text-white/90">সাদাকাহ জারিয়াহ অর্জন করুন</span>
        </h1>

        {{-- Description --}}
        <p class="mt-8 text-base md:text-xl text-gray-200 max-w-3xl leading-relaxed font-medium opacity-90 px-2">
            আপনার যাকাত এবং সাদাকাহ একটি এতিম শিশুর জীবন বদলে দিতে পারে। <br class="hidden md:block"> তাদের শিক্ষা, বাসস্থান এবং আশায় ভরা ভবিষ্যৎ নিশ্চিত করুন।
        </p>

        {{-- Quranic Quote - Glassmorphism Style --}}
        <div class="mt-10 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full inline-block">
            <p class="text-xs md:text-sm text-yellow-500/90 italic font-medium tracking-wide">
                "তারা আল্লাহর ভালোবাসায় অভাবগ্রস্ত, এতিম ও বন্দীদের খাবার দান করে।" — কুরআন ৭৬:৮
            </p>
        </div>

        {{-- Action Buttons --}}
        <div class="mt-12 flex flex-col sm:flex-row justify-center items-center gap-5 w-full sm:w-auto">
            <a href="#donate" class="group w-full sm:w-auto bg-[#c59436] hover:bg-[#b0832d] text-white px-12 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-[#c59436]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <span>যাকাত দিন</span>
                <span class="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#donate" class="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-[#1a4d3a] text-white px-12 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl">
                মাসিক স্পনসর
            </a>
        </div>
    </div>

    {{-- Bottom Wave --}}
    <div class="absolute -bottom-[1px] left-0 right-0 leading-[0] pointer-events-none">
        <svg viewBox="0 0 1440 120" class="w-full h-auto fill-[#fdfbf7]" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
    </div>
</section>