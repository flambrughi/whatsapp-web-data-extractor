var r = indexedDB.open("model-storage");
r.onerror = (event) => {
	console.error("Why didn't you allow my web app to use IndexedDB?!");
};
r.onsuccess = (event) => {

	function elaboraParticipants(ptc, groupId) {
		console.log('getAll Participants response:');
		console.log(ptc);
		var ptcList;
		for (var g of ptc) {
			if (g.groupId && g.groupId === groupId) {
				ptcList = g.participants;
				break;
			}
		} if (!ptcList) {
			console.error('Participants not found for ' + groupId + '. Quit.');
			return;
		} else {
			console.log('Found chat participants:')
			console.log(ptcList)
		}
		transaction = db.transaction(["contact"], "readonly");
		//console.log('transaction loaded!')
		const objectStore = transaction.objectStore("contact");
		const request = objectStore.getAll();
		request.onerror = (event) => {
			console.error(event);
			return;
		};
		request.onsuccess = (event) => {
			console.log('Search phoneNumbers...')
			console.log(request.result)
			for (var p of ptcList) {
				var found = 0;
				for (var pn of request.result) {
					if (pn.id === p) {
						console.log(pn.phoneNumber.split('@')[0] + (pn.pushname? ';' + pn.pushname : ';'))
						found = 1;
						break;
					}
				}
				if (found === 0) {
					console.error('Cannot find phoneNumber for participant ' + p)
				}
			}
		};
	}

	function elaboraChats(chats, chatname) {
		console.log('getAll Groups response:');
		console.log(chats);
		var chat;
		for (var g of chats) {
			if (g.subject && g.subject.startsWith(chatname)) {
				chat = g;
				break;
			}
		} if (!chat) {
			console.error('Group not found. Quit.');
			return;
		} else {
			console.log('Found your group: ' + g.subject)
			console.log(chat)
		}

		transaction = db.transaction(["participant"], "readonly");
		//console.log('transaction loaded!')
		const objectStore = transaction.objectStore("participant");
		const request = objectStore.getAll();
		request.onerror = (event) => {
			console.error(event);
			return;
		};
		request.onsuccess = (event) => {
			console.log('Search Participants....')
			elaboraParticipants(request.result, chat.id);
		};

	}

	var db = event.target.result;
	console.log('db loaded!')
	console.log(db)
	const chatname = prompt("What does chat name start with?");
	if (chatname !== null) {
	  console.log(`User entered chatname: ${chatname}`);
	}
	var transaction = db.transaction(["group-metadata"], "readonly");
	const chatStore = transaction.objectStore('group-metadata');
	const r1 = chatStore.getAll();
	r1.onerror = (event) => {
		console.error(event)
		return;
	};
	r1.onsuccess = (event) => {
		console.log('Chat-group searching....')
		elaboraChats(r1.result, chatname);
	};

};