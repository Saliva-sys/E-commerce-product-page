// Profile.tsx
import React from "react";

interface ProfileProps {
    Avatar: string;
}

const Profile: React.FC<ProfileProps> = ({Avatar}) => {

return (
    <>
        <span className="avatar__button">
            <a href="https://github.com/Saliva-sys" target="_blank" rel="noreferrer" aria-label="Visit Adriana's GitHub profile">
            <img src={Avatar} className="avatar__button-img" alt="" aria-hidden="true" />
            </a>
        </span>
    </>
)};

export default Profile;