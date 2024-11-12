
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';

export function generateMockPets(count, userIds) {
    const species = ['dog', 'cat', 'rabbit', 'parrot']
    const pets = []

    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.type(),
            specie: species[Math.floor(Math.random() * species.length)],
            birthDate: faker.date.past(),
            adopted: Math.random() > 0.5,
            owner: userIds.length ? userIds[Math.floor(Math.random() * userIds.length)] : null,
            image: faker.image.urlPicsumPhotos()
        })
    }
    return pets
}

// Mocking para generar usuarios
export function generateMockUsers(count) {
    const users = []
    const roles = ['user', 'admin']

    for (let i = 0; i < count; i++) {
        const hashedPassword = bcrypt.hashSync('coder123', 10)
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: roles[Math.floor(Math.random() * roles.length)],
            pets: []
        })
    }
    return users
}
