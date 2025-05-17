import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { BaseRepository } from './base.repository';
import {
  ProblemInPlaylist,
  PrismaClient,
  Prisma,
} from '../../prisma/generated/prisma/index.js';
import { CustomError } from '../utils/errors';

@injectable()
export class ProblemInPlaylistRepository extends BaseRepository<
  ProblemInPlaylist,
  Prisma.ProblemInPlaylistCreateInput,
  Prisma.ProblemInPlaylistCreateManyInput,
  Prisma.ProblemInPlaylistUpdateInput,
  Prisma.ProblemInPlaylistWhereUniqueInput
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.problemInPlaylist);
  }
}
