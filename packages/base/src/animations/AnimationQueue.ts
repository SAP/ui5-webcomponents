type TaskType =	() => Promise<void>;
const tasks = new WeakMap<HTMLElement, Array<TaskType>>();

class AnimationQueue {
	static get tasks() {
		return tasks;
	}

	static enqueue(element: HTMLElement, task: TaskType) {
		if (!tasks.has(element)) {
			tasks.set(element, []);
		}

		tasks.get(element)!.push(task);
	}

	static run(element: HTMLElement, task: TaskType): Promise<void> {
		if (!tasks.has(element)) {
			tasks.set(element, []);
		}

		return task().then(() => {
			const elementTasks = tasks.get(element);

			if (elementTasks!.length > 0) {
				return AnimationQueue.run(element, elementTasks!.shift()!);
			}
			tasks.delete(element);
		});
	}

	static push(element: HTMLElement, task: TaskType) {
		const elementTasks = tasks.get(element);

		if (elementTasks) {
			AnimationQueue.enqueue(element, task);
		} else {
			AnimationQueue.run(element, task);
		}
	}
}

export default AnimationQueue;
