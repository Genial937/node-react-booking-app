import bcrypt from 'bcryptjs'
import { createError } from './error.js'

export const compare_passwords = async (password, hashed_password) => {
    return bcrypt.compare(password, hashed_password)
}