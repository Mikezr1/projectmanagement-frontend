/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-11-12 11:21:22.

export interface CommentCreateDTO {
    description: string;
    taskId: number;
    userId: number;
}

export interface CommentSummaryDTO {
    id: number;
    description: string;
    user: UserSummaryDTO;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentUpdateDTO {
    id: number;
    description: string;
}

export interface CommentMapper {
}

export interface ProjectMapper {
}

export interface TaskMapper {
}

export interface UserMapper {
}

export interface NotificationSummaryDTO {
}

export interface ProjectCreateDTO {
    title: string;
    userIds: number[];
}

export interface ProjectSummaryDTO {
    id: number;
    title: string;
    users: UserSummaryDTO[];
    tasks: TaskSummaryDTO[];
}

export interface ProjectUpdateDTO {
    id: number;
    title: string;
    userIds: number[];
}

export interface TaskCreateDTO {
    title: string;
    description: string;
    status: Status;
    userId: number;
    projectId: number;
}

export interface TaskSummaryDTO {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    comments: CommentSummaryDTO[];
    user: UserSummaryDTO;
    project: ProjectSummaryDTO;
    status: Status;
}

export interface TaskUpdateDTO {
    id: number;
    title: string;
    description: string;
    status: Status;
}

export interface UserChangePasswordDTO {
    email: string;
    currentPassword: string;
    newPassword: string;
}

export interface UserCreateDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    companyName: string;
}

export interface UserLoginRequestDTO {
    email: string;
    password: string;
}

export interface UserSummaryDTO {
    id: number;
    firstName: string;
    email: string;
    role: Role;
}

export interface UserUpdateDTO {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    companyName: string;
}

export interface UserUpdateRoleDTO {
    role: Role;
}

export type Status = "CREATED" | "TODO" | "IN_PROGRESS" | "DONE" | "TESTING" | "BUG_FIXES";

export type Role = "PROJECT_LEADER" | "DEVELOPER" | "CUSTOMER";
