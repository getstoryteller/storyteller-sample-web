import React, { useEffect } from 'react';
import Image from 'next/image';
import useStoryteller from '@/hooks/useStoryteller';
import { User as StorytellerUser } from '@getstoryteller/storyteller-sdk-javascript';

const USER_ID_KEY = 'userId';
interface ButtonProps {
  setUserId: (newId: string | null) => void;
}

/**
 * Atoms
 */
const LogoutButton = ({ setUserId }: ButtonProps) => {
  const { isStorytellerInitialized } = useStoryteller();
  return (
    <button
      type="submit"
      className="ml-4 flex items-center justify-center rounded-md border border-indigo-600 text-indigo-600 px-8 py-1 text-base font-medium hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => {
        setUserId(null);
        if (isStorytellerInitialized) {
          StorytellerUser.removeUserAttribute('language');
          StorytellerUser.removeUserAttribute('favoriteTeam');
        }
      }}
    >
      Logout
    </button>
  );
};

const LoginButton = ({ setUserId }: ButtonProps) => {
  const onLogin = () => {
    const defaultUserId = `sample-app-user-${Date.now()}`;
    let newUserId = prompt('Please enter user ID', defaultUserId);
    if (!newUserId) {
      return null;
    }
    setUserId(newUserId);
  };

  return (
    <button
      type="submit"
      className="ml-4 flex items-center justify-center rounded-md border border-indigo-600 text-indigo-600 px-8 py-1 text-base font-medium hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onLogin}
    >
      Login
    </button>
  );
};

/**
 * Container
 */
// This component simulates a user logging in and out of the app.
//
// When a user logs in or logs out then the Storyteller SDK is re-initialized
// either with their new user ID (when logging in) or with no user ID (when logging out).
//
// This means that the user's Storyteller data (for example, which stories they
// have read, which polls they have voted in and which quizzes they have answered)
// will be associated with their user ID.
//
// To read more about User IDs, see:
// https://www.getstoryteller.com/documentation/web/users
const UserOptions = () => {
  const { initializeStoryteller } = useStoryteller();
  const [userId, setUserId] = React.useState(localStorage.getItem(USER_ID_KEY));

  useEffect(() => {
    if (userId) {
      localStorage.setItem(USER_ID_KEY, userId);
      initializeStoryteller(userId);
    } else {
      localStorage.removeItem(USER_ID_KEY);
      initializeStoryteller();
    }
  }, [initializeStoryteller, userId]);

  return (
    <>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {userId && (
          <>
            <span className="inline-flex items-center rounded-md bg-gray-50 px-6 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-5">
              {userId}
            </span>
            <a
              href="/settings"
              className="text-sm font-semibold leading-6 text-gray-900 flex"
            >
              <Image
                src="/avatar.png"
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                alt="User Logo"
                width={40}
                height={40}
              />
            </a>
          </>
        )}
        {userId ? (
          <LogoutButton setUserId={setUserId} />
        ) : (
          <LoginButton setUserId={setUserId} />
        )}
      </div>
    </>
  );
};

export default UserOptions;
