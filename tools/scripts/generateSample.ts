import { faker } from '@faker-js/faker/locale/zh_CN';
import { createPrompt } from 'bun-promptx';
import { writeFile } from 'fs/promises';

function generateStudent() {
	return {
		name: faker.person.fullName(),
		cardNumber: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
		house: faker.helpers.arrayElement(['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'])
	};
}

const numOfStudents = parseInt(createPrompt('Number of Students: ').value || '100');

const students = [];

for (let i = 0; i < numOfStudents; i++) {
	students.push(generateStudent());
}

await writeFile('students.json', JSON.stringify(students, null, 2));
