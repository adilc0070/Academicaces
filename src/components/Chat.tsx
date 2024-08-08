import { useState, useEffect, ChangeEvent } from 'react';
import { initSocket } from '../utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { findInstructorId, findStudents } from '../services/instructor/api';
import { findID, findInstructors } from '../services/student/api';
import { Socket } from 'socket.io-client';

interface User {
    _id: string;
    name?: string;
    userName?: string;
    profilePicture?: string;
    email?: string;
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
    socket: Socket;
    isInstructor: boolean;
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

const UserList = ({ users, onlineUsers, onSelectUser }: UserListProps) => {
    return (
        <div className="w-1/4 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-2 rounded-full bg-gray-700 text-white focus:outline-none"
                />
            </div>
            <ul>
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-700 flex items-center"
                        onClick={() => onSelectUser(user)}
                    >
                        <img
                            src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name || user.userName}&background=random`}
                            alt={user.name || user.userName}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <span className="font-bold">{user.name || user.userName}</span>
                            <p className="text-sm text-gray-400">Hey, How are you?</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                            {onlineUsers.includes(user._id) && (
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            )}
                            <span className="text-sm text-gray-500">12 min</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ChatBox = ({ user, userId, socket, isInstructor }: ChatBoxProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isVideoCallActive, setIsVideoCallActive] = useState(false);
    const [videoCallLink, setVideoCallLink] = useState('');

    useEffect(() => {
        if (user) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/messages?sender=${userId}&receiver=${user._id}`);
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };
            fetchMessages();

            socket.on("newMessage", (newMessage: Message) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
            socket.on("videoCallStarted", (link: string) => {
                setIsVideoCallActive(true);
                setVideoCallLink(link);
            });

            socket.on("videoCallEnded", () => {
                setIsVideoCallActive(false);
                setVideoCallLink('');
            });

            return () => {
                socket.off("newMessage");
                socket.off("videoCallStarted");
                socket.off("videoCallEnded");
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
            isSender: true,
        };

        socket.emit("sendMessage", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    };

    const startVideoCall = () => {
        if (!user) return;

        const roomName = `ChatWith${user.name || user.userName}`;
        const domain = "meet.jit.si";
        const options = {
            roomName,
            width: '100%',
            height: 600,
            parentNode: document.querySelector('#video-call-container') as HTMLElement,
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
            },
            configOverwrite: {
                disableSimulcast: false,
            },
            userInfo: {
                displayName: user.name || user.userName,
                email: user.email || '',
                avatarURL: user.profilePicture || `https://ui-avatars.com/api/?name=${user.name || user.userName}&background=random`,
            },
        };

        socket.emit("startVideoCall", { roomName });
        const JitsiMeetExternalAPI = (window as any).JitsiMeetExternalAPI;
        const api = new JitsiMeetExternalAPI(domain, options);
        console.log(api);
        
        setIsVideoCallActive(true);
        setVideoCallLink(`https://meet.jit.si/${roomName}`);
        // Send video call link as a message
        const videoCallMessage: Message = {
            text: `Join the video call: https://meet.jit.si/${roomName}`,
            sender: userId,
            receiver: user._id,
            timestamp: new Date().toLocaleTimeString(),
            isSender: true,
        };
        socket.emit("sendMessage", videoCallMessage);
        setMessages((prevMessages) => [...prevMessages, videoCallMessage]);
    };

    const joinVideoCall = () => {
        if (!videoCallLink) return;

        const roomName = videoCallLink.split('/').pop();
        const JitsiMeetExternalAPI = (window as any).JitsiMeetExternalAPI;
        const api = new JitsiMeetExternalAPI("meet.jit.si", {
            roomName,
            width: '100%',
            height: 600,
            parentNode: document.querySelector('#video-call-container') as HTMLElement,
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
            },
            configOverwrite: {
                disableSimulcast: false,
            },
            userInfo: {
                displayName: user?.name || user?.userName || '',
                email: user?.email || '',
                avatarURL: user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name || user?.userName}&background=random`,
            },
        });
        console.log(api)
        
    };

    const renderMessage = (msg: Message) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = msg.text.split(urlRegex);

        return parts.map((part, index) =>
            urlRegex.test(part) ? (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {part}
                </a>
            ) : (
                part
            )
        );
    };

    return (
        <div className="w-3/4 p-4 flex flex-col h-screen bg-white">
            {user ? (
                <>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <img
                                src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name || user.userName}&background=random`}
                                alt={user.name || user.userName}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{user.name || user.userName}</h2>
                                <p className="text-sm text-gray-500">Stay at home, Stay safe</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            {isInstructor && !isVideoCallActive && (
                                <button className="text-gray-500 hover:text-gray-800" onClick={startVideoCall}>
                                    <i className="fas fa-video"></i>
                                </button>
                            )}
                            {!isInstructor && isVideoCallActive && (
                                <button className="text-gray-500 hover:text-gray-800" onClick={joinVideoCall}>
                                    Join Now
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-xs ${msg.isSender ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}>
                                        <p>{renderMessage(msg)}</p>
                                        <span className="text-xs text-gray-400">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-500 text-white p-2 rounded-r-lg shadow-md hover:bg-blue-600 transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                    <div id="video-call-container"></div>
                </>
            ) : (
                <p className="text-xl text-gray-500">Select a user to start chatting</p>
            )}
        </div>
    );
};

export const ChatInterface = () => {
    const [userId, setUserId] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const studentEmail = useSelector((state: RootState) => state.student.email);
    const instructorEmail = useSelector((state: RootState) => state.instructor.email);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isInstructor, setIsInstructor] = useState<boolean>(false);

    useEffect(() => {
        const email = window.location.pathname.includes('instructor') ? instructorEmail : studentEmail;
        getUserId(email).then((result) => {
            setUserId(result);
            setIsInstructor(window.location.pathname.includes('instructor'));
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
        <div className="flex h-screen bg-gray-100">
            <UserList users={users} onlineUsers={onlineUsers} onSelectUser={setSelectedUser} />
            {socket && <ChatBox user={selectedUser} userId={userId} socket={socket} isInstructor={isInstructor} />}
        </div>
    );
};
