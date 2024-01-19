import mongoose, { Document, Schema, SchemaDefinitionProperty } from 'mongoose';

interface Schedule {
  title: string;
  description: string;
  subject: string;
  time: string;
  repeat?: string;
}

interface ScheduleDocument extends Schedule, Document {}

const scheduleSchemaDefinition: Record<keyof Schedule, SchemaDefinitionProperty<any>> = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  repeat: {
    type: String,
    trim: true,
  },
};

const scheduleSchema = new Schema<ScheduleDocument>(scheduleSchemaDefinition, {
  timestamps: false,
});

const schedule = mongoose.model<ScheduleDocument>('schedules', scheduleSchema);

export { Schedule, ScheduleDocument, schedule };
