<!-- <footer class="gradient-emerald from-[#1a4d3a] to-[#0f2e23] text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">

        {{-- Brand & About --}}
        <div class="space-y-6">
            <div class="flex items-center gap-2">
                <span class="text-[#c59436] text-xl">🌙</span>
                <h3 class="text-xl font-bold tracking-tight">দারুস সালাম <span class="text-[#c59436]">ফাউন্ডেশন</span></h3>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
                প্রতিটি এতিম শিশুর জন্য যত্ন, শিক্ষা ও একটি উজ্জ্বল ভবিষ্যৎ নিশ্চিত করতে আমরা কাজ করে যাচ্ছি। আপনার সাদাকাহ আমাদের পথচলার প্রেরণা।
            </p>
            <p class="text-[#c59436] italic text-sm leading-relaxed font-serif">
                "মুসলিমদের ঐ বাড়িই সর্বোত্তম, যে বাড়িতে এতিম আছে এবং তার সাথে ভালো ব্যবহার করা হয়।"
            </p>
        </div>

        {{-- Quick Links --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">দ্রুত লিঙ্ক</h4>
            <ul class="space-y-4 text-sm text-gray-300">
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
            <ul class="space-y-3 text-sm text-gray-300 font-medium">
                <li><span class="text-[#c59436]">ব্যাংক:</span> ইসলামী ব্যাংক বাংলাদেশ লিমিটেড</li>
                <li><span class="text-[#c59436]">অ্যাকাউন্ট নাম:</span> DHUMIHAYATPUR DARUS SALAM EATIM KHANA</li>
                <li><span class="text-[#c59436]">অ্যাকাউন্ট নং:</span> ২০৫০ ৭৭৭ ০২ ৩০১৬২৪৪৩</li>
                <li><span class="text-[#c59436]">শাখা:</span> Chapainawabganj</li>
                <li><span class="text-[#c59436]">রাউটিং:</span> ১২৫২৭০৬০৭</li>
                <li><span class="text-[#c59436]">সুইফট কোড:</span> IBBLBDDHFRD</li>
            </ul>
        </div>

        {{-- Contact & Socials --}}
        <div>
            <h4 class="font-bold text-[#c59436] mb-6 text-sm">আমাদের সাথে যুক্ত হন</h4>
            <ul class="space-y-4 text-sm text-gray-300 mb-8">
                <li class="flex items-center gap-3 italic">
                    <span class="text-xs">📧</span> dsalamfoundation@gmail.com
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-sm">📞</span> +880 0130-8601672
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-sm">📍</span> ধুমিহায়াতপুর দারুস সালাম ইয়াতিমখানা, তালতলা মোড়, রামচন্দ্রপুর হাট, চাঁপাইনবাবগঞ্জ সদর। 
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
    <div class="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center text-sm text-white font-medium uppercase tracking-[0.1em]">
        <p class="md:flex-1 md:text-center text-center text-xs md:text-sm">&copy; {{ date('Y') }} দারুস সালাম ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।</p>

        <div class="order-1 md:order-2 group mt-4 md:mt-0">
            <a href="https://bashirbd.com/" target="_blank" rel="noopener noreferrer" 
               class="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#c59436]/50 transition-all duration-500 group-hover:bg-[#c59436]/5 shadow-sm">
                
                <span class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Developed By</span>
                
                <div class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#c59436] animate-pulse"></span>
                    <span class="text-sm font-black tracking-tight text-white group-hover:text-[#c59436] transition-colors duration-300">
                        bashir<span class="text-[#c59436] group-hover:text-white transition-colors duration-300">bd</span>.com
                    </span>
                </div>
            </a>
        </div>
    </div>
</footer> -->

<footer class="gradient-emerald from-[#1a4d3a] to-[#0f2e23] text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">

            {{-- Brand & About --}}
            <div class="flex flex-col space-y-4">
                <div class="flex items-center gap-2">
                    <span class="text-[#c59436] text-2xl">🌙</span>
                    <h3 class="text-xl font-bold tracking-tight">দারুস সালাম <span class="text-[#c59436]">ফাউন্ডেশন</span></h3>
                </div>
                <p class="text-gray-300 text-[13px] leading-relaxed">
                    প্রতিটি এতিম শিশুর জন্য যত্ন, শিক্ষা ও একটি উজ্জ্বল ভবিষ্যৎ নিশ্চিত করতে আমরা কাজ করে যাচ্ছি। আপনার সাদাকাহ আমাদের পথচলার প্রেরণা।
                </p>
                <div class="pt-2 border-l-2 border-[#c59436] pl-4">
                    <p class="text-[#c59436] italic text-[12px] leading-snug font-serif">
                        "মুসলিমদের ঐ বাড়িই সর্বোত্তম, যে বাড়িতে এতিম আছে এবং তার সাথে ভালো ব্যবহার করা হয়।"
                    </p>
                </div>
            </div>

            {{-- Quick Links --}}
            <div class="lg:pl-10">
                <h4 class="font-bold text-[#c59436] mb-5 text-[14px] uppercase tracking-wider">দ্রুত লিঙ্ক</h4>
                <ul class="space-y-3 text-[13px] text-gray-300">
                    <li><a href="#about-us" class="hover:text-[#c59436] flex items-center gap-2 transition-all group"><span class="h-px w-0 group-hover:w-3 bg-[#c59436] transition-all"></span>আমাদের সম্পর্কে</a></li>
                    <li><a href="#sponsor-an-orphan" class="hover:text-[#c59436] flex items-center gap-2 transition-all group"><span class="h-px w-0 group-hover:w-3 bg-[#c59436] transition-all"></span>এতিম স্পনসর</a></li>
                    <li><a href="#donate" class="hover:text-[#c59436] flex items-center gap-2 transition-all group"><span class="h-px w-0 group-hover:w-3 bg-[#c59436] transition-all"></span>দান করুন</a></li>
                    <li><a href="#contact" class="hover:text-[#c59436] flex items-center gap-2 transition-all group"><span class="h-px w-0 group-hover:w-3 bg-[#c59436] transition-all"></span>যোগাযোগ</a></li>
                </ul>
            </div>

            {{-- Bank Details --}}
            <div>
                <h4 class="font-bold text-[#c59436] mb-5 text-[14px] uppercase tracking-wider">ব্যাংক অ্যাকাউন্ট</h4>
                <div class="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 uppercase">Account Name</span>
                        <span class="text-[12px] font-bold">DHUMIHAYATPUR DARUS SALAM EATIM KHANA</span>
                    </div>
                    <div class="flex flex-col border-t border-white/10 pt-2">
                        <span class="text-[10px] text-white-400 uppercase">A/C: <span class="text-[#c59436] font-bold">2050 777 02 30162443</span></span>
                        <span class="text-[11px] text-white-300">ইসলামী ব্যাংক বাংলাদেশ লিঃ, Chapainawabganj</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-white-400 pt-1">
                        <span>Routing: 125270607</span>
                        <span>Swift: IBBLBDDHFRD</span>
                    </div>
                </div>
            </div>

            {{-- Contact & Socials --}}
            <div class="space-y-5">
                <h4 class="font-bold text-[#c59436] text-[14px] uppercase tracking-wider">যোগাযোগ</h4>
                <ul class="space-y-3 text-[13px] text-gray-300">
                    <li class="flex items-start gap-3">
                        <span class="mt-1">📍</span>
                        <span>ধুমিহায়াতপুর দারুস সালাম ইয়াতিমখানা, তালতলা মোড়, রামচন্দ্রপুর হাট, চাঁপাইনবাবগঞ্জ সদর। </span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span>📞</span>
                        <a href="tel:+8801308601672" class="hover:text-white transition-colors">+880 0130-8601672</a>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-[#c59436] shrink-0 text-xs">📧</span>
                        <a href="mailto:dsalamfoundation@gmail.com" class="hover:text-white transition-colors truncate">dsalamfoundation@gmail.com</a>
                    </li>
                </ul>

                <div class="flex gap-2 pt-2">
                    @foreach(['F', 'T', 'Y', 'I'] as $social)
                        <a href="#" class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[12px] font-bold hover:bg-[#c59436] hover:-translate-y-1 transition-all border border-white/10">
                            {{ $social }}
                        </a>
                    @endforeach
                </div>
            </div>
        </div>

        {{-- Bottom Copyright Section --}}
        <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-[11px] md:text-[12px] text-gray-400 font-medium uppercase tracking-[0.1em] text-center md:text-left">
                &copy; {{ date('Y') }} <span class="text-white">দারুস সালাম ফাউন্ডেশন</span>। সর্বস্বত্ব সংরক্ষিত।
            </p>

            <div class="group">
                <a href="https://bashirbd.com/" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#c59436]/50 transition-all duration-500 shadow-sm">
                    <span class="text-[9px] text-white-500 uppercase tracking-widest font-bold">Developed By</span>
                    <div class="flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#c59436] animate-pulse"></span>
                        <span class="text-sm font-black tracking-tight text-white group-hover:text-[#c59436] transition-colors duration-300">
                            bashir<span class="text-[#c59436] group-hover:text-white transition-colors duration-300">bd</span>.com
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</footer>