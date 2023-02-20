/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
	Recorders = 'recorders',
	Records = 'records',
	Students = 'students'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

export type AuthSystemFields<T = never> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type RecordersRecord = {
	name?: string;
};

export enum RecordsActionOptions {
	'increase' = 'increase',
	'decrease' = 'decrease'
}
export type RecordsRecord = {
	action: RecordsActionOptions;
	change: number;
	recorder: RecordIdString;
	field?: string;
};

export type StudentsRecord = {
	name: string;
	cardNumber: string;
	score: number;
	field: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type RecordersResponse = RecordersRecord & AuthSystemFields;
export type RecordsResponse<Texpand = unknown> = RecordsRecord & BaseSystemFields<Texpand>;
export type StudentsResponse<Texpand = unknown> = StudentsRecord & BaseSystemFields<Texpand>;

export type CollectionRecords = {
	recorders: RecordersRecord;
	records: RecordsRecord;
	students: StudentsRecord;
};
