const fs = require('fs/promises');
const path = require('path');

const readContacts = async () => {
	const result = await fs.readFile(
		path.join(__dirname, '/db/contacts.json'),
		'utf8'
	);

	try {
		return (contacts = JSON.parse(result));
	} catch (error) {
		return new Error(error);
	}
};

function listContacts() {
	return readContacts();
}

async function getContactById(contactId) {
	const contacts = await readContacts();
	const result = contacts.filter(contact => contact.id === Number(contactId));
	return result;
}

async function removeContact(contactId) {
	const contacts = await readContacts();
	const index = contacts.findIndex(contact => contact.id === Number(contactId));
	contacts.splice(index, 1);
	await fs.writeFile(
		path.join(__dirname, '/db/contacts.json'),
		JSON.stringify(contacts, null, 2)
	);
	
	return index;
}


async function addContact(name, email, phone) {
	const contacts = await readContacts();
	const newContact = { id: contacts.length + 1, name, email, phone };
	contacts.push(newContact);
	await fs.writeFile(
		path.join(__dirname, '/db/contacts.json'),
		JSON.stringify(contacts, null, 2)
	);

	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	addContact,
};
