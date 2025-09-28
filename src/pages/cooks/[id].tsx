import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { cooksAPI } from '@/services/api';

interface Cook {
  _id: string;
  businessName: string;
  description: string;
  specialties: string[];
  averageRating: number;
  totalOrders: number;
  averagePrepTime: number;
  isVerified: boolean;
  userId: {
    firstName: string;
    lastName: string;
    location: {
      city: string;
      state: string;
    };
  };
}

export default function CookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cook, setCook] = useState<Cook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCook();
    }
  }, [id]);

  const fetchCook = async () => {
    try {
      const response = await cooksAPI.getCook(id as string);
      setCook(response.data.cook);
    } catch (error) {
      console.error('Error fetching cook:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl">Loading cook...</p>
      </div>
    );
  }

  if (!cook) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-xl">Cook not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="mb-6 text-green-600 hover:text-green-700"
      >
        ← Back to Cooks
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{cook.businessName}</h1>
            {cook.isVerified && (
              <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                ✓ Verified Cook
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-500">★ {cook.averageRating}</div>
            <p className="text-sm text-gray-500">{cook.totalOrders} orders</p>
          </div>
        </div>

        <p className="text-gray-600 mb-6 text-lg">{cook.description}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {cook.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Details</h3>
            <div className="space-y-2 text-gray-600">
              <p>📍 Location: {cook.userId?.location?.city}, {cook.userId?.location?.state}</p>
              <p>⏱️ Average Prep Time: {cook.averagePrepTime} minutes</p>
              <p>📦 Total Orders: {cook.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <button
            onClick={() => router.push('/recipes')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Browse Their Recipes
          </button>
        </div>
      </div>
    </div>
  );
}