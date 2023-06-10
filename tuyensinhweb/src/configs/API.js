import axios from "axios";
import cookie from "react-cookies"

export const endpoint={
    "admissionTypes": "/admissionTypes/",
    "admissionTypeDetail": (typeid) =>`/admissionTypes/${typeid}/`,

    "admissionType": (typeid) => `/admissionTypes/${typeid}/admissionInfo/`,
    "admissionInfo": (adInfoId) => `admissionInfo/${adInfoId}/`,
    "comments" : (adInfoId) =>`/admissionInfo/${adInfoId}/comments/`,
    "delete_comment" : (commentId) =>`/comments/${commentId}/`,
    "register": "/users/",
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "comments_rep":(commentId) => `comments/${commentId}/Comment_replies/`,
    "notifications": "/notification/",
    "notification": (notId) =>`/notification/${notId}/`,
    "question" : (notId) => `/notification/${notId}/Question/`,
    'sendEmail': (notId) => `/notification/${notId}/send_email/`,
    'departments': "/department/",
    'department': (departId) =>`department/${departId}/Score/`,
    'banners':"/banner/",
    'home':"/school/",
    "delete_commentRep":(commentRepId) => `/comment_rep/${commentRepId}/`,
    "user_noti" : (userId) =>`/users/${userId}/notification/`,
    "questionDetail": (questionID) => `/question/${questionID}/`

}

export const authAPI = () => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Authorization": `Bearer ${cookie.load("access-token")}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})



