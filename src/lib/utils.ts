export function serializeNonPOJOs<T>(input: T): T {
	return structuredClone<T>(input);
}
