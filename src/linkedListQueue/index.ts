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

// const run = () => {
// 	interface Post {
// 		title: string;
// 	}

// 	const queue = new Queue<Post>('queue', QueueType.QUEUE);

// 	const queueResults = queue.traverse(); // [];
// 	console.log('queueResults', queueResults);

// 	queue.add({ title: 'Post A' });
// 	queue.add({ title: 'Post B' });
// 	queue.add({ title: 'Post C' });
// 	queue.add({ title: 'Post D' });

// 	queue.remove();

// 	console.log('fullQueue', queue.traverse()); // [ { title: 'Post B' }, { title: 'Post C' }, { title: 'Post D' } ]
// 	queue.search(({ title }) => title === 'Post A'); // Node { data: { title: "Post A" }, prev: Node, next: Node};

// 	const stack = new Queue<Post>('stack', QueueType.STACK);

// 	const stackResults = queue.traverse(); // [];
// 	console.log('stackResults', stackResults);

// 	stack.add({ title: 'Post A' });
// 	stack.add({ title: 'Post B' });
// 	stack.add({ title: 'Post C' });
// 	stack.add({ title: 'Post D' });

// 	stack.remove();

// 	console.log('fullStack', stack.traverse()); // [ { title: 'Post C' }, { title: 'Post B' }, { title: 'Post A' } ]
// 	console.log(stack.search(({ title }) => title === 'Post A')); // Node { data: { title: "Post A" }, prev: Node, next: null};
// };

// run();
