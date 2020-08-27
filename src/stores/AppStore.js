import { nanoid } from 'nanoid';
import { action, decorate, observable, runInAction } from 'mobx';
import { app, db } from '../Firebase/firebase';
import 'mobx-react/batchingForReactDom';
import * as firebase from 'firebase';

/**
 * Representation a Root App for mobx state
 */

export default class AppStore {

  /**
   Structure of initialData:
   initialData = {
         tasks: {
         'task-id-1':{id:'task-id-1',content:'some text'},
         'task-id-2':{id:'task-id-2',content:'some text'},
         'task-id-3':{id:'task-id-3',content:'some text'}
         },
         columns: {
        'column-1': { id: 'column-1', title: 'Wish list', tasksId: ['task-id-1, task-id-2, task-id-3'] },
        'column-2': { id: 'column-2', title: 'In progress', tasksId: [] },
        'column-3': { id: 'column-3', title: 'Done', tasksId: [] },

      },
       columnOrder: ['column-1', 'column-2', 'column-3'],
    }
   * @type {{object}}
   **/
  initialData = {};

  state = 'pending';

  /**
   * @method editCard - Edit content to your cards
   * @param {object} task - The task that user want to edit
   * @param {string} newVal - The
   *
   */
  editCard(task, newVal) {
    const { id } = task;
    this.initialData.tasks[id].content = newVal;
    this.updateContentInCardFirebase(id, newVal).catch(err => {
      console.log(err);
    });
  }

  /**
   * Delete chosen card from the list
   * @method delCard - Delete chosen card from the list
   * @param {string} taskId - The id of chosen task
   * @param {string} colId - The id of chosen column
   *
   */
  delCard(taskId, colId) {
    delete this.initialData.tasks[taskId];
    const index = this.initialData.columns[colId].tasksId.indexOf(taskId);
    delete this.initialData.columns[colId].tasksId[index];
    this.delCardInFirebase(taskId, colId).catch(err => {
        console.log(err);
      },
    );
  }

  /**
   * Update specific card on firestore
   * @async
   * @method updateContentInCardFirebase
   * @param {string} id - Task id
   * @param {string} newVal - The new content card
   */
  async updateContentInCardFirebase(id, newVal) {
    const { uid } = await app.auth().currentUser;
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      [`data.tasks.${id}.content`]: newVal,
    });
  }

  /**
   * Get data from firestore by user id
   * @method getDataByUid
   * Two condition:
   * 1. data exits for the user and then get the data.
   * 2. data doesn't exits so set initial data for the user.
   * @returns {Promise<void>}
   */
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

  /**
   * Add card to column
   * @method addCardToList
   * @param {string} id - Column id
   * @param {object} values - The task we want to added to card
   */
  addCardToList(id, values) {
    const { content } = values;
    const uniqId = nanoid().toString();
    this.initialData.tasks[uniqId] = { id: uniqId, content: content };
    this.initialData.columns[id].tasksId.push(uniqId);
    this.addCardToListInFirebase(id, uniqId).catch(err => {
      console.log(err);
    });
  }

  /**
   * Update columns in two options:
   * 1. Change the order of card in column
   * 2. Move card from one column to another
   * @method updateColumnsTask
   * @param {object} data - All data
   */
  updateColumnsTask(data) {
    this.initialData = data;
    this.updateColumnsTaskInFirebase().catch(err => {
      console.log(err);
    });
  }

  /**
   * Add card to column by uid stored firestore
   * @method addCardToListInFirebase
   * @param {string} id - Column id
   * @param {string} uniqId - Card id
   * @returns {Promise<void>}
   */
  async addCardToListInFirebase(id, uniqId) {
    const { uid } = await app.auth().currentUser;
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      [`data.tasks`]: { ...this.initialData.tasks },
    }).then(() => {
        rootRef.update({
          [`data.columns.${id}.tasksId`]: firebase.firestore.FieldValue.arrayUnion(uniqId),
        });
      },
    );
  }

  /**
   * Update column on firestore by user id
   * @method
   * @returns {Promise<void>}
   */
  async updateColumnsTaskInFirebase() {
    const { uid } = await app.auth().currentUser;
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      [`data.columns`]: { ...this.initialData.columns },
    });
  }

  /**
   * Delete chosen card stored firestore by user id
   * @method delCardInFirebase
   * @param {string} taskId - Card id
   * @param {string} colId - Column id
   * @returns {Promise<void>}
   */
  async delCardInFirebase(taskId, colId) {
    const { uid } = await app.auth().currentUser;
    let rootRef = await db.collection('accounts').doc(uid);
    rootRef.update({
      [`data.columns.${colId}.tasksId`]: firebase.firestore.FieldValue.arrayRemove(taskId),
    }).then(() => {
      rootRef.update({
        [`data.tasks.${taskId}`]: firebase.firestore.FieldValue.delete(),
      });
    });

  }
}


decorate(AppStore, {
  initialData: observable,
  state: observable,
  getDataByUid: action,
  addCardToList: action,
  editCard: action,
  delCard: action,
  updateColumnsTask: action,

});
