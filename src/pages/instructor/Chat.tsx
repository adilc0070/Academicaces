import { ChatInterface } from "../../components/Chat";

function Chat() {
    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg bg-white shadow">
                    <ChatInterface/>
                {/* <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
                </div> */}
            </div>
        </div>
    );
}

export default Chat
