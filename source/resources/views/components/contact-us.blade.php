<section class="py-24 bg-cream-light flex justify-center items-center">
    <div class="max-w-4xl w-full px-6">

        {{-- Section Header --}}
        <div class="text-center mb-10">
            <span class="text-[#c59436] font-bold tracking-[0.2em] uppercase text-[10px] mb-2 block">Get in Touch</span>
            <h2 class="text-3xl md:text-4xl font-bold text-[#1a4d3a] mb-2">Contact Us</h2>
            {{-- Decorative Gradient Line --}}
            <div class="w-24 h-1 mx-auto bg-gradient-to-r from-[#c59436] via-[#1a4d3a] to-[#c59436] rounded-full"></div>
        </div>

        {{-- Contact Form Card --}}
        <div class="bg-white rounded-[20px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
            <form action="#" method="POST" class="space-y-6">
                @csrf

                {{-- Name Field --}}
                <div class="space-y-2">
                    <label for="name" class="block text-sm font-bold text-[#1a4d3a]">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name"
                           class="w-full bg-[#f8fdfb] border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]/10 focus:border-[#1a4d3a] transition-all placeholder:text-gray-300">
                </div>

                {{-- Email Field --}}
                <div class="space-y-2">
                    <label for="email" class="block text-sm font-bold text-[#1a4d3a]">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email"
                           class="w-full bg-[#f8fdfb] border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]/10 focus:border-[#1a4d3a] transition-all placeholder:text-gray-300">
                </div>

                {{-- Message Field --}}
                <div class="space-y-2">
                    <label for="message" class="block text-sm font-bold text-[#1a4d3a]">Message</label>
                    <textarea id="message" name="message" rows="5" placeholder="How can we help you?"
                              class="w-full bg-[#f8fdfb] border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]/10 focus:border-[#1a4d3a] transition-all placeholder:text-gray-300 resize-none"></textarea>
                </div>

                {{-- Submit Button --}}
                <div class="pt-4">
                    <button type="submit"
                            class="w-full bg-[#c59436] hover:bg-[#b0832d] text-white py-5 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] duration-300">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>