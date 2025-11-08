    "use client";

    import React, { useEffect } from "react";
    import { motion, useAnimation, PanInfo } from "framer-motion";
    import type { Profile } from "@/lib/profiles";

    type Props = {
      profile: Profile;
      index: number;
      onSwipe: (dir: "left" | "right", profile: Profile) => void;
      swipeTrigger?: { id: string; dir: "left" | "right" } | null;
    };

    export default function TinderCard({ profile, index, onSwipe, swipeTrigger }: Props): JSX.Element {
      const controls = useAnimation();

      useEffect(() => {
        if (swipeTrigger?.id === profile.id) {
          const dir = swipeTrigger.dir;
          controls
            .start({
              x: dir === "right" ? 1000 : -1000,
              rotate: dir === "right" ? 20 : -20,
              opacity: 0,
              transition: { duration: 0.3 },
            })
            .then(() => onSwipe(dir, profile));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [swipeTrigger]);

      const handleDragEnd = (_event: any, info: PanInfo) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset > 120 || velocity > 500) {
          controls
            .start({
              x: 1000,
              rotate: 20,
              opacity: 0,
              transition: { duration: 0.2 },
            })
            .then(() => onSwipe("right", profile));
        } else if (offset < -120 || velocity < -500) {
          controls
            .start({
              x: -1000,
              rotate: -20,
              opacity: 0,
              transition: { duration: 0.2 },
            })
            .then(() => onSwipe("left", profile));
        } else {
          controls.start({ x: 0, rotate: 0, transition: { type: "spring", stiffness: 400 } });
        }
      };

      return (
        <motion.div
          className="card"
          style={{ zIndex: 100 + index }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial={{ scale: 1, y: index * -6 }}
          animate={controls}
          whileTap={{ scale: 1.02 }}
        >
          <img src={profile.image} alt={profile.name} className="card-image" />
          <div className="card-info">
            <h3>
              {profile.name}, {profile.age}
            </h3>
            <p>{profile.bio}</p>
          </div>
        </motion.div>
      );
    }
  