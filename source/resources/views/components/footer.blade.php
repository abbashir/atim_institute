<footer class="gradient-emerald from-[#1a4d3a] to-[#0f2e23] text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">

        {{-- Brand & About --}}
        <div class="space-y-6">
            <div class="flex items-center gap-2">
                <span class="text-[#c59436] text-xl">🌙</span>
                <h3 class="text-xl font-bold tracking-tight">আল-ইয়াতীম <span class="text-[#c59436]">ফাউন্ডেশন</span></h3>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
                ২০ বছরেরও বেশি সময় ধরে ইসলামী শিক্ষা, আশ্রয় এবং সহমর্মিতার সাথে এতিমদের সেবা করছি। আপনার যাকাত ও সাদাকাহ এটি সম্ভব করছে।
            </p>
            <p class="text-[#c59436] italic text-xs leading-relaxed font-serif">
                "মুসলিমদের মধ্যে সেই বাড়িটিই সর্বোত্তম যেখানে কোনো এতিমকে ভালো ব্যবহার করা হয়।"
            </p>
        </div>

        {{-- Quick Links --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">দ্রুত লিঙ্ক</h4>
            <ul class="space-y-4 text-xs text-gray-300">
                <li><a href="#" class="hover:text-[#c59436] transition-colors">আমাদের সম্পর্কে</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">আমাদের লক্ষ্য</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">এতিম স্পনসর</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">প্রোগ্রামসমূহ</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">দান করুন</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">যোগাযোগ</a></li>
            </ul>
        </div>

        {{-- Bank Details --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">ব্যাংক অ্যাকাউন্ট</h4>
            <ul class="space-y-3 text-[11px] text-gray-300 font-medium">
                <li><span class="text-[#c59436]">ব্যাংক:</span> ইসলামী ব্যাংক বাংলাদেশ</li>
                <li><span class="text-[#c59436]">অ্যাকাউন্ট:</span> দারুস সালাম ফাউন্ডেশন</li>
                <li><span class="text-[#c59436]">এ/সি নং:</span> ২০৫০-১২৩৪-৫৬৭৮-৯০</li>
                <li><span class="text-[#c59436]">শাখা:</span> মতিঝিল, ঢাকা</li>
                <li><span class="text-[#c59436]">রাউটিং:</span> ১২৫-২৬১-৩২৫</li>
            </ul>
        </div>

        {{-- Contact & Socials --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">আমাদের সাথে যুক্ত হন</h4>
            <ul class="space-y-4 text-xs text-gray-300 mb-8">
                <li class="flex items-center gap-3 italic">
                    <span class="text-xs">📧</span> info@alyateem.org
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-xs">📞</span> +880 1700-000-000
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-xs">📍</span> ঢাকা, বাংলাদেশ
                </li>
            </ul>

            {{-- Social Icons --}}
            <div class="flex gap-3">
                @foreach(['F', 'T', 'Y', 'I'] as $social)
                    <a href="#" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] hover:bg-[#c59436] transition-all border border-white/10">
                        {{ $social }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>

    {{-- Bottom Copyright --}}
    <div class="max-w-7xl mx-auto px-6 pt-8 text-center text-[10px] text-gray-500 font-medium uppercase tracking-[0.1em]">
        <p>&copy; {{ date('Y') }} দারুস সালাম ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত। | ভালোবাসা ও বিশ্বাসের সাথে এতিমদের সেবা</p>
    </div>
</footer>