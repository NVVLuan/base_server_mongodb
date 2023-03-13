import { EventException } from './../utils/constants/response.contant';
import { Response, Request } from 'express';
import _ from 'lodash';
import { eventService } from '../services';
import { BadRequestException, ResponseSuccess } from '../utils/constants/response.contant';
import { EventValidate } from '../utils/validate/event.validate';
import { Types } from 'mongoose';
import { EventDTO } from '../dtos/event.dto';

export const postEventEditable = async (req: Request, res: Response) => {
    const { event_id } = req.params;

    if (!_.isEqual(new EventValidate().eventId(event_id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await eventService.checkEventEdit(event_id);

    if (!data) {
        return res.status(409).json(new EventException().getError());
    }

    return res.redirect(`http://localhost:8080/api/v1/app/event/${event_id}/editable/release`);
};

export const postEventEditableMaintain = async (req: Request, res: Response) => {
    const { event_id } = req.params;

    if (!_.isEqual(new EventValidate().eventId(event_id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await eventService.editMaintain(event_id);

    if (!data) {
        return res.status(409).json(new EventException().getError());
    }

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const postEventEditableRelease = async (req: Request, res: Response) => {
    const { event_id } = req.params;

    if (!_.isEqual(new EventValidate().eventId(event_id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await eventService.editRelease(event_id);

    if (!data) {
        return res.status(409).json(new EventException().getError());
    }

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const postEvent = async (req: Request, res: Response) => {
    const { maxium, name_event, date_start, date_end }: EventDTO = req.body;

    const createdBy = (req as any).token.payload.id as Types.ObjectId;

    if (
        !_.isEqual(
            new EventValidate().eventCreate({
                maxium,
                name_event,
                date_start,
                date_end,
                createdBy: createdBy,
            }),
            'ok'
        )
    )
        return res.status(200).json(new BadRequestException().getError());

    const data = await eventService.eventCreate(
        maxium,
        name_event,
        date_start,
        date_end,
        createdBy
    );

    if (!data) {
        return res.status(409).json(new EventException(400, 'event create error').getError());
    }

    return res.status(200).json(new ResponseSuccess({ data }).getSuccess());
};

export const postEventEditables = async (req: Request, res: Response) => {
    const { event_id } = req.params;
    const createdBy = (req as any).token.payload.id as Types.ObjectId;

    if (!_.isEqual(new EventValidate().eventId(event_id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await eventService.checkEventEdits(event_id, createdBy);

    if (!data) {
        return res.status(409).json(new EventException(200, 'not edit').getError());
    }

    return res.status(200).json(new ResponseSuccess({ data: 'editing' }).getSuccess());
};

export const postEventEditableMaintains = async (req: Request, res: Response) => {
    const { event_id } = req.params;
    const createdBy = (req as any).token.payload.id as Types.ObjectId;

    if (!_.isEqual(new EventValidate().eventId(event_id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await eventService.editMaintains(event_id, createdBy);

    if (!data) {
        return res.status(409).json(new EventException(200, 'not edit').getError());
    }

    return res.status(200).json(new ResponseSuccess({ data: 'editing' }).getSuccess());
};

export const postEventEditableReleases = async (req: Request, res: Response) => {
    const { event_id } = req.params;
    const createdBy = (req as any).token.payload.id as Types.ObjectId;

    if (!_.isEqual(new EventValidate().eventId(event_id), 'ok')) {
        return res.status(200).json(new BadRequestException().getError());
    }

    const data = await eventService.editReleases(event_id, createdBy);

    if (!data) {
        return res.status(409).json(new EventException(200, 'event exit').getError());
    }

    return res.status(200).json(new ResponseSuccess({ data: 'editing' }).getSuccess());
};
