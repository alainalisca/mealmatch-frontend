import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            MealMatch
          </Link>
          
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-green-200 transition">
              Home
            </Link>
            <Link href="/cooks" className="hover:text-green-200 transition">
              Cooks
            </Link>
            <Link href="/recipes" className="hover:text-green-200 transition">
              Recipes
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link href="/orders" className="hover:text-green-200 transition">
                  My Orders
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hover:text-green-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-green-200 transition">
                  Login
                </Link>
                <Link href="/register" className="hover:text-green-200 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}