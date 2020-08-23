import { nanoid } from 'nanoid';
import { action, decorate, observable, runInAction } from 'mobx';
import { app, db } from '../Firebase/firebase';
import 'mobx-react/batchingForReactDom';

export default class AppStore {

  /**
   structure of initialData:
   initialData = {
         tasks: {
         'task-id-1':{id:'task-id-1',content:'some text'},
         'task-id-2':{id:'task-id-2',content:'some text'},
         'task-id-3':{id:'task-id-3',content:'some text'}
         },
         columns: {
        'column-1': { id: 'column-1', title: 'Wish list', tasksId: [] },
        'column-2': { id: 'column-2', title: 'In progress', tasksId: [] },
        'column-3': { id: 'column-3', title: 'Done', tasksId: [] },

      },
       columnOrder: ['column-1', 'column-2', 'column-3'],
    }
   * @type {{object}}
   **/
  initialData = {};

  state = 'pending';

  editCard(task, newVal) {
    const { id } = task;
    this.initialData.tasks[id].content = newVal;
    this.updateContentInFirebase(id, newVal).catch(err => {
      console.log(err);
    });

  }

  async updateContentInFirebase(id, newVal) {
    const { uid } = await app.auth().currentUser;
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      [`data.tasks.${id}.content`]: newVal,

    });
  }

  async getDataByUid() {
    this.initialData = {};
    this.state = 'pending';
    try {
      const { uid } = await app.auth().currentUser;
      const doc = await db.collection('accounts').doc(uid);
      const docGet = await doc.get();
      if (!docGet.exists) {
        const initialData = {
          tasks: {},
          columns: {
            'column-1': { id: 'column-1', title: 'Wish list', tasksId: [] },
            'column-2': { id: 'column-2', title: 'In progress', tasksId: [] },
            'column-3': { id: 'column-3', title: 'Done', tasksId: [] },

          },
          columnOrder: ['column-1', 'column-2', 'column-3'],
        };
        const account = {
          userId: uid,
          data: { ...initialData },
        };
        return await doc.set(account).then(() => {
          runInAction(() => {
            this.state = 'done';
            this.initialData = account.data;
          });

        });
      }
      const { data } = docGet.data();

      runInAction(() => {
        this.state = 'done';
        this.initialData = data;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  addCardToList(id, values) {
    const { content } = values;
    const uniqId = nanoid().toString();
    this.initialData.tasks[uniqId] = { id: uniqId, content: content };
    this.initialData.columns[id].tasksId.push(uniqId);
    this.addCardToListInFirebase(id).catch(err => {
      console.log(err);
    });
  }

  updateColumnsTask(data) {
    this.initialData = data;
    this.updateColumnsTaskInFirebase().catch(err => {
      console.log(err);
    });
  }

  async addCardToListInFirebase(id) {
    const { uid } = await app.auth().currentUser;
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      'data.tasks': { ...this.initialData.tasks },
    }).then(() => {
      rootRef.update({
        [`data.columns.${id}.tasksId`]: [...this.initialData.columns[id].tasksId],
      }).catch(e => {
        alert(e.message());
      });
    });
  }


  async updateColumnsTaskInFirebase() {
    const { uid } = await app.auth().currentUser;
    console.log({ uid });
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      [`data.columns`]: { ...this.initialData.columns },
    }).catch(e => {
      console.log(e.message());
    });
  }
}


decorate(AppStore, {
  initialData: observable,
  state: observable,
  getDataByUid: action,
  addCardToList: action,
  editCard: action,
  addCardToListInFirebase: action,
  updateColumnsTask: action,
  updateColumnsTaskInFirebase: action,

  // deleteJobFromJobList: action
});
