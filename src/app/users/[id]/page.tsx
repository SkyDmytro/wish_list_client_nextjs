const Page = async ({ params }: { params: { id: string } }) => {
  // const id = await params.id;
  return (
    <div
      key="user-page"
      className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-900 to-black p-8"
    >
      <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
        <h1 className="mb-6 text-3xl font-bold text-white">User Profile</h1>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gray-800"></div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                User #{params.id}
              </h2>
              <p className="text-gray-400">Member since 2024</p>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-gray-800 pt-6">
            <div className="rounded-md bg-gray-900 p-4">
              <h3 className="text-sm text-gray-400">Email</h3>
              <p className="text-white">user@example.com</p>
            </div>

            <div className="rounded-md bg-gray-900 p-4">
              <h3 className="text-sm text-gray-400">Location</h3>
              <p className="text-white">New York, USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
