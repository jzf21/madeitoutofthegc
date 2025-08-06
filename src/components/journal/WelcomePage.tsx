import { User } from 'lucide-react'; // Assuming this is the correct import
import paperbackground from '../../assets/paperbackground.jpg'

interface Collage {
    created_at: string;
    // Add other properties that might exist in your collages
}

interface WelcomePageProps {
    username: string;
    collages: Collage[];
}

export const renderWelcomePage = (username: string, collages: Collage[]): JSX.Element => (
    <div className="w-full h-full bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] relative overflow-hidden px-5">
        {/* Paper texture overlay */}
           <div className=" absolute inset-0 opacity-70 bg-gradient-to-br ">
            <img src={paperbackground} alt="Paper Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-[#EBE8DF]/20 to-[#E9E9DF]/20"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-[#F0B46B]/20 to-[#E87851]/20 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-[#266267]/20 to-[#24424D]/20 rounded-full"></div>
        </div>

        <div className="relative z-10 p-12 h-full flex flex-col justify-center">
            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <User className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold text-[#24424D] mb-4 capitalize">{username}'s</h1>
                <h2 className="text-3xl font-bold text-[#266267] mb-6">Travel Journal</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-[#F0B46B] to-[#E87851] mx-auto rounded-full mb-8"></div>
            </div>

            <div className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-xl text-[#283F45] leading-relaxed italic">
                    "Every journey begins with a single step, and every story deserves to be told."
                </p>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#E3E1DD] shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-[#266267] mb-2">{collages.length}</div>
                            <div className="text-[#283F45]/70 text-sm uppercase tracking-wide">Travel Stories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#F0B46B] mb-2">
                                {new Set(collages.map((c) => new Date(c.created_at).getFullYear())).size}
                            </div>
                            <div className="text-[#283F45]/70 text-sm uppercase tracking-wide">Years Traveling</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#E87851] mb-2">∞</div>
                            <div className="text-[#283F45]/70 text-sm uppercase tracking-wide">Memories Made</div>
                        </div>
                    </div>
                </div>

                <p className="text-[#283F45]/80 leading-relaxed cedarville-cursive text-lg mt-8">
                    Welcome to my personal collection of travel adventures. Each page in this journal represents a unique
                    journey, filled with discoveries, experiences, and memories that have shaped my understanding of the world.
                    Turn the pages to explore these stories with me.
                </p>
            </div>

            {/* Navigation hint */}
            <div className="absolute bottom-8 right-8 text-[#283F45]/50 text-sm">
                <p>Turn the page to begin →</p>
            </div>
        </div>
    </div>
);