import React from 'react';
import PropTypes from 'prop-types';
import s from './FriendList.module.css';

function FriendList({ friends }) {
  return (
    <ul className={s.friendList}>
      {friends.map(({ id, avatar, name, isOnline }) => (
        <FriendListItem
          key={id}
          avatar={avatar}
          name={name}
          isOnline={isOnline}
        />
      ))}
    </ul>
  );
}

function FriendListItem({ id, avatar, name, isOnline }) {
  const status = isOnline ? s.online : s.offline;
  return (
    <li className={s.item} key={id}>
      <span className={status}></span>
      <img className={s.avatar} src={avatar} alt={name} width="48" />
      <p className={s.name}>{name}</p>
    </li>
  );
}

FriendListItem.defaultProps = {
  isOnline: true,
};
FriendList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object),
};
FriendListItem.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  isOnline: PropTypes.bool,
};

export default FriendList;
