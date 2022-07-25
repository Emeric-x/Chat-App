export interface User {
    _id?: string,
    firstname: string,
    lastname: string,
    login: string,
    password: string,
    avatar: string,
    chats?: [{
        chat_id: string,
        name: string,
        logo: string
    }]
}
