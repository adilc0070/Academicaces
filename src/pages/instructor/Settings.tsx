import { useState } from 'react';
import InstructorLayout from '../../components/InstructorsLayout';
import DashBoardNavBar from '../../components/DashBoardNavBar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import CourseList from './courseList'; 
import { ChatInterface } from '../../components/Chat';


function Settings() {
    const [currentView, setCurrentView] = useState('Dashboard');

    const renderView = () => {
        switch (currentView) {
            case 'Profile':
                return <Profile />;
            case 'Messages':
                return <ChatInterface />;
            case 'Courses':
                return <CourseList />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <InstructorLayout>
            <div className="min-h-screen ">
                <DashBoardNavBar setCurrentView={setCurrentView} />
                <div className="max-w-screen-2xl mx-auto py-4 sm:px-2 lg:px-2">
                    {renderView()}
                </div>
            </div>
        </InstructorLayout>
    );
}

export default Settings
