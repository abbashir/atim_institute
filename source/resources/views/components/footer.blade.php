<footer class="gradient-emerald from-[#1a4d3a] to-[#0f2e23] text-white pt-20 pb-10">
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
        <p class="md:flex-1 md:text-center text-center">&copy; {{ date('Y') }} দারুস সালাম ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত। | ভালোবাসা ও বিশ্বাসের সাথে এতিমদের সেবা</p>
        <a href="https://bashirbd.com/" target="_blank" rel="noopener noreferrer" class="md:mt-0 mt-4">Developed By: <span class="text-[#c59436] hover:text-gray-300 transition-colors">bashirbd.com</span></a>
    </div>
</footer>