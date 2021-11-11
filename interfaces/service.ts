export interface createReportDto {
    description: string
    email?: string
}
export interface updateStatusDto {
    status: statusEnum,
    comments?: string
}

export enum statusEnum {
  new = "new",
  inProgress = "inProgress",
  done = "done",
  rejected = "rejected",
}
export interface fileInputDto {
    attachment: string,
    mime: string
}
export interface saveReportInterface {
    data: reportInterface,
    include?: includeReportInterface
}

export interface includeReportInterface {
    statusReports: Boolean
}
export interface reportInterface {
    description: String,
    email?: String,
    attachmentURL?: string
    statusReports: createStatusReportInterface,
}

export interface createStatusReportInterface {
    create: statusReportInterface[]
}
export interface statusReportInterface {
    status: String
    comments?: String
}