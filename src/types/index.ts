export type Raw = string | number;

export interface User {
  type: string;
  token: string;
  expiredAt: number;
}

export type KeyValue = { [key: string]: string };

export type Student = {
  origiId: number;
  name: string;
  state: number;
  scheduleDataId: number;
};

export type SlaveTeacher = {
  teacherId: number;
  teacherName: string;
  scheduleDataId: number;
};

export type CourseState = number | 1 | 2 | 3;

export type TeacherSchedules = {
  scheduleId: number;
  seriesId: number;
  seriesVersion: number;
  courseState: CourseState; //1未上课 ，2下课，3 上课 ，number 取消
  teacherId: number;
  teacherName: string;
  organId: number;
  organType: number;
  schoolId: number;
  schoolName: string;
  courseId: number;
  courseName: string;
  beginTime: number;
  endTime: number;
  className: string;
  classId: number;
  id: number;
  brandId: number;
  slaveTeachers: [];
  thirdId: number;
  thirdName: string;
  isSignIn: 0 | 1; // 0 未签到 1 签到
  timeLineNode: string;
};

export type StudentSchedules = {
  memberId: number;
  memberName: string;
  memberState: number;
  scheduleId: number;
  seriesId: number;
  seriesVersion: number;
  courseState: number;
  teacherId: number;
  teacherName: string;
  organId: number;
  organType: number;
  schoolId: number;
  schoolName: string;
  courseId: number;
  courseName: string;
  beginTime: number;
  endTime: number;
  className: string;
  classId: number;
  id: number;
  brandId: number;
  thirdId: number;
  thirdName: string;
  review: number;
  isDeduct: number;
};

export type Schedules = TeacherSchedules & StudentSchedules;

export interface StudentTime {
  enterTime: string;
  quitTime: string;
  duration: number;
}

export interface SignInStudent {
  studentId: number;
  studentName: string;
  studentTime: StudentTime;
  classStatus: 0 | 1 | 2 | 3; // 签到状态 0出勤 1请假 2旷课 3未签到
  deductStatus: 0 | 1;
  generalUnused: number;
  remark: string;
}

export interface SignInData {
  courseName: string;
  courseTime: string;
  students: SignInStudent[];
}

export interface CourseStatItem {
  day: string;
  count: number;
  ids: number[];
}

export interface CourseStatList {
  stat: CourseStatItem[];
}
