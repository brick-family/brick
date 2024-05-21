import { Observable, observable } from '@legendapp/state';

export interface IDataState {
  list: Array<any>;
  visible: boolean;
  title: string;
}

export class DataStateService {
  state: Observable<IDataState>;

  constructor() {
    this.state = observable<IDataState>({ list: [{ d: '12' }], visible: false, title: 'title' });
  }

  addList = () => {
    console.log('q=>add', this.state);
    this.state.list.push({ d: Math.random() });
    this.state.visible.set(Math.random() as any);
    // this.state.list.set([...this.state.list.get(), Math.random()])
  };

  public isReady(): boolean {
    return true;
  }
}
