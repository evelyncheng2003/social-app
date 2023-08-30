import React from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

const DefaultComponent = () => {
    const data = [
        {
            userId: '02b',
            comId: '017',
            fullName: 'Reini',
            userProfile: 'https://github.com/Nassir-Al',
            text: 'First comment',
            avatarUrl: 'https://ui-avatars.com/api/name=Reinii&background=random',
            replies: []
        }
    ];

    //Beispiel

    //Beispiel

    return (
        <CommentSection
            currentUser={{
                currentUserId: '01a',
                currentUserImg:
                    'https://ui-avatars.com/api/name=Nassir&background=random',
                currentUserProfile: 'https://github.com/Nassir-Al',
                currentUserFullName: 'Nassir Alkourdi'
            }}
            logIn={{
                loginLink: 'http://localhost:3000/',
                signupLink: 'http://localhost:3000/'
            }}
            commentData={data}
        />
    );
};

export default DefaultComponent;
