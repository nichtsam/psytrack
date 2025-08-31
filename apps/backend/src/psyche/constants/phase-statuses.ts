import z from 'zod';

export const ActivatingStatus = z.enum([
  'emotions_unknown',
  'field_completed',
]).enum;

export const ReactionStatus = z.enum([
  'field_pending',
  'field_na',
  'emotions_unknown',
  'field_completed',
]).enum;

export const CopingStatus = z.enum([
  'field_pending',
  'field_na',
  'emotions_unknown',
  'field_completed',
]).enum;

export const PostStatus = z.enum([
  'field_pending',
  'field_na',
  'field_completed',
]).enum;
