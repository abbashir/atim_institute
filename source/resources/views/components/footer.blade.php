<footer class="gradient-emerald from-[#1a4d3a] to-[#0f2e23] text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">

        {{-- Brand & About --}}
        <div class="space-y-6">
            <div class="flex items-center gap-2">
                <span class="text-[#c59436] text-xl">🌙</span>
                <h3 class="text-xl font-bold tracking-tight">Al-Yateem <span class="text-[#c59436]">Foundation</span></h3>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
                Serving orphans with Islamic education, shelter, and compassion for over 20 years. Your Zakat and Sadaqah make it possible.
            </p>
            <p class="text-[#c59436] italic text-xs leading-relaxed font-serif">
                "The best house among the Muslims is one in which an orphan is well-treated."
            </p>
        </div>

        {{-- Quick Links --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">Quick Links</h4>
            <ul class="space-y-4 text-xs text-gray-300">
                <li><a href="#" class="hover:text-[#c59436] transition-colors">About Us</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">Our Mission</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">Sponsor an Orphan</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">Programs</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">Donate</a></li>
                <li><a href="#" class="hover:text-[#c59436] transition-colors">Contact</a></li>
            </ul>
        </div>

        {{-- Bank Details --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">Bank Account</h4>
            <ul class="space-y-3 text-[11px] text-gray-300 font-medium">
                <li><span class="text-[#c59436]">Bank:</span> Islami Bank Bangladesh</li>
                <li><span class="text-[#c59436]">Account:</span> Darus Salam Foundation</li>
                <li><span class="text-[#c59436]">A/C No:</span> 2050-1234-5678-90</li>
                <li><span class="text-[#c59436]">Branch:</span> Motijheel, Dhaka</li>
                <li><span class="text-[#c59436]">Routing:</span> 125-261-325</li>
            </ul>
        </div>

        {{-- Contact & Socials --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">Connect With Us</h4>
            <ul class="space-y-4 text-xs text-gray-300 mb-8">
                <li class="flex items-center gap-3 italic">
                    <span class="text-xs">📧</span> info@alyateem.org
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-xs">📞</span> +880 1700-000-000
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-xs">📍</span> Dhaka, Bangladesh
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
        <p>&copy; {{ date('Y') }} Darus Salam Foundation. All rights reserved. | Serving Orphans with Love & Faith</p>
    </div>
</footer>