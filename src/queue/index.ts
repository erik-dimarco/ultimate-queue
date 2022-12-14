import { Node } from 'node';
import { IQueue, QueueType } from 'types/queue';

export class Queue<T> implements IQueue<T> {
	private head: Node<T> | null = null;

	constructor(public name: string, public type: QueueType = QueueType.QUEUE) {}

	public add(data: T): Node<T> {
		if (this.type === QueueType.QUEUE) {
			return this._insertAtTail(data);
		}

		return this._insertAtHead(data);
	}

	public remove(): void {
		if (!this.head) {
			return;
		} else {
			this.head = this.head.next;
		}
	}

	public traverse(): T[] {
		const array: T[] = [];
		if (!this.head) {
			return array;
		}

		const addToArray = (node: Node<T>): T[] => {
			array.push(node.data);
			return node.next ? addToArray(node.next) : array;
		};
		return addToArray(this.head);
	}

	public search(comparator: (data: T) => boolean): Node<T> | null {
		const checkNext = (node: Node<T>): Node<T> | null => {
			if (comparator(node.data)) {
				return node;
			}
			return node.next ? checkNext(node.next) : null;
		};

		return this.head ? checkNext(this.head) : null;
	}

	public size(): number {
		return this.traverse().length;
	}

	private _insertAtHead(data: T): Node<T> {
		const node = new Node(data);
		if (!this.head) {
			this.head = node;
		} else {
			this.head.prev = node;
			node.next = this.head;
			this.head = node;
		}
		return node;
	}

	private _insertAtTail(data: T): Node<T> {
		const node = new Node(data);
		if (!this.head) {
			this.head = node;
		} else {
			const getLast = (node: Node<T>): Node<T> => {
				return node.next ? getLast(node.next) : node;
			};

			const lastNode = getLast(this.head);
			node.prev = lastNode;
			lastNode.next = node;
		}
		return node;
	}
}

const run = () => {};

run();
