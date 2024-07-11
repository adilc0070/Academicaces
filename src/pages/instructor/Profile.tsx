import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchData, } from "../../utils/api";

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  verified?: boolean;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const [data, setData] = useState<{
    userDetails: UserDetails;
    myCourses: [];
    blockedCourses: [];
    verifiedCourses: [];
  }>({
    userDetails: {} as UserDetails,
    myCourses: [],
    blockedCourses: [],
    verifiedCourses: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserDetails>(data.userDetails);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const instructor = useSelector((state: RootState) => state.instructor.email);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(instructor);
        setData(result);
        setFormData(result.userDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [instructor]);

  const handleEditClick = () => {
    setEditMode(true);
  };

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserDetails(instructor, formData);
      setEditMode(false);
      setData((prevData) => ({
        ...prevData,
        userDetails: formData,
      }));
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the logic to handle password change here
    console.log("Password Data:", passwordData);
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User Details</h2>
          {editMode ? (
            <form onSubmit={handleFormSubmit}>
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
                        value={formData.bio}
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
              {/* <div className="mt-4">
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit Profile
                </button>
              </div> */}
            </div>
          )}
          {/* <div className="bg-gray-100 p-6 rounded-lg mt-6">

            <h2 className="text-3xl font-bold text-gray-900 mt-6">Reset Password</h2>
            <form onSubmit={handlePasswordSubmit} className="bg-gray-100 p-6 rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
