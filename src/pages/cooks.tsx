import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { cooksAPI } from '@/services/api';
import { Cook } from '@/types';

export default function Cooks() {
  const router = useRouter();
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const response = await cooksAPI.getNearby();
        setCooks(response.data.cooks);
      } catch (err: any) {
        setError('Failed to load cooks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCooks();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl">Loading cooks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Local Cooks Near You</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cooks.map((cook) => (
          <div key={cook._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{cook.businessName}</h3>
                {cook.isVerified && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-yellow-500 font-semibold">★ {cook.averageRating}</div>
                <div className="text-sm text-gray-500">{cook.distance} mi</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{cook.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {cook.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-gray-500 pt-4 border-t mb-4">
              <span>{cook.totalOrders} orders</span>
              <span>~{cook.averagePrepTime} min prep</span>
            </div>

            <button
              onClick={() => router.push(`/cooks/${cook._id}`)}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}