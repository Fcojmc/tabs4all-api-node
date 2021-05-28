import db from '../db/models';

export const emailExists = async (email: string = ''): Promise<void> => {
    const emailExists: Object = await db.User.findOne({ where: { email } });

    if (emailExists) {
        throw new Error(`Email: ${email} already exists`);
    }
}

export const userExists = async (uuid: string): Promise<void> => {
    const userExists: Object = await db.User.findOne({ where: { uuid } });

    if (!userExists) {
        throw new Error(`There is no user with uuid: ${uuid}`);
    }
}

