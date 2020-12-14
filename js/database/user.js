import { admin, users } from "./index"

const query = async (mode, body) => {
    const modes = {
        uid: () => users.doc(body).get(),
        email: () => admin.auth().getUserByEmail(body).then(user => user.toJSON()),
        username: () => users.where('publicInfo.displayName', '==', body).get(),
        identifier: () => admin.auth().getUsers(body).then(res => res.users)
    }
    
    if(modes.hasOwnProperty(mode)) {
        return modes[mode]()
    }
    return {}
}

export {
    query
}