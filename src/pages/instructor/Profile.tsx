import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchData } from "../../utils/api";

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  verified?: boolean;
}

interface FetchDataResult {
  userDetails: UserDetails;
  myCourses: Array<{ _id: string }>; // Adjust the type here if necessary
  blockedCourses: Array<{ _id: string }>; // Adjust the type here if necessary
  verifiedCourses: Array<{ _id: string }>; // Adjust the type here if necessary
}

const Profile = () => {
  const [data, setData] = useState<FetchDataResult>({
    userDetails: {} as UserDetails,
    myCourses: [],
    blockedCourses: [],
    verifiedCourses: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserDetails>(data.userDetails);

  const instructor = useSelector((state: RootState) => state.instructor.email);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: FetchDataResult = await fetchData(instructor);
        console.log("result", result);
        
        setData(result);
        setFormData(result.userDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [instructor]);

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData(data.userDetails);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User Details</h2>
          {editMode ? (
            <form>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={
                      formData.profilePicture ||
                      `https://ui-avatars.com/api/?name=${formData.name}&background=random`
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full mr-6 shadow-lg"
                  />
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="bio">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center">
                <img
                  src={
                    data.userDetails.profilePicture ||
                    `https://ui-avatars.com/api/?name=${data.userDetails.name}&background=random`
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full mr-6 shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{data.userDetails.name}</h3>
                  <p className="text-md text-gray-700 mt-2">{data.userDetails.email}</p>
                  {data.userDetails.bio && (
                    <p className="text-md text-gray-700 mt-2 italic">{data.userDetails.bio}</p>
                  )}
                  {data.userDetails.verified !== undefined && (
                    <p
                      className={`text-md font-medium mt-2 ${data.userDetails.verified ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      {data.userDetails.verified ? 'Verified' : 'Not Verified'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
