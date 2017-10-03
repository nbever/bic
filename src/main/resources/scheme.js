user: {
  first_name: string,
  last_name: string,
  middle_name: string,
  uuid: number,
  birthday: string,
  email: string,
  class ?: number,
  username: string,
  token: string,
  last_login: string,
  role: number,
}

user_roles: {
  name: string,
  uuid: number,
  privileges: [
    number
  ]
}

user_privileges: {
  name: string,
  uuid: number,
}

records: {
  user: uuid,
  creator: uuid,
  judge: uuid,
  discipline: [
    {type: number, value: number | string, served: boolean, hours_completed: number}
  ],
  state: string,
  ctime: string,
  judge_time: string,
  edit_log: [{
    date: string,
    field_changed: string,
    previous_value: string,
    new_value: string,
    edited_by: uuid,
  }],
  reflection: string
}

disciplines: {
  uuid: number,
  name: string,
  description: string,
  items: [
    type: number,
    value: number | string
  ]
}

config: {
  db_location: string,
  backup_config: {
    backups: number,
    backup_frequency: {
      frequency: number,
      day: number,
      time: number
    },
    backup_location: string
  },
  email_config: {
    smtp_server: string,
    sender_name: string,
    sender_address: string,
    smtp_port: number,
  },
  school_years: [
    {
      year: number,
      start_date: string,
      end_date: string
    }
  ]
}
