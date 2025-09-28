import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { recipesAPI, ordersAPI } from '@/services/api';
import { Recipe } from '@/types';

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await recipesAPI.getRecipe(id as string);
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setOrderLoading(true);
    try {
      const itemPrice = recipe?.basePrice || 0;
      const itemTotal = itemPrice * quantity;
      
      await ordersAPI.createOrder({
        cookId: recipe?.cookId._id,
        items: [
          {
            recipeId: recipe?._id,
            recipeName: recipe?.name,
            quantity: quantity,
            unitPrice: itemPrice,
            totalPrice: itemTotal,
          },
        ],
        subtotal: itemTotal,
        totalAmount: itemTotal,
        deliveryAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          instructions: 'Leave at door',
        },
        specialInstructions: '',
      });
      
      alert('Order placed successfully!');
      router.push('/orders');
    } catch (error: any) {
      console.log('=== ORDER ERROR DETAILS ===');
      console.log('Error object:', error);
      console.log('Response data:', error.response?.data);
      console.log('==========================');
      
      const errorMessage = error.response?.data?.message || 'Failed to place order';
      alert(errorMessage);
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-xl">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => router.back()}
        className="mb-6 text-green-600 hover:text-green-700"
      >
        ← Back to Recipes
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                by <span className="font-semibold">{recipe.cookId.businessName}</span>
              </p>
              <div className="flex items-center gap-3">
                <span className="text-yellow-500">★ {recipe.averageRating}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{recipe.reviewCount} reviews</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{recipe.prepTime} min</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold mb-3">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Calories</p>
                  <p className="font-semibold">{recipe.nutrition.calories}</p>
                </div>
                <div>
                  <p className="text-gray-500">Protein</p>
                  <p className="font-semibold">{recipe.nutrition.protein}g</p>
                </div>
                <div>
                  <p className="text-gray-500">Carbs</p>
                  <p className="font-semibold">{recipe.nutrition.carbohydrates}g</p>
                </div>
                <div>
                  <p className="text-gray-500">Fat</p>
                  <p className="font-semibold">{recipe.nutrition.fat}g</p>
                </div>
              </div>
            </div>

            {recipe.dietaryTags.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Dietary Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.dietaryTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                      {tag.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-6">
              ${recipe.basePrice}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold">
                Total: ${(recipe.basePrice * quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleOrder}
              disabled={orderLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {orderLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}