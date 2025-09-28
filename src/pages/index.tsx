import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to MealMatch
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your fitness companion for healthy, delicious meals from local cooks. 
          Powered by your Tribe fitness data.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Find Local Cooks</h3>
            <p className="text-gray-600 mb-4">
              Discover verified local cooks who specialize in healthy, macro-friendly meals.
            </p>
            <Link 
              href="/cooks"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Browse Cooks →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Explore Recipes</h3>
            <p className="text-gray-600 mb-4">
              Browse nutritious meals tailored to your fitness goals and dietary preferences.
            </p>
            <Link 
              href="/recipes"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              View Recipes →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Track Your Orders</h3>
            <p className="text-gray-600 mb-4">
              Manage your meal orders and track delivery status all in one place.
            </p>
            <Link 
              href="/orders"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              My Orders →
            </Link>
          </div>
        </div>
        
        <div className="mt-12">
          <Link 
            href="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}