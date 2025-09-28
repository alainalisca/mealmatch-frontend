import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { recipesAPI } from '@/services/api';
import { Recipe } from '@/types';

export default function Recipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipesAPI.getAll();
        setRecipes(response.data.recipes);
      } catch (err: any) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl">Loading recipes...</p>
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
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Available Recipes</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
                <span className="text-green-600 font-bold text-lg">${recipe.basePrice}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
              
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-500 mb-1">
                  by <span className="font-semibold">{recipe.cookId.businessName}</span>
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-500">★ {recipe.averageRating}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{recipe.reviewCount} reviews</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{recipe.prepTime} min</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Calories:</span>
                  <span className="font-semibold ml-1">{recipe.nutrition.calories}</span>
                </div>
                <div>
                  <span className="text-gray-500">Protein:</span>
                  <span className="font-semibold ml-1">{recipe.nutrition.protein}g</span>
                </div>
                <div>
                  <span className="text-gray-500">Carbs:</span>
                  <span className="font-semibold ml-1">{recipe.nutrition.carbohydrates}g</span>
                </div>
                <div>
                  <span className="text-gray-500">Fat:</span>
                  <span className="font-semibold ml-1">{recipe.nutrition.fat}g</span>
                </div>
              </div>
              
              {recipe.dietaryTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.dietaryTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => router.push(`/recipes/${recipe._id}`)}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}