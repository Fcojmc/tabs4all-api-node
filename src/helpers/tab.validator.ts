import db from '../db/models';

export const tabExists = async (name: string = '') =>  {
    const tabExists = await db.Tab.findOne({ where: { name } });

    if (tabExists) {
        throw new Error(`Tab ${name} already exists`);
    }
}

export const tabExistsByUuid = async (uuid: string) => {
    const tabExists = await db.Tab.findOne({ where: { uuid } });

    if (!tabExists) {
        throw new Error('There is no tab with such uuid');
    }
}