import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-6">Hungry? We Deliver.</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                UniDeliver connects students with campus shops for fast, reliable delivery by fellow students.
            </p>
            <div className="space-x-4">
                <Link to="/register?role=student" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                    Order Now
                </Link>
                <Link to="/register?role=runner" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
                    Become a Runner
                </Link>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-bold mb-2">For Students</h3>
                    <p className="text-gray-600">Browse menus from your favorite campus spots and get food delivered to your dorm.</p>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-bold mb-2">For Runners</h3>
                    <p className="text-gray-600">Earn money in your free time by delivering orders to fellow students.</p>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-xl">
                    <h3 className="text-xl font-bold mb-2">For Shops</h3>
                    <p className="text-gray-600">Expand your reach on campus and manage orders efficiently.</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
