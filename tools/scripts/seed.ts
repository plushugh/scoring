import { createPrompt } from 'bun-promptx';
import Pocketbase from 'pocketbase';
import path from 'path';
import { readFile } from 'fs/promises';

const pb = new Pocketbase(
	Bun.env.PUBLIC_POCKETBASE_URL || createPrompt('Pocketbase URL: ').value || ''
);

await pb.admins.authWithPassword(
	createPrompt('Pocketbase Admin Email: ').value || '',
	createPrompt('Admin Password: ', { echoMode: 'password' }).value || ''
);

const HOGWARTS_HOUSES = [
	{
		name: 'gryffindor',
		color: '#740001'
	},
	{
		name: 'hufflepuff',
		color: '#ecb939'
	},
	{
		name: 'ravenclaw',
		color: '#222f5b'
	},
	{
		name: 'slytherin',
		color: '#1a472a'
	}
];

console.log('Seeding Hogwarts Houses...');

for (const { name, color } of HOGWARTS_HOUSES) {
	await pb.collection('houses').create({
		name,
		color
	});
}

console.log('Done!');

console.log('Seeding Students...');
const dataPath = createPrompt('Data JSON File Path: ').value || '';
const students = JSON.parse((await readFile(dataPath)).toString());
console.log('Loaded ' + students.length + ' students from JSON file.');

for (const student of students) {
	await pb.collection('students').create(student);
}

console.log('Done!');
