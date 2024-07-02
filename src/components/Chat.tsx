import { useState, useEffect } from 'react';
import { initSocket } from '../utils/socket';
import { findID, findInstructors } from '../services/student/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { findInstructorId, findStudents } from '../services/instructor/api';

const getUserId = async (email: string) => {
    if (window.location.pathname.includes('instructor')) {
        return await findInstructorId(email);
    } else {
        return await findID(email);
    }
}

interface User {
    _id: string;
    name?: string;
    userName?: string;
    profilePicture?: string;
}

interface UserListProps {
    users: User[];
    onSelectUser: (user: User) => void;
}

const UserList = ({ users, onSelectUser }: UserListProps) => {
    console.log(users);
    
    return (
        <div className="w-1/4 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-700 flex items-center"
                        onClick={() => onSelectUser(user)}
                    >
                        <img
                            src={user.profilePicture ? user.profilePicture : `https://ui-avatars.com/api/?name=${user.name? user.name : user.userName }&background=random`}
                            alt={user.name ? user.name : user.userName}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        {user.name ? user.name : user.userName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface ChatBoxProps {
    user: User | null;
}

const ChatBox = ({ user }: ChatBoxProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ user: string; text: string; timestamp: string }[]>([]);

    const sendMessage = () => {
        if (!user) return;

        const newMessage = {
            user: user.name? user.name : user.userName,
            text: message,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    };

    return (
        <div className="w-3/4 p-4 flex flex-col">
            {user ? (
                <>
                    <h2 className="text-xl font-bold mb-4">Chat with {user.name? user.name : user.userName}</h2>
                    <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-white flex flex-col">
                        <div className="flex flex-col space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`self-${msg.user === user.name ? 'end' : 'start'}`}>
                                    <div className="bg-gray-200 p-2 rounded">
                                        <p>{msg.text}</p>
                                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-grow p-2 border rounded-l-lg"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white p-2 rounded-r-lg"
                        >
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-xl">Select a user to start chatting</p>
            )}
        </div>
    );
};

const fetchChatUsers = async (id: string) => {
    if (window.location.pathname.includes('instructor')) {
        return await findStudents(id);
    } else {
        return await findInstructors(id);
    }
}

export const ChatInterface = () => {
    const [userId, setUserId] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const studentEmail = useSelector((state: RootState) => state.student.email);
    const instructorEmail = useSelector((state: RootState) => state.instructor.email);

    useEffect(() => {
        const email = window.location.pathname.includes('instructor') ? instructorEmail : studentEmail;
        getUserId(email).then((result) => {
            setUserId(result);
        });
    }, [studentEmail, instructorEmail]);

    useEffect(() => {
        if (userId) {
            initSocket(userId);
            fetchChatUsers(userId).then((result) => {
                setUsers(result);
            });
        }
    }, [userId]);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <UserList users={users} onSelectUser={setSelectedUser} />
            <ChatBox user={selectedUser} />
        </div>
    );
};
