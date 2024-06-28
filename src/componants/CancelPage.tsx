import { motion } from 'framer-motion';

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">It looks like you canceled your payment. If you have any questions, please contact support.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white py-2 px-4 rounded transition duration-300"
        >
          Return to Home
        </motion.button>
      </div>
    </div>
  );
}

export default CancelPage;
