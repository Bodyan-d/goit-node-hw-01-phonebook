const { Command } = require('commander');
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require('./contacts');
const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			listContacts().then(console.table).catch(console.error);
			break;

		case 'get':
			getContactById(id)
				.then(contact => {
					if (contact[0]) {
						console.log('Contact found!');
						console.log(contact[0]);
					} else {
						console.log('Contact not found');
					}
				})
				.catch(console.error);
			break;

		case 'add':
			addContact(name, email, phone)
				.then(contact => {
					console.log('New contact was added');
					console.log(contact);
				})
				.catch(console.error);
			break;

		case 'remove':
			removeContact(id)
				.then(index => {
					console.log(`Contact with id ${index + 1} was deleted `);
				})
				.catch(console.error);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(argv);
