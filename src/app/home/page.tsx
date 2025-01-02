import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-gray-300">SkyWishes</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Create, organize, and share your wishes with loved ones
          </p>
          <Link
            href="/login"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg 
                     transition-colors duration-200 inline-block"
          >
            Start Wishing
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            title="Create Lists"
            description="Make multiple wish lists for different occasions and categories"
            icon="✨"
          />
          <FeatureCard
            title="Share Dreams"
            description="Share your wishes with friends and family easily"
            icon="🎁"
          />
          <FeatureCard
            title="Track Gifts"
            description="Keep track of gifts and avoid duplicate presents"
            icon="📝"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-colors duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
