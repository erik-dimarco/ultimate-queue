import { Node } from 'node';
import IQueue from 'types/queue';

class Queue<T> implements IQueue<T> {
	private head: Node<T> | null = null;

	public insertAtHead(data: T): Node<T> {
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

	public insertAtTail(data: T): Node<T> {
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

	public deleteNode(node: Node<T>): void {
		if (!node.prev) {
			this.head = node.next;
		} else {
			const prevNode = node.prev;
			prevNode.next = node.next;
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
}

interface Post {
	title: string;
}

const run = () => {
	const queue = new Queue<Post>();

	const queueResults = queue.traverse(); // [];
	console.log('queueResults', queueResults);

	queue.insertAtTail({ title: 'Post A' });
	queue.insertAtTail({ title: 'Post B' });
	queue.insertAtHead({ title: 'Post C' });
	queue.insertAtHead({ title: 'Post D' });

	console.log('fullQueue', queue.traverse()); // [{ title : "Post D" }, { title : "Post C" }, { title : "Post A" }, { title : "Post B" }];
	queue.search(({ title }) => title === 'Post A'); // Node { data: { title: "Post A" }, prev: Node, next: Node};
};

run();
