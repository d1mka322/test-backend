import express from 'express';

const app = express();
const port = 3000;

interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
}

app.use(express.json());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello from Express + TypeScript!');
});

app.get('/date', (req, res) => {
    res.send(new Date().toISOString());
});

const users: User[] = [];
app.get('/users', (req, res) => {
    res.json(users);
});
app.post('/users', (req, res) => {
    const {firstName, lastName, address, age} = req.body;

    if (!firstName || !lastName || !address || typeof age !== 'number') {
        return res.status(400).json({message: 'Invalid user data'});
    }

    const newUser: User = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        firstName,
        lastName,
        address,
        age,
    };

    users.push(newUser);
    res.json(newUser);
});