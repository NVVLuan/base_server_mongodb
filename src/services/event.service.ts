import { Types } from 'mongoose';
import { client } from '../configs/redis.config';
import event, { EventInterface } from '../models/model_noSQL/event';

const checkEventEditableMaintain = async (eventId: string): Promise<boolean> => {
    const editing = await client.get(`${eventId}`);
    if (editing === 'editing') {
        await client.set(`${eventId}`, 'editing');
        await client.expire(`${eventId}`, 5 * 60);
        return true;
    } else return false;
};

const checkEventEditable = async (eventId: string): Promise<boolean> => {
    const editing = await client.get(`${eventId}`);
    if (editing === 'editing') {
        return true;
    } else return false;
};

const checkEventEditableRelease = async (eventId: string): Promise<boolean> => {
    return new Promise((resolve) => {
        try {
            client.set(`${eventId}`, 'editing');
            client.expire(`${eventId}`, 5 * 60);
            resolve(true);
        } catch (err) {
            resolve(false);
        }
    });
};

const editMaintain = async (eventId: string): Promise<boolean> => {
    const checkEventQueue = await checkEventEditableMaintain(eventId);
    if (checkEventQueue) return true;
    return false;
};

const checkEventEdit = async (eventId: string): Promise<boolean> => {
    const checkEventQueue = await checkEventEditable(eventId);
    if (checkEventQueue) return false;
    return true;
};

const editRelease = async (eventId: string): Promise<boolean> => {
    const checkEventQueue = await checkEventEditableRelease(eventId);
    if (checkEventQueue) return true;
    return false;
};

const eventCreate = async (
    maxium: number,
    name_event: string,
    date_start: Date,
    date_end: Date,
    createdBy: Types.ObjectId
): Promise<EventInterface | null> => {
    const eventFind = await event.findOne({ name_event });

    if (eventFind) return null;

    return await event.create({
        maxium: maxium,
        name_event: name_event,
        date_start: date_start,
        date_end: date_end,
        createdBy: createdBy,
    });
};

const editMaintains = async (eventId: string, createdBy: Types.ObjectId): Promise<boolean> => {
    const now = new Date();

    const checkEvent = await event.findOneAndUpdate(
        {
            id: eventId,
            by_editing: createdBy,
            date_edited: { $lt: new Date(now.getTime() - 5 * 60 * 1000) },
        },
        { date_edited: new Date() }
    );
    if (!checkEvent) return false;
    return true;
};

const checkEventEdits = async (eventId: string, createdBy: Types.ObjectId): Promise<boolean> => {
    const now = new Date();

    const checkEvent = await event.findOneAndUpdate(
        {
            id: eventId,
            $or: [
                {
                    // by_editing: { $ne: null },
                    date_edited: { $lt: new Date(now.getTime() - 5 * 60 * 1000) },
                },
                { by_editing: null },
            ],
        },
        { by_editing: createdBy, date_edited: new Date() }
    );
    if (!checkEvent) return false;
    return true;
};

const editReleases = async (eventId: string, createdBy: Types.ObjectId): Promise<boolean> => {
    const checkEvent = await event.findOneAndUpdate(
        { id: eventId },
        { by_editing: createdBy, date_edited: new Date() }
    );
    if (!checkEvent) return false;
    return true;
};

export const eventService = {
    checkEventEdit,
    editMaintain,
    editRelease,
    eventCreate,
    checkEventEdits,
    editMaintains,
    editReleases,
};
