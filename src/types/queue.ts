import { Node } from 'node';

interface IQueue<T> {
	insertAtHead(data: T): Node<T>;
	insertAtTail(data: T): Node<T>;
	deleteNode(node: Node<T>): void;
	traverse(): T[];
	size(): number;
	search(comparator: (data: T) => boolean): Node<T> | null;
}

export default IQueue;
