import axios from "axios";
import { getDetails, listBlockedCourses, listVerifiedCourses } from "../services/instructor/api";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_,
});




interface FetchDataResult {
    userDetails: {
        _id: string;
        name: string;
        email: string;
        profilePicture?: string;
        bio?: string;
        verified?: boolean;
    };
    myCourses: { _id: string }[];
    blockedCourses: { _id: string }[];
    verifiedCourses: { _id: string }[];
}

export const fetchData = async (instructor: string): Promise<FetchDataResult> => {
    try {
        const blockedCoursesResponse = await listBlockedCourses(instructor);
        const verifiedCoursesResponse = await listVerifiedCourses(instructor);
        const detailsResponse = await getDetails(instructor);

        return {
            userDetails: detailsResponse.result.userDetails,
            myCourses: detailsResponse.result.myCourses,
            blockedCourses: blockedCoursesResponse.courses,
            verifiedCourses: verifiedCoursesResponse.courses,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};