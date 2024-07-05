import { useState, useEffect, ChangeEvent } from 'react';
import { initSocket } from '../utils/socket';
import { findID, findInstructors } from '../services/student/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { findInstructorId, findStudents } from '../services/instructor/api';

interface User {
    _id: string;
    name?: string;
    userName?: string;
    profilePicture?: string;
}

interface Message {
    text: string;
    sender: string;
    receiver: string;
    timestamp: string;
    isSender: boolean;
}

interface UserListProps {
    users: User[];
    onlineUsers: string[];
    onSelectUser: (user: User) => void;
}

interface ChatBoxProps {
    user: User | null;
    userId: string;
    socket: any;
}

const getUserId = async (email: string): Promise<string> => {
    try {
        if (window.location.pathname.includes('instructor')) {
            return await findInstructorId(email);
        } else {
            return await findID(email);
        }
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return '';
    }
};

const UserList = ({ users, onlineUsers, onSelectUser }: UserListProps) => {
    return (
        <div className="w-1/4 bg-gray-900 text-white p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">
                {window.location.pathname.includes('instructor') ? 'Students' : 'Instructors'}
            </h2>
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-700 flex items-center"
                        onClick={() => onSelectUser(user)}
                    >
                        <img
                            src={user.profilePicture ? user.profilePicture : `https://ui-avatars.com/api/?name=${user.name ? user.name : user.userName}&background=random`}
                            alt={user.name ? user.name : user.userName}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="flex-grow">{user.name ? user.name : user.userName}</span>
                        {onlineUsers.includes(user._id) && <span className="ml-2 text-green-500">●</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ChatBox = ({ user, userId, socket }: ChatBoxProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (user) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/messages?sender=${userId}&receiver=${user._id}`);
                    const data = await response.json()
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };
            fetchMessages();
            socket.on("newMessage", (newMessage: Message) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off("newMessage");
            };
        }
    }, [user, userId, socket]);

    const sendMessage = () => {
        if (!user) return;

        const newMessage: Message = {
            text: message,
            sender: userId,
            receiver: user._id,
            timestamp: new Date().toLocaleTimeString(),
            isSender: true
        };

        socket.emit("sendMessage", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    };

    return (
        <div className="w-3/4 p-4 flex flex-col bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
            {user ? (
                <>
                    <div className="flex items-center justify-between mb-4 p-2 border-b border-gray-200 bg-gray-100 rounded-t-lg">
                        <h2 className="text-xl font-bold">{user.name ? user.name : user.userName}</h2>
                        {/* Add User Status */}
                        <span className="text-sm text-gray-500">Online</span>
                    </div>
                    <div className="flex-grow p-4 bg-white rounded-lg overflow-y-auto">
                        <div className="flex flex-col space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs ${msg.isSender ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        <p>{msg.text}</p>
                                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white p-2 rounded-r-lg shadow-md hover:bg-blue-600 transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-xl text-gray-500">Select a user to start chatting</p>
            )}
        </div>
    );
};

const fetchChatUsers = async (id: string): Promise<User[]> => {
    try {
        if (window.location.pathname.includes('instructor')) {
            return await findStudents(id);
        } else {
            return await findInstructors(id);
        }
    } catch (error) {
        console.error("Error fetching chat users:", error);
        return [];
    }
};

export const ChatInterface = () => {
    const [userId, setUserId] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const studentEmail = useSelector((state: RootState) => state.student.email);
    const instructorEmail = useSelector((state: RootState) => state.instructor.email);
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const email = window.location.pathname.includes('instructor') ? instructorEmail : studentEmail;
        getUserId(email).then((result) => {
            setUserId(result);
        });
    }, [studentEmail, instructorEmail]);

    useEffect(() => {
        if (userId) {
            const socketInstance = initSocket(userId);
            setSocket(socketInstance);
            fetchChatUsers(userId).then((result) => {
                setUsers(result);
            });

            socketInstance.on("onlineStatus", (onlineUsers: string[]) => {
                setOnlineUsers(onlineUsers);
            });

            return () => {
                socketInstance.disconnect();
            };
        }
    }, [userId]);

    return (
        <div className="flex max-h-full bg-gray-100">
            <UserList users={users} onlineUsers={onlineUsers} onSelectUser={setSelectedUser} />
            {socket && <ChatBox user={selectedUser} userId={userId} socket={socket} />}
        </div>
    );
};
