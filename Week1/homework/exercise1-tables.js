'use strict';

const tables = {
  Invitee: [
    { invitee_no: 1, invitee_name: 'A', invited_by: 'B' },
    { invitee_no: 2, invitee_name: 'B', invited_by: 'C' },
    { invitee_no: 3, invitee_name: 'C', invited_by: 'D' },
    { invitee_no: 4, invitee_name: 'D', invited_by: 'E' },
    { invitee_no: 5, invitee_name: 'E', invited_by: 'F' },
  ],
  Room: [
    { room_no: 100, room_name: 'A', floor_number: 1 },
    { room_no: 201, room_name: 'B', floor_number: 2 },
    { room_no: 302, room_name: 'C', floor_number: 3 },
    { room_no: 403, room_name: 'D', floor_number: 4 },
    { room_no: 504, room_name: 'E', floor_number: 5 },
  ],
  Meeting: [
    {
      meeting_title: 'something',
      starting_time: '2020-01-01 09:00:00',
      ending_time: '2020-01-01 10:00:00',
      room_no: 1,
    },
    {
      meeting_title: 'something',
      starting_time: '2020-01-02 09:00:00',
      ending_time: '2020-01-02 10:00:00',
      room_no: 2,
    },
    {
      meeting_title: 'something',
      starting_time: '2020-01-03 09:00:00',
      ending_time: '2020-01-03 10:00:00',
      room_no: 3,
    },
    {
      meeting_title: 'something',
      starting_time: '2020-01-04 09:00:00',
      ending_time: '2020-01-04 10:00:00',
      room_no: 4,
    },
    {
      meeting_title: 'something',
      starting_time: '2020-01-05 09:00:00',
      ending_time: '2020-01-05 10:00:00',
      room_no: 5,
    },
  ],
};

module.exports = tables;
