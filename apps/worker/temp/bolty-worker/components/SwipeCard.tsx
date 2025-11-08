'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import type { User } from '../lib/users';

type Props = {
  user: User;
  onSwipe: (dir: 'left' | 'right', id: string) => void;
};

export default function SwipeCard({ user, onSwipe }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-18, 18]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  function handleDragEnd(_: PointerEvent, info: PanInfo) {
    if (info.offset.x > 140) {
      onSwipe('right', user.id);
    } else if (info.offset.x < -140) {
      onSwipe('left', user.id);
    }
  }

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-[320px] sm:w-[360px] max-w-full rounded-xl shadow-lg bg-white dark:bg-[#111] overflow-hidden"
      style={{ x, rotate }}
      drag="x"
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.03 }}
    >
      <div className="relative h-[420px] bg-gray-200">
        <img src={user.photos[0]} alt={user.name} className="object-cover w-full h-full" />
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute left-4 top-4 px-3 py-1 rounded bg-green-500 text-white font-bold"
        >
          LIKE
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute right-4 top-4 px-3 py-1 rounded bg-red-500 text-white font-bold"
        >
          NOPE
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {user.name}, {user.age}
          </h3>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>
      </div>
    </motion.div>
  );
}
  