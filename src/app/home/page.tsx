import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-sky-300">SkyWishes</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Create, organize, and share your wishes with loved ones
          </p>
          <Link
            href="/login"
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-lg 
                     transition-colors duration-200 inline-block"
          >
            Start Wishing
          </Link>
        </div>

        {/* Features Grid */}
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
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-sky-200">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}
