import { useNavigate } from 'react-router-dom'
function Error400() {
    let naviagate=useNavigate()
    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-500 mb-4">404!</h1>
          <p className="text-2xl text-gray-700 mb-4">SORRY, PAGE NOT FOUND</p>
          <p className="text-gray-500 mb-8">
            It will be as simple as Occidental in fact, it will Occidental to an English person
          </p>
          <button
            onClick={() => naviagate(-1)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
}

export default Error400
