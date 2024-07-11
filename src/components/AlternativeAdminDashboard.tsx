import React from 'react';
import UserGrowthChart from './UserGrowthChart';
import RevenueGrowthChart from './RevenueGrowthChart';
// Import other chart components similarly...

const AlternativeAdminDashboard = () => {
    const userData = [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 80 },
        { name: 'Mar', value: 45 },
        { name: 'Apr', value: 60 },
        { name: 'May', value: 20 },
        { name: 'Jun', value: 90 },
        { name: 'Jul', value: 55 },
    ];

    const revenueData = [
        { name: 'Jan', value: 10000 },
        { name: 'Feb', value: 20000 },
        { name: 'Mar', value: 15000 },
        { name: 'Apr', value: 25000 },
        { name: 'May', value: 30000 },
        { name: 'Jun', value: 50000 },
        { name: 'Jul', value: 40000 },
    ];

    return (
        <div className="p-4 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UserGrowthChart data={userData} />
                <RevenueGrowthChart data={revenueData} />
                {/* Add other charts similarly */}
            </div>
        </div>
    );
};

export default AlternativeAdminDashboard;
