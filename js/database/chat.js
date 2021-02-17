class Chat {
	constructor(db, admin, chatCollectionName){
		this.db = db
		this.admin = admin
		this.chat = chatCollectionName
		this.chatRef = db.collection(this.chat);
	}
	// checks if a user is in the chat
	async inChat(uid, chat_id){
		let doc = await this.chatRef.doc(chat_id).get();
		if (!doc.exists) return false;
		return doc.data().members.includes(uid+"");
	}
	// sends a message from a person to a chat
	// TODO: send message to people (connect to sockets)
	async sendMessage(uid, chat_id, message, params){
		if (!(await this.inChat(uid, chat_id))) return false;
		if (!params) params = {};
		// send the message, return true if it sent and false otherwise
		try {
			let id = Math.round(Math.random()*1e15);
			let full = Object.assign({
					uid: uid,
					message: message,
					date: Date.now(),
					id: id
				}, params);
			await this.chatRef.doc(chat_id).collection('messages').doc(id).set(full);
			return {success: true};
		}
		catch (e) {
			return {success: false, error: e};
		}
	}
	// get messages from a chat
	async getMessages(uid, chat_id, num_chats, filter="", startat=0, side=true){
		if (!(await this.inChat(uid, chat_id))) return false;

		let messages = this.chatRef.doc(chat_id).collection('messages');

		// load in the messages
		messages = await messages.orderBy('date', side ? undefined : 'desc')
														 .startAt(startat)
														 .get();

		// return all the messages in an array (front/back -> middle)
		if (!filter) return messages.docs.map(doc => doc.data());
		let f = new RegExp(filter, 'i');
		return messages.docs.filter(doc => doc.data().message.match(f)).map(doc => doc.data());
	}

	async getByUsers(users){
		let query = await this.chatRef.where('members', '==', users).get();
		if (query.docs.length == 0) return false;
		return query.docs[0].id;
	}

	async makeChat(uid, members){
		let chat = await this.getByUsers(members);
		if (chat) return {success: false, error: "chat exists"};

		let id = Math.round(Math.random()*1e15) + "";
		this.chatRef.doc(id).set({
			members: members,
			name: ""
		});

		for (let m of members){
			let u = new User(this.db, this.admin, m);
			u.addChat(id);
		}
		(new User(this.db, this.admin, uid)).addChat(id);
		return {success: true, id: id}
	}

	async getChatName(uid, chat_id){
		if (!(await this.inChat(uid, chat_id))) return false;
		let data = (await this.chatRef.doc(chat_id).get()).data();
		if (data.name) return data.name;
		let names = [];
		for (let id of data.members){
			if (id == uid) continue;
			let u = new User(this.db, this.admin, id);
			names.push(await u.getUsername());
		}
		return names;
	}

	async joinChat(uid_adder, uid_added, chat_id){
		/**
		 * things to do:
		 * 	✅ check that users are friends (also acts to check if users exist)
		 * 	add user to chat
		 * 	add chat to user
		 */
		let added = new User(this.db, this.admin, uid_added);
		if (!(await added.isFriends(uid_adder))) return false;


	}

}

class User {
	constructor(db, admin, uid){
		this.user = db.collection('users').doc(uid);
		this.admin = admin;
	}
	async getUsername(){
		return (await this.user.get()).data().publicInfo.displayName;
	}
	// get all friends of the user
	async getFriends(){
		return (await this.user.get()).data().publicInfo.friends;
	}
	// check if the user is friends with another user
	async isFriends(user){
		return (await this.user.get()).data().publicInfo.friends.includes(user);
	}
	async getNotifs(){
		let notifs = (await this.user.get()).data().privateInfo.notifications;
		let unread = [];
		for (let o in notifs){
			if (notifs[o].status != "read") unread.push(notifs[0]);
		}
		return unread;
	}

	async getChats(){
		return (await this.user.get()).data().privateInfo.chatRefs;
	}

	async readNotif(){}
	async sendNotif(){}
	async addChat(cid){
		this.user.update({
			"privateInfo.chatRefs": this.admin.firestore.FieldValue.arrayUnion(cid)
		})
	}
}

module.exports = {Chat}