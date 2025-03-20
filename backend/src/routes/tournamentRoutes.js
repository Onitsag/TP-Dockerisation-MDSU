import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Get all tournaments
router.get('/', asyncHandler(async (req, res) => {
  const tournaments = await prisma.tournament.findMany({
    include: {
      organizer: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      },
      participants: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      }
    }
  });
  res.json(tournaments);
}));

// Create tournament
router.post('/', protect, asyncHandler(async (req, res) => {
  const { name, game, format, date, maxParticipants } = req.body;

  const tournament = await prisma.tournament.create({
    data: {
      name,
      game,
      format,
      date: new Date(date),
      maxParticipants,
      organizerId: req.user.id,
    },
    include: {
      organizer: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      },
      participants: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      }
    }
  });

  res.status(201).json(tournament);
}));

// Join tournament
router.post('/:id/join', protect, asyncHandler(async (req, res) => {
  const tournamentId = req.params.id;

  const tournament = await prisma.tournament.update({
    where: { id: tournamentId },
    data: {
      participants: {
        connect: { id: req.user.id }
      }
    },
    include: {
      organizer: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      },
      participants: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      }
    }
  });

  res.json(tournament);
}));

// Leave tournament
router.post('/:id/leave', protect, asyncHandler(async (req, res) => {
  const tournamentId = req.params.id;

  const tournament = await prisma.tournament.update({
    where: { id: tournamentId },
    data: {
      participants: {
        disconnect: { id: req.user.id }
      }
    },
    include: {
      organizer: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      },
      participants: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      }
    }
  });

  res.json(tournament);
}));

export default router;