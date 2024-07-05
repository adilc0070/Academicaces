import axios from "axios";
import { getDetails, listBlockedCourses, listVerifiedCourses } from "../services/instructor/api";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});




interface FetchDataResult {
    userDetails: { userDetails: { _id: string }, myCourses: [{ _id: string }] };
    myCourses: [];
    blockedCourses: [];
    verifiedCourses: [];
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