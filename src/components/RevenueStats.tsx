import D3Chart from './D3Chart';

const revenueData = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 20000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 30000 },
    { name: 'Jun', value: 50000 },
    { name: 'Jul', value: 40000 },
];

const RevenueStats = () => {
    return (
        <D3Chart data={revenueData} title="Revenue Growth" />
    );
};

export default RevenueStats;
