    "use client";

    import React from "react";
    import type { Profile } from "../lib/profiles";

    type Props = {
      profile: Profile;
    };

    export default function ProfileCard({ profile }: Props) {
      return (
        <div className="card">
          <img className="card-avatar" src={profile.avatar} alt={profile.name} />
          <div className="card-info">
            <div className="card-name">
              <span className="name">{profile.name}</span>
              <span className="age">, {profile.age}</span>
            </div>
            <p className="card-bio">{profile.bio}</p>
          </div>
        </div>
      );
    }
  