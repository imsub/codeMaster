import {injectable, inject} from "inversify";
import {TYPES} from "../types";
import {Submission} from "../../prisma/generated/prisma/index";
import {CustomError} from "../utils/errors";
import {CacheManager} from "../utils";
import {PlaylistRepository, ProblemInPlaylistRepository} from "../repositories";

@injectable()
export class PlaylistService {
  constructor(
    @inject(TYPES.CacheManager) private cacheManager: CacheManager,
    @inject(TYPES.PlaylistRepository)
    private playlistRepository: PlaylistRepository,
    @inject(TYPES.ProblemInPlaylistRepository)
    private problemInPlaylistRepository: ProblemInPlaylistRepository
  ) {}
  async getAllPlaylistsDetails(userId: string) {
    const cacheKey = `playlists:${userId}`;
    const cachedPlaylists = await this.cacheManager.getCache(cacheKey);

    if (cachedPlaylists) {
      return JSON.parse(cachedPlaylists);
    }

    const playlists = await this.playlistRepository.findAll({
      relationLoadStrategy: "join",
      where: {
        userId: userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlists || playlists.length === 0) {
      throw new CustomError("No playlists found", 404);
    }

    await this.cacheManager.setCache(cacheKey, JSON.stringify(playlists), 3600); // Cache for 1 hour

    return playlists;
  }

  async getPlaylistDetails(playlistId: string, userId: string) {
    const cacheKey = `playlist:${playlistId}:${userId}`;
    const cachedPlaylist = await this.cacheManager.getCache(cacheKey);

    if (cachedPlaylist) {
      return JSON.parse(cachedPlaylist);
    }

    const playlist = await this.playlistRepository.findById({
      relationLoadStrategy: "join",
      where: {
        id: playlistId,
        userId: userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      throw new CustomError("Playlist not found", 404);
    }

    await this.cacheManager.setCache(cacheKey, JSON.stringify(playlist), 3600); // Cache for 1 hour

    return playlist;
  }

  async createPlaylist(name: string, description: string, userId: string) {
    const existingPlaylist = await this.playlistRepository.findById({
      where: {
        name: name,
        user: {
          connect: {id: userId},
        },
      },
    });

    if (existingPlaylist) {
      throw new CustomError("Playlist with this name already exists", 400);
    }

    const newPlaylist = await this.playlistRepository.create({
      data: {
        name,
        description,
        user: {
          connect: {id: userId},
        },
      },
    });

    return newPlaylist;
  }
  async addProblemsToPlaylist(playlistId: string, problemIds: string[]) {
    const playlist = (await this.playlistRepository.findById({
      where: {id: playlistId},
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    })) as typeof playlist & {problems: {problemId: string}[]};

    if (!playlist) {
      throw new CustomError("Playlist not found", 404);
    }
    const existingProblemIds = playlist.problems.map(
      (p: {problemId: string}) => p.problemId
    );
    const newProblemIds = problemIds.filter(
      id => !existingProblemIds.includes(id)
    );
    if (newProblemIds.length === 0) {
      throw new CustomError("All problems already exist in the playlist", 400);
    }
    const problemsInPlaylist =
      await this.problemInPlaylistRepository.batchCreate(
        newProblemIds.map(problemId => ({
          playListId: playlist.id,
          problemId,
        }))
      );
    if (!problemsInPlaylist) {
      throw new CustomError("Failed to add problems to playlist", 500);
    }
    // Clear cache for the playlist
    await this.cacheManager.deleteCache(`playlist:${playlistId}`);
    await this.cacheManager.deleteCache(`playlists:${playlist.userId}`);
    return problemsInPlaylist;
  }

  async deletePlaylist(playlistId: string, userId: string) {
    const playlist = await this.playlistRepository.findById({
      where: {
        id: playlistId,
        userId: userId,
      },
    });

    if (!playlist) {
      throw new CustomError("Playlist not found", 404);
    }

    const data = await this.playlistRepository.delete({id: playlistId});
    if (!data) {
      throw new CustomError("Failed to delete playlist", 500);
    }

    // Clear cache for the deleted playlist
    await this.cacheManager.deleteCache(`playlist:${playlistId}:${userId}`);
    await this.cacheManager.deleteCache(`playlists:${userId}`);
  }

  async removeProblemFromPlaylist(playlistId: string, problemId: string) {
    const playlist = await this.playlistRepository.findById({
      where: {id: playlistId},
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      throw new CustomError("Playlist not found", 404);
    }

    const problemInPlaylist = await this.problemInPlaylistRepository.findById({
      where: {
        playListId: playlistId,
        problemId: problemId,
      },
    });

    if (!problemInPlaylist) {
      throw new CustomError("Problem not found in the playlist", 404);
    }

    const deletedProblem = await this.problemInPlaylistRepository.deleteMany({
      playListId_problemId: {
        playListId: playlistId,
        problemId: problemId,
      },
    });

    if (!deletedProblem) {
      throw new CustomError("Failed to remove problem from playlist", 500);
    }

    // Clear cache for the playlist
    await this.cacheManager.deleteCache(`playlist:${playlistId}`);
    await this.cacheManager.deleteCache(`playlists:${playlist.userId}`);

    return deletedProblem;
  }
}
