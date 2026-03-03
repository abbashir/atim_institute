<section class="py-24 bg-cream-light flex justify-center items-center" x-data="{ amount: 2500, type: 'one-time' }">
    <div class="max-w-4xl w-full px-6 text-center">
        <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Make a Donation</span>

        <h2 class="text-3xl md:text-4xl font-bold text-[#1a4d3a] mb-2">Give Sadaqah & Zakat</h2>

        <div class="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-[#c59436] via-[#1a4d3a] to-[#c59436] rounded-full"></div>

        <p class="text-gray-500 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Every contribution, no matter how small, can make a difference. Choose an amount below or enter a custom donation.
        </p>

        <div class="inline-flex bg-[#f1f3f5] p-1 rounded-xl mb-12">
            <button
                    @click="type = 'one-time'"
                    :class="type === 'one-time' ? 'bg-white shadow-sm text-[#1a4d3a]' : 'text-gray-500'"
                    class="px-10 py-2.5 rounded-lg font-bold text-sm transition-all duration-200"
            >
                One-time
            </button>
            <button
                    @click="type = 'monthly'"
                    :class="type === 'monthly' ? 'bg-white shadow-sm text-[#1a4d3a]' : 'text-gray-500'"
                    class="px-10 py-2.5 rounded-lg font-bold text-sm transition-all duration-200"
            >
                Monthly
            </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <template x-for="val in [1000, 2500, 5000]">
                <button
                        @click="amount = val"
                        :class="amount === val ? 'bg-[#c59436] text-white border-[#c59436]' : 'bg-white text-[#1a4d3a] border-gray-100'"
                        class="py-6 rounded-xl border-[1.5px] font-bold text-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    ৳<span x-text="val.toLocaleString()"></span>
                </button>
            </template>

            <button class="py-6 rounded-xl border-[1.5px] border-gray-100 bg-white text-gray-400 font-bold text-xl shadow-sm">
                Custom
            </button>
        </div>

        <div class="mt-10">
            <button class="bg-[#c59436] hover:bg-[#b0832d] text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.97] duration-300">
                Donate ৳<span x-text="amount.toLocaleString()"></span> Now
            </button>
        </div>

        <p class="mt-8 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
            All donations are Zakat & Sadaqah eligible. 100% goes to orphan care.
        </p>
    </div>
</section>