import { type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const Avatar = (): ReactElement => {
  // Get currentUser from Redux store
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <div className="flex items-center gap-6">
      <div className="avatar">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt={`${currentUser.displayName || 'User'}'s avatar`} />
          ) : (
            <div className="bg-primary text-primary-content">
              <span className="text-xl">{currentUser?.displayName?.[0] || 'U'}</span>
            </div>
          )}
        </div>
      </div>
      <span className="text-base font-medium">
        {currentUser?.displayName || 'User'}
      </span>
    </div>
  );
};

export default Avatar;