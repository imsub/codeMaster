import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {BaseRepository} from "./base.repository";
import {
  Playlist,
  PrismaClient,
  Prisma,
} from "../../prisma/generated/prisma/index.js";
import {CustomError} from "../utils/errors";

@injectable()
export class PlaylistRepository extends BaseRepository<
  Playlist,
  Prisma.PlaylistCreateInput,
  Prisma.PlaylistCreateManyInput,
  Prisma.PlaylistUpdateInput,
  Prisma.PlaylistWhereUniqueInput,
  Prisma.PlaylistFindManyArgs,
  Prisma.PlaylistFindFirstArgs,
  Prisma.PlaylistCountArgs
> {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {
    super(prismaClient, prismaClient.playlist);
  }
}
