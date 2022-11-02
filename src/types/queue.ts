import { Node } from 'node';

export interface IQueue<T> {
	// insertAtHead(data: T): Node<T>;
	add(data: T): Node<T>;
	remove(): void;
	traverse(): T[];
	size(): number;
	search(comparator: (data: T) => boolean): Node<T> | null;
}

export enum QueueType {
	STACK = 'stack',
	QUEUE = 'queue'
}
