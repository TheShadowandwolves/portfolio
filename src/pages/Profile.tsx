import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    createdAt?: Date;
}

interface Message {
    id: string;
    text: string;
    createdAt: Date;
}

export default function Profile() {
    const user = auth.currentUser;
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserProfile({ uid: user.uid, email: user.email || '', ...userDoc.data() } as UserProfile);
                }

                const messagesQuery = query(
                    collection(db, 'messages'),
                    where('userId', '==', user.uid)
                );
                const messagesSnapshot = await getDocs(messagesQuery);
                const messagesData = messagesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                } as Message));

                setMessages(messagesData);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            {userProfile && (
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    {userProfile.photoURL && (
                        <img
                            src={userProfile.photoURL}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4"
                        />
                    )}
                    <p className="text-lg">
                        <strong>Name:</strong> {userProfile.displayName || 'N/A'}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {userProfile.email}
                    </p>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Messages ({messages.length})</h2>
            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="bg-gray-100 rounded-lg p-4">
                        <p>{msg.text}</p>
                        <p className="text-sm text-gray-600 mt-2">
                            {msg.createdAt?.toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}