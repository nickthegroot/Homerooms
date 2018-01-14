export type Teacher = {
  email: string,
  firstName: string,
  id: string,
  lastName: string,
  room: string | number,
  taughtCourses: string,
  picture?: string
}

export type Request = {
  user: string, // We only really care about the UID
  pushID?: string,
  teacher: string, // First comes in as key
  accepted: boolean,
  timestamp: string,
  requestedTime: string,
  reason: string
}

export type Student = {
  defaultSeminar: string,
  name: string,
  lastRequest: string
}
