import bcrypt from 'bcryptjs'


const users = [
    {
        name: 'Admin',
        email: 'admin@ex.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Preetam',
        email: 'preetam@ex.com',
        password: bcrypt.hashSync('123456', 10)

    },
    {
        name: 'Pratima',
        email: 'pratima@ex.com',
        password: bcrypt.hashSync('123456', 10)

    },
]

export default users