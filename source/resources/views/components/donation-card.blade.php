@props(['name', 'age', 'location', 'amount'])

<div class="bg-white rounded-[20px] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 duration-300">
    {{-- Top Section: Green Gradient with Icon --}}
    <div class="h-44 bg-gradient-to-br from-[#8db1a3] to-[#5a7d6e] relative flex items-center justify-center">
        {{-- Needs Sponsor Badge --}}
        <div class="absolute top-3 right-3 bg-[#c59436] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            স্পনসর প্রয়োজন
        </div>

        {{-- Crescent Moon Icon --}}
        <div class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-inner">
            <span class="text-[#1a4d3a] text-2xl font-bold">🌙</span>
        </div>
    </div>

    {{-- Bottom Section: Details --}}
    <div class="p-5">
        <h3 class="text-lg font-bold text-[#1a4d3a]">{{ $name }}</h3>

        <div class="mt-2 space-y-1">
            <p class="text-xs text-[#5a8a7a] flex items-center gap-2">
                <span class="opacity-70">🎂</span> বয়স: {{ $age }} বছর
            </p>
            <p class="text-xs text-[#5a8a7a] flex items-center gap-2">
                <span class="opacity-70">📍</span> {{ $location }}
            </p>
        </div>

        <div class="mt-6 flex items-center justify-between">
            <div class="text-[#c59436] font-bold">
                <span class="text-sm">৳</span><span class="text-lg">{{ number_format($amount) }}</span><span class="text-[10px] text-[#5a8a7a] font-normal">/মাস</span>
            </div>
            <button class="bg-[#c59436] hover:bg-[#b0832d] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                এখনই স্পনসর করুন
            </button>
        </div>
    </div>
</div>