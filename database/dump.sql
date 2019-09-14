PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE `user` (
  `id`         INTEGER PRIMARY KEY AUTOINCREMENT,
  `first_name` VARCHAR(255),
  `last_name`  VARCHAR(255),
  `username`   VARCHAR(255),
  `password`   VARCHAR(255),
  `created`    DATETIME
);
INSERT INTO user
VALUES (1,
        'Peter',
        'Admin',
        'admin',
        '$2b$10$qi19MKAkTV0QSzWUEFCOL.YrP4YRwwrNPO6vGo9Mtu/wJ36Fo78kq',
        '2019-09-14 05:59:41.643 +00:00');
INSERT INTO user
VALUES (2,
        'Peter',
        'Listener',
        'listener',
        '$2b$10$qi19MKAkTV0QSzWUEFCOL.YrP4YRwwrNPO6vGo9Mtu/wJ36Fo78kq',
        '2019-09-14 05:59:41.644 +00:00');
CREATE TABLE `playlist` (
  `id`          INTEGER PRIMARY KEY AUTOINCREMENT,
  `name`        VARCHAR(255),
  `description` VARCHAR(255),
  `cover`       VARCHAR(255),
  `creatorId`   INTEGER REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  `userId`      INTEGER REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
INSERT INTO playlist
VALUES (1,
        'Chill Vibes ABCDE',
        'Songs to relax to during exam stress. Lean back',
        'https://i.pinimg.com/236x/ce/e0/e6/cee0e6d4072e079752b543649f685ffe--camels-playlist.jpg',
        1,
        NULL);
INSERT INTO playlist
VALUES (2,
        'Sport',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        'https://i.redd.it/0ls5x7mm8r011.jpg',
        1,
        NULL);
INSERT INTO playlist
VALUES (3,
        'Sunset Dreaming',
        'Lorem ipsum dolor sit amet, consetetur sadipscing ',
        'https://www.canva.com/learn/wp-content/uploads/2015/03/Colorful-Album-Cover.jpg',
        1,
        NULL);
INSERT INTO playlist
VALUES (4,
        'Retro Vibes',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
        'https://www.graphicsprings.com/filestorage/images/1191/Screen%20Shot%202018-05-24%20at%2011.25.20%20AM.png',
        1,
        NULL);
INSERT INTO playlist
VALUES (5,
        'Hidden Gems',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ',
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba8e6264140685.5ac8182a1d973.jpg',
        1,
        NULL);
CREATE TABLE `role` (
  `id`   INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` VARCHAR(255) NOT NULL
);
INSERT INTO role
VALUES (1, 'ADMIN');
INSERT INTO role
VALUES (2, 'LISTENER');
CREATE TABLE `song` (
  `id`     INTEGER PRIMARY KEY AUTOINCREMENT,
  `artist` VARCHAR(255),
  `title`  VARCHAR(255),
  `genre`  VARCHAR(255),
  `length` INTEGER,
  `album`  VARCHAR(255)
);
INSERT INTO song
VALUES (1, 'Shakira', 'Song 1', 'Pop', 192, 'NewAlbum');
INSERT INTO song
VALUES (2, 'Eminem', 'Song 2', 'Rap', 122, 'NewAlbum');
INSERT INTO song
VALUES (3, 'Usher', 'Song 3', 'Electro', 180, 'FL');
INSERT INTO song
VALUES (4, 'Rihanna', 'Song 4', 'Pop', 160, 'NewTone');
CREATE TABLE `playlistUser` (
  `createdAt`  DATETIME NOT NULL,
  `updatedAt`  DATETIME NOT NULL,
  `playlistId` INTEGER  NOT NULL REFERENCES `playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  `userId`     INTEGER  NOT NULL REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (`playlistId`, `userId`)
);
INSERT INTO playlistUser
VALUES ('2019-09-14 05:59:41.729 +00:00', '2019-09-14 05:59:41.729 +00:00', 1, 2);
INSERT INTO playlistUser
VALUES ('2019-09-14 06:00:50.256 +00:00', '2019-09-14 06:00:50.256 +00:00', 1, 1);
INSERT INTO playlistUser
VALUES ('2019-09-14 06:00:51.407 +00:00', '2019-09-14 06:00:51.407 +00:00', 2, 1);
INSERT INTO playlistUser
VALUES ('2019-09-14 06:05:05.177 +00:00', '2019-09-14 06:05:05.177 +00:00', 5, 1);
INSERT INTO playlistUser
VALUES ('2019-09-14 06:05:06.282 +00:00', '2019-09-14 06:05:06.282 +00:00', 4, 1);
CREATE TABLE `playlistSong` (
  `createdAt`  DATETIME NOT NULL,
  `updatedAt`  DATETIME NOT NULL,
  `playlistId` INTEGER  NOT NULL REFERENCES `playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  `songId`     INTEGER  NOT NULL REFERENCES `song` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (`playlistId`, `songId`)
);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.729 +00:00', '2019-09-14 05:59:41.729 +00:00', 1, 1);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.729 +00:00', '2019-09-14 05:59:41.729 +00:00', 1, 2);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.729 +00:00', '2019-09-14 05:59:41.729 +00:00', 1, 3);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 2, 1);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 2, 2);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 2, 4);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 3, 1);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 3, 2);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 3, 3);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 3, 4);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 4, 1);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 4, 2);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 4, 3);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.756 +00:00', '2019-09-14 05:59:41.756 +00:00', 4, 4);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.760 +00:00', '2019-09-14 05:59:41.760 +00:00', 5, 1);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.760 +00:00', '2019-09-14 05:59:41.760 +00:00', 5, 2);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.760 +00:00', '2019-09-14 05:59:41.760 +00:00', 5, 3);
INSERT INTO playlistSong
VALUES ('2019-09-14 05:59:41.760 +00:00', '2019-09-14 05:59:41.760 +00:00', 5, 4);
INSERT INTO playlistSong
VALUES ('2019-09-14 06:01:00.060 +00:00', '2019-09-14 06:01:00.060 +00:00', 1, 4);
CREATE TABLE `userRole` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `roleId`    INTEGER  NOT NULL REFERENCES `role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  `userId`    INTEGER  NOT NULL REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (`roleId`, `userId`)
);
INSERT INTO userRole
VALUES ('2019-09-14 05:59:41.727 +00:00', '2019-09-14 05:59:41.727 +00:00', 1, 1);
INSERT INTO userRole
VALUES ('2019-09-14 05:59:41.730 +00:00', '2019-09-14 05:59:41.730 +00:00', 2, 2);
DELETE
FROM sqlite_sequence;
INSERT INTO sqlite_sequence
VALUES ('role', 2);
INSERT INTO sqlite_sequence
VALUES ('user', 2);
INSERT INTO sqlite_sequence
VALUES ('song', 4);
INSERT INTO sqlite_sequence
VALUES ('playlist', 7);
COMMIT;
