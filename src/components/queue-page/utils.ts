type TObject<T, U> = {
  item: T | U | null
  state: U
};

export class Queue<T, U>  {
  private container: TObject<T, U>[] = [];
  private head = -1;
  private tail = -1;
  private readonly size: number = 0;
  private length: number = 0;
  isRestartBlocked = true;

  constructor(size: number, state: U) {
    this.size = size;
    this.container = Array.from({ length: size }, _ => ({
      item: null,
      state
    }));
  };

  enqueue = (item: T | null, state: U) => {
    this.isRestartBlocked = false;

    if (this.tail > 6) {
      return 0;
    };
    
    this.tail++;
    this.container[this.tail] = { item, state };
    this.length++;
    
    if (this.head === -1) {
      this.head++;
    };
  };
  
  changeTailState = (state: U) => {
    if (this.tail === 6) {
      return 0;
    };
    this.container[this.tail + 1].state = state;
  };

  dequeue = (state: U) => {
    if (this.head === 6 && this.tail === 6) {
      this.tail++;
    };

    this.container[this.head] = {
      item: null,
      state
    };

    if ((this.tail !== 7) && this.tail > this.head) {
      this.head++;
    };
  };
  
  changeHeadState = (state: U) => {
    if (this.head === -1) {
      return 0;
    };

    this.container[this.head].state = state;
  };

  isDequeueBlocked = () => {
    if(this.tail === 7 || this.tail === -1) {
      return true;
    } else {
      return false;
    };
  };

  getHead = () => this.head;
  getTail = () => this.tail;
  getLength = () => this.length;
  getContainer = () => this.container;
  isEmpty = () => this.length === 0;
};