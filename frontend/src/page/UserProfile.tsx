import { useEffect, useState } from 'react';

interface IUser {
    id: string
    name: string
    email: string
    avatar: string | undefined
}

const UserProfile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                setUser({
                    id: String(Date.now()),
                    avatar: undefined,
                    email: "test@test.com",
                    name: "test"
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;

    if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">{error}</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <img
                        src={user?.avatar ?? 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">{user?.name || 'User Name'}</h2>
                    <p className="text-gray-600 mt-2">ID: {user?.id || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
