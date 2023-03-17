/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Houses = "houses",
	Recorders = "recorders",
	Records = "records",
	Students = "students",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type HousesRecord = {
	score?: number
	name: string
	color: string
}

export type RecordersRecord = {
	name?: string
}

export enum RecordsActionOptions {
	"increase" = "increase",
	"decrease" = "decrease",
}
export type RecordsRecord = {
	action: RecordsActionOptions
	change: number
	recorder: RecordIdString
	student: RecordIdString
}

export enum StudentsHouseOptions {
	"gryffindor" = "gryffindor",
	"slytherin" = "slytherin",
	"hufflepuff" = "hufflepuff",
	"ravenclaw" = "ravenclaw",
}
export type StudentsRecord = {
	name: string
	cardNumber: string
	score?: number
	house: StudentsHouseOptions
}

// Response types include system fields and match responses from the PocketBase API
export type HousesResponse = HousesRecord & BaseSystemFields
export type RecordersResponse = RecordersRecord & AuthSystemFields
export type RecordsResponse<Texpand = unknown> = RecordsRecord & BaseSystemFields<Texpand>
export type StudentsResponse = StudentsRecord & BaseSystemFields

export type CollectionRecords = {
	houses: HousesRecord
	recorders: RecordersRecord
	records: RecordsRecord
	students: StudentsRecord
}