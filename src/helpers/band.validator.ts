import db from '../db/models';

export const bandExistsByUuid = async (uuid: string): Promise<void> => {
    const bandExists = await db.Band.findOne({ where: { uuid } });

    if (!bandExists) {
        throw new Error(`There is no band with id: ${uuid}`);
    }
}