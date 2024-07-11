import React from 'react';
import UserGrowthChart from './UserGrowthChart';
import RevenueGrowthChart from './RevenueGrowthChart';
import PieChart from './PieChart';
import RibbonChart from './RibbonChart';
import ForceDirectedGraph from './ForceDirectedGraph';

const AdminDashboard = () => {
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

    const pieData = [
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
    ];

    const ribbonData = [
        [0, 0, 2, 3, 4],
        [0, 0, 2, 3, 4],
        [2, 2, 0, 0, 0],
        [3, 3, 0, 0, 0],
        [4, 4, 0, 0, 0],
    ];

    const forceData = {
        nodes: [
            { id: 'A' },
            { id: 'B' },
            { id: 'C' },
            { id: 'D' },
        ],
        links: [
            { source: 'A', target: 'B', value: 1 },
            { source: 'B', target: 'C', value: 1 },
            { source: 'C', target: 'D', value: 1 },
            { source: 'D', target: 'A', value: 1 },
        ]
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <UserGrowthChart data={userData} />
                <UserGrowthChart data={revenueData} /> */}
                fixxees     \
            </div>
        </div>
    );
};

export default AdminDashboard;
