import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { ScheduleDocument, schedule } from '../model/scheduler.model';

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const { search } = req.query;
  const title = search ? search.toString() : "";
  const schedules = await schedule.find({ title: { $regex: title, $options: "i" } });

  if (!schedules.length) {
    res.status(404).json({ message: "No schedules Found" });
  }

  res.status(200).send({ schedules });
});

const getSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedul = await schedule.findById(id);

  if (!schedul) {
    res.status(404).json({ message: "Specific schedule not found!" });
  }

  res.status(200).send(schedul);
});

const addSchedule = catchAsync(async (req: Request, res: Response) => {
  console.log("Inside post req.");
  const schedul: ScheduleDocument = await schedule.create(req.body).catch((err) => {
    throw new Error("Schedule did not get added.");
  });

  res.status(201).send(schedul);
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedul: ScheduleDocument | null = await schedule.findById(id);

  if (schedul) {
    schedul.title = req.body.title;
    schedul.description = req.body.description;
    schedul.subject = req.body.subject;
    schedul.time = req.body.time;

    if (req.body.repeat) {
      schedul.repeat = req.body.repeat;
    } else {
      schedul.repeat = "";
    }

    await schedul.save();
    res.sendStatus(201);
  } else {
    res.status(404).json({ message: "Specific schedule not found!" });
  }
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await schedule.deleteOne({ _id: id });
  res.sendStatus(200);
});

export default  {
  getAllSchedules,
  getSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule
};
