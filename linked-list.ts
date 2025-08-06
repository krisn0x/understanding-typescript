//todo: implement more functions as practice

class LinkedNode<T> {
    public next?:LinkedNode<T>;
    constructor(public value:T) {}
}

class LinkedList<T> {
    public length = 0;
    private root:LinkedNode<T>;
    private tail:LinkedNode<T>;

    constructor() {}

    add (value:T) {
        let node = new LinkedNode<T>(value);
        if (!this.root || !this.tail) {
            this.root = this.tail = node
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    printValues () {
        if (!this.root.value) {
            console.log('No nodes in linked list.');
        }
        let current = this.root;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

let list = new LinkedList<string>();
list.add('1st node');
list.printValues();
console.log('-----------');
list.add('2nd node');
list.add('3rd node');
list.add('4th node');
list.printValues();
console.log(list.length);

